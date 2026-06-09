import React, { useState, useEffect } from 'react';

function Blog() {
  const [artigos, setArtigos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  // 🌟 NOVO: Estado para saber qual artigo está aberto em tela cheia (null = lista de posts)
  const [postAtivo, setPostAtivo] = useState(null);

  useEffect(() => {
    const buscarArtigos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/posts");
        const dados = await response.json();
        if (response.ok) {
          setArtigos(dados);
        }
      } catch (error) {
        console.error("Erro de conexão com o back-end:", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarArtigos();
  }, []);

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  // 🌟 NOVA FUNÇÃO: Limita o texto na página inicial para não estourar o layout
  const limitarTexto = (texto, limite = 180) => {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + "...";
  };

  // 🏛️ VISÃO 1: Se o usuário clicou em um post, mostra o artigo INTEIRO bem estruturado
  if (postAtivo) {
    return (
      <div className="blog-page">
        <button className="btn-voltar" onClick={() => setPostAtivo(null)}>
          ⬅ Voltar para todos os artigos
        </button>
        
        <article className="artigo-completo-container">
          <div className="artigo-meta-topo">
            <span className="card-categoria">{postAtivo.categoria}</span>
            <span className="card-data">{formatarData(postAtivo.data_criacao)}</span>
          </div>
          <h1 className="artigo-titulo-cheio">{postAtivo.titulo}</h1>
          
          {/* O white-space: pre-wrap no CSS vai garantir que os \n virem parágrafos reais */}
          <div className="artigo-corpo-texto">
            {postAtivo.conteudo}
          </div>
        </article>
      </div>
    );
  }

  // 📋 VISÃO 2: Lista padrão de artigos em formato horizontal
  return (
    <div className="blog-page">
      <div className="blog-header">
        <span className="subtitulo-neon">DevLog</span>
        <h2>Acompanhe Minha Evolução</h2>
        <p>Notas de desenvolvimento, automações com Python e análises de dados.</p>
      </div>

      {carregando ? (
        <div className="blog-loading">⚡ Carregando artigos do banco de dados...</div>
      ) : (
        <div className="blog-lista-horizontal">
          {artigos.length === 0 ? (
            <p className="blog-vazio">Nenhum artigo publicado ainda.</p>
          ) : (
            artigos.map((artigo) => (
              /* Clicar em qualquer lugar do card abre o post completo */
              <div 
                key={artigo.id} 
                className="blog-card-horizontal"
                onClick={() => setPostAtivo(artigo)}
              >
                <div className="card-horizontal-conteudo">
                  <div className="card-meta">
                    <span className="card-categoria">{artigo.categoria}</span>
                    <span className="card-data">{formatarData(artigo.data_criacao)}</span>
                  </div>
                  <h3>{artigo.titulo}</h3>
                  {/* Mostra só o comecinho do seu texto */}
                  <p>{limitarTexto(artigo.conteudo)}</p>
                </div>
                
                <div className="card-horizontal-action">
                  <span className="ler-mais-btn">Ler Artigo Completo ➔</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;