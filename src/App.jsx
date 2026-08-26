import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Importe os componentes das páginas (vamos criar eles depois)
import Dashboard from './pages/Dashboard';
import Sobre from './pages/Sobre';
import Documentacao from './pages/Documentacao';

export default function App() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const closeSidebar = () => {
    if (sidebarActive) setSidebarActive(false);
  };

  return (
    <div onClick={closeSidebar}>
      {/* HEADER */}
      <header className="header">
        <div 
          className="menu-icon" 
          onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
        >
          ☰
        </div>
        <div className="branding">
          CRYPTOSEG <span className="subtitle">Soluções de Criptografia</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <nav 
        className={`sidebar ${sidebarActive ? 'active' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeSidebar}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''} onClick={closeSidebar}>
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/doc" className={location.pathname === '/doc' ? 'active' : ''} onClick={closeSidebar}>
              Documentação
            </Link>
          </li>
        </ul>
      </nav>

      {/* ROTEAMENTO DAS PÁGINAS */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/doc" element={<Documentacao />} />
      </Routes>

      {/* FOOTER */}
      <footer className="footer">
        Versão 2.0 (100% Client-Side) - Desenvolvido por Marcos Vinícius
      </footer>
    </div>
  );
}