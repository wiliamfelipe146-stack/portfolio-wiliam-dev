import React, { useState } from 'react';

function Portfolio() {
  // Lista de projetos simulando sua futura integração com banco de dados
  const meusProjetos = [
    {
      id: 1,
      titulo: "Automação de Vídeo Privado",
      icone: "🎬",
      resumo: "Script inteligente em Python para redes sociais.",
      explicação: "Este aplicativo utiliza visão computacional para detectar informações sensíveis (como e-mails e senhas) em telas gravadas e aplica automaticamente um efeito de desfoque (blur) antes da postagem, garantindo total privacidade.",
      tecnologias: ["Python", "OpenCV", "MoviePy"]
    },
    {
      id: 2,
      titulo: "API de Inventário Automotivo",
      icone: "🚗",
      resumo: "Sistema robusto de gerenciamento de estoque.",
      explicação: "Uma API RESTful desenvolvida em back-end para gerenciar a entrada, precificação e saída de veículos semi-novos. Conta com filtros inteligentes de busca e conexão direta com banco de dados relacional.",
      tecnologias: ["Python", "Flask", "MySQL"]
    },
    {
      id: 3,
      titulo: "Gerenciador Acadêmico Faculty",
      icone: "🎓",
      resumo: "Calculador de médias e status em tempo real.",
      explicação: "Sistema desenvolvido para automação de notas universitárias, processando dados complexos de turmas e gerando relatórios de aprovação com renderização visual imediata de status do aluno.",
      tecnologias: ["React", "JavaScript", "CSS Grid"]
    }
  ];

  // Estado opcional para controle via clique em telas touch (celulares)
  const [cardAtivo, setCardAtivo] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      {/* Texto com animação fluida */}
      <h2 className="titulo-interativo">📁 Projetos em Destaque</h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
        Passe o mouse sobre os cards ou clique neles para revelar a engenharia por trás do software.
      </p>

      <div className="portfolio-grid">
        {meusProjetos.map((projeto) => (
          <div 
            key={projeto.id} 
            className={`projeto-card ${cardAtivo === projeto.id ? 'active' : ''}`}
            onClick={() => setCardAtivo(cardAtivo === projeto.id ? null : projeto.id)}
          >
            {/* Parte Visual de Cima */}
            <div className="card-preview">
              {projeto.icone}
            </div>

            {/* Informações Básicas de Baixo */}
            <div className="card-info">
              <h3>{projeto.titulo}</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>{projeto.resumo}</p>
            </div>

            {/* 🚨 TELA EXPLICATIVA QUE SOBE NO HOVER */}
            <div className="card-overlay">
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Sobre o App</h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                {projeto.explicação}
              </p>
              <div className="tags-container">
                {projeto.tecnologias.map((tech, index) => (
                  <span key={index} className="btn-tecnologia">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;