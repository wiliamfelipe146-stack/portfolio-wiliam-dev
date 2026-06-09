import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo / Marca Pessoal */}
        <div className="navbar-logo">
          <NavLink to="/">
            Wiliam<span className="ponto-neon">.dev</span>
          </NavLink>
        </div>

        {/* Links de Navegação Profissionais */}
        <nav className="navbar-menu">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Início
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Sobre Mim
          </NavLink>
          <NavLink to="/habilidades" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Habilidades
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Portfólio
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Blog
          </NavLink>
          <NavLink to="/contato" className="nav-btn-contato">
            Contato
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;