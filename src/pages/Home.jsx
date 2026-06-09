import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // 🟢 1. Estado para guardar os textos que vêm do banco de dados (com valores padrão caso a API demore)
  const [textos, setTextos] = useState({
    home_titulo: 'Desenvolvendo Soluções Robustas com Python & React',
    home_subtitulo: 'Sou desenvolvedor de software e analista de dados. Especialista em construir interfaces interativas de alto desempenho e automações inteligentes em ambientes Linux.',
    sobre_mim: '',
    habilidades: 'Python, React, Linux, FastAPI, SQLite' // Fallback padrão
  });

  // 🟢 2. Efeito colateral para Analytics e busca de configurações
  useEffect(() => {
    // Registra o acesso de forma invisível para o gráfico do seu Dashboard
    fetch("http://localhost:8000/api/analytics/acesso", { method: "POST" })
      .catch(err => console.log("Analytics offline"));

    // Puxa os textos em tempo real armazenados no SQLite
    fetch("http://localhost:8000/api/config")
      .then(res => res.json())
      .then(data => {
        // Se o banco retornar os dados corretamente, atualiza o estado
        if (data.home_titulo) {
          setTextos(data);
        }
      })
      .catch(err => console.error("Erro ao carregar textos do CMS:", err));
  }, []);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Disponível para novos projetos</span>
          
          {/* 🟢 TÍTULO DINÂMICO: Se você quiser que a quebra de linha <br /> funcione ou o gradiente se aplique, 
              o texto digitado no painel pode ser tratado normalmente. */}
          <h1 className="hero-title">
            {textos.home_titulo}
          </h1>
          
          {/* 🟢 SUBTÍTULO DINÂMICO */}
          <p className="hero-subtitle">
            {textos.home_subtitulo}
          </p>
          
          <div className="hero-actions">
            <Link to="/portfolio" className="btn-principal">
              Ver Projetos <span>→</span>
            </Link>
            <Link to="/contato" className="btn-secundario">
              Vamos Conversar
            </Link>
          </div>
        </div>
      </section>

      {/* 2. METRICS SECTION (Gera autoridade instantânea) */}
      <section className="metrics-section">
        <div className="metric-item">
          <span className="metric-number">+15</span>
          <span className="metric-label">Automações Python</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">SPA</span>
          <span className="metric-label">Aplicações React</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">Linux</span>
          <span className="metric-label">Ambiente de Desenvolvimento</span>
        </div>
      </section>

      {/* 3. FEATURED BRIEF (Habilidades dinâmicas ou texto complementar) */}
      <section className="brief-section">
        <div className="brief-card">
          <h3>Engenharia de Software focada em Resultados</h3>
          
          {/* 🟢 HABILIDADES DINÂMICAS: Mapeia o que você escrever no painel admin */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '15px 0' }}>
            {textos.habilidades.split(',').map((skill, index) => (
              <span 
                key={index} 
                style={{ 
                  backgroundColor: '#1f2937', 
                  color: '#10b981', 
                  padding: '5px 12px', 
                  borderRadius: '4px', 
                  fontSize: '13px',
                  border: '1px solid #374151',
                  fontWeight: 'bold'
                }}
              >
                {skill.trim()}
              </span>
            ))}
          </div>

          <Link to="/sobre" className="brief-link">Conheça minha trajetória →</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;