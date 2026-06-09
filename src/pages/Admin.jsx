import React, { useState, useEffect } from 'react';

function Admin() {
  // Estados para o CRM e Analytics
  const [metricas, setMetricas] = useState({ total_leads: 0, total_acessos: 0, conversao_estimada: '0%' });
  const [leads, setLeads] = useState([]);
  
  // Estados para o CMS (Gerenciador de Textos do Site)
  const [config, setConfig] = useState({ home_titulo: '', home_subtitulo: '', sobre_mim: '', habilidades: '' });
  
  // Estados para o Blog (Postar Novo Artigo)
  const [newPost, setNewPost] = useState({ titulo: '', conteudo: '', categoria: 'Tecnologia' });
  
  const [loading, setLoading] = useState(true);

  // Carrega todos os dados do Back-end ao abrir a página
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // 1. Puxa métricas do Dashboard
      const resDash = await fetch("http://localhost:8000/api/dashboard/dados");
      const dataDash = await resDash.json();
      setMetricas(dataDash);

      // 2. Puxa lista de Leads (CRM)
      const resLeads = await fetch("http://localhost:8000/api/leads");
      const dataLeads = await resLeads.json();
      setLeads(dataLeads);

      // 3. Puxa textos atuais do site (CMS)
      const resConfig = await fetch("http://localhost:8000/api/config");
      const dataConfig = await resConfig.json();
      setConfig(dataConfig);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados do admin:", error);
    }
  };

  // Salva as alterações de textos do site (CMS)
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (response.ok) alert("✨ Textos do site atualizados com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar textos.");
    }
  };

  // Publica um novo artigo no Blog
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        alert("🚀 Artigo publicado no Blog com sucesso!");
        setNewPost({ titulo: '', conteudo: '', categoria: 'Tecnologia' });
      }
    } catch (error) {
      alert("Erro ao publicar artigo.");
    }
  };

  if (loading) return <div style={{ color: '#10b981', textAlignment: 'center', padding: '50px' }}>Carregando Painel de Controle...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', padding: '30px', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <div style={{ borderBottom: '2px solid #10b981', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#10b981', margin: 0 }}>🎛️ Painel de Controle Executivo</h1>
        <p style={{ color: '#9ca3af', margin: '5px 0 0 0' }}>Gerencie leads, analise acessos e atualize os conteúdos em tempo real.</p>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <h3 style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>Acessos Totais</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{metricas.total_acessos}</p>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <h3 style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>Leads Capturados</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{metricas.total_leads}</p>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #a855f7', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <h3 style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>Taxa de Conversão</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{metricas.conversao_estimada}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
        
        {/* COLUNA ESQUERDA: LISTA DE LEADS (CRM) */}
        <div style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #374151', paddingBottom: '10px' }}>👥 Gestão de Leads (CRM)</h2>
          <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#9ca3af', borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '10px' }}>Nome</th>
                  <th style={{ padding: '10px' }}>WhatsApp</th>
                  <th style={{ padding: '10px' }}>E-mail</th>
                  <th style={{ padding: '10px' }}>Interesse</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #1f2937', fontSize: '14px' }}>
                    <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 'bold' }}>{lead.nome}</td>
                    <td style={{ padding: '12px 10px', color: '#3b82f6' }}>{lead.whatsapp}</td>
                    <td style={{ padding: '12px 10px', color: '#9ca3af' }}>{lead.email}</td>
                    <td style={{ padding: '12px 10px', color: '#e5e7eb' }}>{lead.interesse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COLUNA DIREITA: EDITAR CONTEÚDO (CMS) */}
        <div style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #374151', paddingBottom: '10px' }}>✏️ Configurações Institucionais (CMS)</h2>
          <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Título Principal da Home</label>
              <input 
                type="text" 
                value={config.home_titulo} 
                onChange={(e) => setConfig({...config, home_titulo: e.target.value})}
                style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Subtítulo da Home</label>
              <textarea 
                rows="2"
                value={config.home_subtitulo} 
                onChange={(e) => setConfig({...config, home_subtitulo: e.target.value})}
                style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', fontFamily: 'sans-serif' }}
              />
            </div>
           <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Sobre Mim</label>
              <textarea 
              rows="4"
              value={config.sobre_mim || ''} 
              onChange={(e) => setConfig({...config, sobre_mim: e.target.value})}
              style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151', 
              borderRadius: '6px', 
              color: '#fff', 
              boxSizing: 'border-box', 
              fontFamily: 'sans-serif' 
            }}
               placeholder="Escreva sua descrição profissional aqui..."
              />
           </div>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Habilidades (Separadas por vírgula)</label>
              <input 
                type="text" 
                value={config.habilidades} 
                onChange={(e) => setConfig({...config, habilidades: e.target.value})}
                style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#10b981', color: '#000', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '5px' }}>
              Salvar Alterações no Site 💾
            </button>
          </form>
        </div>

      </div>

      {/* BLOCO INFERIOR: POSTAR NO BLOG */}
      <div style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }}>
        <h2 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #374151', paddingBottom: '10px' }}>✍️ Publicar no Blog do Portfólio</h2>
        <form onSubmit={handleCreatePost} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Título do Artigo</label>
              <input 
                type="text" 
                required
                value={newPost.titulo}
                onChange={(e) => setNewPost({...newPost, titulo: e.target.value})}
                placeholder="Ex: Como criar automações com Python"
                style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '5px', fontSize: '14px' }}>Categoria</label>
              <select 
                value={newPost.categoria}
                onChange={(e) => setNewPost({...newPost, categoria: e.target.value})}
                style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
              >
                <option value="Tecnologia">Tecnologia</option>
                <option value="Automação">Automação</option>
                <option value="Dados">Análise de Dados</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px' }}>Conteúdo do Post (Aceita texto corrido)</label>
            <textarea 
              rows="5"
              required
              value={newPost.conteudo}
              onChange={(e) => setNewPost({...newPost, conteudo: e.target.value})}
              placeholder="Escreva o corpo do seu artigo aqui..."
              style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', fontFamily: 'sans-serif' }}
            />
            <button type="submit" style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              Publicar Artigo Agora 🚀
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Admin;