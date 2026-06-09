import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SobreMim from './pages/SobreMim';
import Habilidades from './pages/Habilidades';
import Blog from './pages/Blog';
import Portfolio from "./pages/portfolio"; 
import Contato from "./pages/contato";
import Admin from './pages/Admin';   
import './App.css';

// 🟢 LINK CONFIGURADO COM SEU ENDEREÇO REAL DA RENDER
const API_URL = import.meta.env.PROD 
  ? "https://backend-wiliam-dev.onrender.com/api" 
  : "http://localhost:8000/api";

function App() {
  // --- 🔒 ESTADOS DO POP-UP BLOQUEADOR ---
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarBotaoFechar, setMostrarBotaoFechar] = useState(false); 
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  // --- ⏰ CRONÔMETROS DE ATIVAÇÃO ---
  useEffect(() => {
    // Ativa o bloqueio global 3 segundos após abrir o site
    const timerPopup = setTimeout(() => {
      setMostrarPopup(true);
    }, 3000);

    return () => clearTimeout(timerPopup);
  }, []);

  useEffect(() => {
    if (mostrarPopup) {
      const timerFechar = setTimeout(() => {
        setMostrarBotaoFechar(true);
      }, 10000); // 10 segundos para aparecer o "X"

      return () => clearTimeout(timerFechar);
    }
  }, [mostrarPopup]);

  // --- 🚀 ENVIO DO FORMULÁRIO PARA O BACKEND ---
  const handleDesbloquear = async (e) => {
    e.preventDefault();
    setStatus('⏳ Processando e validando...');

    try {
     const response = await fetch("https://backend-wiliam-dev.onrender.com/api/leads", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          whatsapp: whatsapp,
          email: email,
          interesse: 'Desbloqueio do Site / Contratação Geral'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Desbloqueado! Verifique seu e-mail e WhatsApp.');
        setTimeout(() => {
          setMostrarPopup(false); 
        }, 2000);
      } else {
        setStatus(`⚠️ ${data.detail || 'Erro ao validar os dados.'}`);
      }
    } catch (error) {
      setStatus('❌ Erro crítico ao conectar com o servidor.');
    }
  };

  return (
    <Router>
      <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<SobreMim />} />
            <Route path="/habilidades" element={<Habilidades />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* 🔒 POP-UP BLOQUEADOR SEPARADO */}
        {mostrarPopup && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.95)', zIndex: 99999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '20px', backdropFilter: 'blur(8px)'
          }}>
            <div style={{
              backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px',
              maxWidth: '500px', width: '100%', position: 'relative',
              border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', gap: '20px'
            }}>
              
              {mostrarBotaoFechar && (
                <button 
                  onClick={() => setMostrarPopup(false)}
                  style={{
                    position: 'absolute', top: '15px', right: '20px',
                    background: 'none', border: 'none', color: '#94a3b8',
                    fontSize: '22px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  ✕
                </button>
              )}

              <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#38bdf8', fontSize: '1.8rem', marginBottom: '10px' }}>
                  Conecte-se com Wiliam.dev 🚀
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Insira seus dados reais abaixo para liberar acesso completo ao portfólio, blog técnico e dashboard de métricas.
                </p>
              </div>

              <form onSubmit={handleDesbloquear} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" placeholder="Seu Nome Completo" required
                  value={nome} onChange={(e) => setNome(e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', fontSize: '15px' }}
                />
                <input 
                  type="text" placeholder="Seu WhatsApp com DDD" required
                  value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', fontSize: '15px' }}
                />
                <input 
                  type="email" placeholder="Seu melhor E-mail" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', fontSize: '15px' }}
                />

                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#10b981', color: '#000', padding: '15px',
                    borderRadius: '8px', border: 'none', fontWeight: 'bold',
                    fontSize: '16px', cursor: 'pointer', transition: '0.3s',
                    marginTop: '10px'
                  }}
                >
                  DESBLOQUEAR SITE AGORA 🔓
                </button>
              </form>

              {status && (
                <p style={{ 
                  marginTop: '5px', textAlign: 'center',
                  color: status.includes('✅') ? '#10b981' : status.includes('⏳') ? '#38bdf8' : '#f87171',
                  fontSize: '14px', fontWeight: 'bold'
                }}>
                  {status}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 🟢 BOTÃO DO WHATSAPP COMPLETAMENTE VISÍVEL E FIXO NAS PÁGINAS */}
        <a 
          href="https://wa.me/5548988047415?text=Olá%20Wiliam!%20Visitei%20o%20seu%20portfólio%20e%20gostaria%20de%20fechar%20um%20projeto%20de%20automação%20ou%20sistema%20com%20você."
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#25D366',
            color: '#ffffff',
            borderRadius: '50px',
            padding: '14px 24px',
            fontWeight: 'bold',
            fontSize: '15px',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
            textDecoration: 'none',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease',
            fontFamily: 'sans-serif'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '20px' }}>💬</span> 
          ME CONTRATE
        </a>

      </div>
    </Router>
  );
}

export default App;