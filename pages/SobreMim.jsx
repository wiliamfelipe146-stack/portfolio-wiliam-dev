import React from 'react';
import { Link } from 'react-router-dom';

function SobreMim() {
  return (
    <div className="sobre-page">
      
      {/* SEÇÃO DE INTRODUÇÃO REESTRUTURADA */}
      <section className="sobre-hero">
        <div className="sobre-hero-grid">
          
          <div className="sobre-hero-texto">
            <span className="subtitulo-neon">Software Engineer & Analyst</span>
            {/* 🟢 CORREÇÃO: Adicionada a classe do título interativo com gradiente verde */}
            <h1 className="sobre-hero-title texto-gradiente">Wiliam</h1>
            
            <p className="bio-destaque">
              Estudante de tecnologia e entusiasta da cultura Open Source, focado em transformar 
              dados brutos em inteligência através de <strong>Python</strong> e construir experiências 
              digitais de alto nível com <strong>React</strong>.
            </p>
            <p>
              Minha base de trabalho é o <strong>Linux Ubuntu</strong>, onde gerencio meus ambientes 
              de desenvolvimento de forma nativa e eficiente. Acredito na automação como forma de 
              escalar resultados e na segurança de dados como pilar fundamental de qualquer software.
            </p>
          </div>

          {/* 📸 SUA FOTO AQUI NO TOPO DIREITO */}
          <div className="sobre-hero-foto">
            <div className="moldura-foto">
              {/* 🟢 CORREÇÃO: Caminho da pasta public ajustado para o padrão do Vite */}
              <img src="/unnamed_013.jpg" alt="Wiliam" className="foto-perfil" />
              <div className="glow-foto"></div>
            </div>
            <div className="status-hacker">
              <span className="ponto-blink"></span> System Online: Ubuntu 24.04
            </div>
          </div>

        </div>
      </section>

      {/* LINHA DO TEMPO (Mantida com ajuste de cor) */}
      <section className="timeline-section">
        <h3 className="timeline-titulo">Trajetória Profissional</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2026 - Presente</div>
            <div className="timeline-content">
              <h4>Universidade & Engenharia de Software</h4>
              <p>Foco em automação de processos acadêmicos e desenvolvimento de ferramentas de produtividade.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2025</div>
            <div className="timeline-content">
              <h4>Inteligência Automotiva</h4>
              <p>Estratégias baseadas em análise de dados para o mercado de seminovos e gestão de inventário.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreMim;