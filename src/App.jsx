// src/App.jsx
import React, { useState, useEffect } from 'react';

// Importación de Componentes Globales
import Navbar from './components/Navbar';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';

// Importación de Vistas
import HomeSelection from './views/HomeSelection';
import SalonView from './views/SalonView';
import CabinView from './views/CabinView';
import PersonalizedInvitationView from './views/personalizedInvitationView'

export default function App() {
  // --- ESTADOS GLOBALES DE NAVEGACIÓN ---
  const [activeFlow, setActiveFlow] = useState('none'); // 'none', 'salon', 'cabana'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar el scroll y cambiar el estilo del Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para cambiar entre flujos (Inicio, Salón, Cabaña)
  const handleFlowSelect = (flow) => {
    setActiveFlow(flow);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Estilos Globales (Fuentes y Animaciones) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Great+Vibes&family=Montserrat:wght@500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .text-gold { color: #C5A059; }
        .bg-gold { background-color: #C5A059; }
        .border-gold { border-color: #C5A059; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* 1. BARRA DE NAVEGACIÓN */}
      <Navbar 
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeFlow={activeFlow}
        onFlowSelect={handleFlowSelect}
      />

      {/* 2. CONTENIDO DINÁMICO (VISTAS) */}
      <main>
        {activeFlow === 'none' && (
          <HomeSelection onFlowSelect={handleFlowSelect} />
        )}

        {activeFlow === 'salon' && (
          <SalonView />
        )}

        {activeFlow === 'cabana' && (
          <CabinView />
        )}
        {activeFlow === 'personalizedInvitationView' && (
          <PersonalizedInvitationView />
        )}
      </main>

      {/* 3. SECCIONES CONSTANTES (MAPA Y CONTACTO) */}
      <LocationMap />

      {/* 4. PIE DE PÁGINA */}
      <Footer onHomeClick={() => handleFlowSelect('none')} />
    </div>
  );
}