import React, { useState } from 'react';

function Contato() {
  // 🛠️ FIX 1: Incluído o campo 'email' no estado inicial para o React conseguir capturar
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '', 
    email: '',    // 🟢 Adicionado!
    interesse: '' 
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔄 CONEXÃO REAL COM O FASTAPI (PYTHON)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🛠️ FIX 2: Mapeia TODOS os dados exigidos pelo LeadSchema do Python (incluindo o e-mail)
    const dadosLead = {
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      email: formData.email,       // 🟢 Adicionado! Agora o Python não vai dar erro 422
      interesse: formData.interesse
    };

    try {
      const response = await fetch("https://backend-wiliam-dev.onrender.com/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosLead),
      });

      const resultado = await response.json();

      if (response.ok) {
        console.log("Dados salvos no SQLite com sucesso:", resultado);
        setEnviado(true);
        
        // Reseta o formulário limpando todos os campos
        setFormData({ nome: '', whatsapp: '', email: '', interesse: '' });
        setTimeout(() => setEnviado(false), 5000);
      } else {
        console.error("Erro retornado pelo servidor Python:", resultado.detail);
        alert("Erro ao salvar dados. Verifique o terminal do back-end.");
      }
    } catch (error) {
      console.error("Erro crítico ao conectar com o back-end:", error);
      alert("Não foi possível conectar ao servidor Python. Verifique se o Uvicorn está rodando!");
    }
  };

  return (
    <div className="contato-page">
      <div className="contato-header">
        <span className="subtitulo-neon">Conexão</span>
        <h2>Vamos construir algo juntos?</h2>
        <p>Seja para um projeto freelance, uma proposta de desenvolvimento ou apenas para trocar uma ideia sobre dados e código.</p>
      </div>

      <div className="contato-grid">
        {/* COLUNA 1: LINKS DIRETOS */}
        <div className="contato-info-card">
          <h3>Canais Diretos</h3>
          <p>Escolha a plataforma de sua preferência para iniciar nosso contato:</p>
          
          <div className="links-diretos">
            <a href="mailto:wiliam@seuemail.com" className="link-item-box">
              <span className="link-icon">✉️</span>
              <div className="link-text">
                <span className="link-title">E-mail Profissional</span>
                <span className="link-sub">wiliam@seuemail.com</span>
              </div>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="link-item-box">
              <span className="link-icon">💼</span>
              <div className="link-text">
                <span className="link-title">LinkedIn</span>
                <span className="link-sub">Conectar Profissionalmente</span>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="link-item-box">
              <span className="link-icon">🐙</span>
              <div className="link-text">
                <span className="link-title">GitHub</span>
                <span className="link-sub">Acessar Repositórios</span>
              </div>
            </a>
          </div>
        </div>

        {/* COLUNA 2: FORMULÁRIO INTERATIVO (CONECTADO AO BANCO) */}
        <div className="contato-form-card">
          <h3>Enviar Mensagem</h3>
          
          {enviado ? (
            <div className="alerta-sucesso">
              <span>🚀</span> Mensagem registrada! Seu lead foi captado e processado no banco de dados.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="formulario-corpo">
              <div className="input-group">
                <label htmlFor="nome">Seu Nome</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  required 
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Wiliam"
                />
              </div>

              {/* Campo: WhatsApp */}
              <div className="input-group">
                <label htmlFor="whatsapp">Seu WhatsApp</label>
                <input 
                  type="text" 
                  id="whatsapp" 
                  name="whatsapp" 
                  required 
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Ex: 5548999999999"
                />
              </div>
               
              {/* Campo: E-mail (Mapeado corretamente com o name="email") */}
              <div className="input-group">
                <label htmlFor="email">Seu e-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"  // 🟢 Importante: o name precisa bater com a chave do formData
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: seuemail@dominio.com"
                />
              </div>

              {/* Campo: Interesse */}
              <div className="input-group">
                <label htmlFor="interesse">Área de Interesse</label>
                <textarea 
                  id="interesse" 
                  name="interesse" 
                  rows="5" 
                  required 
                  value={formData.interesse}
                  onChange={handleChange}
                  placeholder="Descreva o sistema, automação ou análise de dados que você precisa..."
                ></textarea>
              </div>

              <button type="submit" className="btn-principal" style={{ width: '100%', justifyContent: 'center' }}>
                Enviar Dados para o Sistema 📩
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contato;