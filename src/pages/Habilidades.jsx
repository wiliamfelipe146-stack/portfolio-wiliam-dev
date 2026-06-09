import React from 'react';
import { Link } from 'react-router-dom';

function Habilidades() {
  // Dados das habilidades para renderização limpa e dinâmica
  const categorias = [
    {
      titulo: "⚡ Desenvolvimento Front-end",
      skills: [
        { nome: "React.js (Componentes & Hooks)", nivel: "85%" },
        { nome: "JavaScript Moderno (ES6+)", nivel: "80%" },
        { nome: "HTML5 / CSS3 Avançado (Grid & Flexbox)", nivel: "90%" }
      ]
    },
    {
      titulo: "🐍 Engenharia Back-end & Dados",
      skills: [
        { nome: "Python (Automação & Scripts)", nivel: "90%" },
        { nome: "APIs RESTful (Flask / Manipulação)", nivel: "75%" },
        { nome: "Bancos de Dados (SQL / MySQL)", nivel: "70%" }
      ]
    },
    {
      titulo: "🐧 Infraestrutura & Ferramentas",
      skills: [
        { nome: "Ambiente Linux (Ubuntu Terminal)", nivel: "85%" },
        { nome: "Git & GitHub (Versionamento)", nivel: "80%" },
        { nome: "Lógica de Segurança & Privacidade", nivel: "75%" }
      ]
    }
  ];

  return (
    <div className="skills-page">
      <div className="skills-header">
        <span className="subtitulo-neon">Tech Stack</span>
        <h2>Competências & Domínio Técnico</h2>
        <p>
          Minha base técnica é focada em performance, código limpo e automação eficiente de processos.
        </p>
      </div>

      <div className="skills-container">
        {categorias.map((cat, idx) => (
          <div key={idx} className="skills-card">
            <h3>{cat.titulo}</h3>
            <div className="skills-list">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.nome}</span>
                    <span className="skill-percentage">{skill.nivel}</span>
                  </div>
                  {/* Barra de progresso externa */}
                  <div className="skill-bar-bg">
                    {/* Barra interna animada usando Variáveis CSS para o tamanho */}
                    <div 
                      className="skill-bar-fill" 
                      style={{ '--largura-alvo': skill.nivel }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Link to="/blog" className="btn-principal" style={{ display: 'inline-flex' }}>
          Acessar o Meu Blog →
        </Link>
      </div>
    </div>
  );
}

export default Habilidades;