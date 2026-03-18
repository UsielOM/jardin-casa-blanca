// src/App.jsx
import React, { useState, useEffect } from 'react';

// Importamos nuestros Componentes Globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationMap from './components/LocationMap';

// Importamos nuestras Vistas
import HomeSelection from './views/HomeSelection';
import SalonView from './views/SalonView';
import CabinView from './views/CabinView';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFlow, setActiveFlow] = useState('none'); // 'none', 'salon', 'cabana'

  // Efecto para la sombra del Navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para cambiar de pantalla y resetear el scroll
  const handleFlowSelect = (flow) => {
    setActiveFlow(flow);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* --- ESTILOS GLOBALES --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Great+Vibes&family=Montserrat:wght@500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .text-gold { color: #C5A059; }
        .bg-gold { background-color: #C5A059; }
        .border-gold { border-color: #C5A059; }
        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* Barra de Navegación fija */}
      <Navbar 
        scrolled={scrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        activeFlow={activeFlow} 
        onFlowSelect={handleFlowSelect} 
      />

      {/* Renderizado Condicional de Vistas */}
      <main>
        {activeFlow === 'none' && <HomeSelection onFlowSelect={handleFlowSelect} />}
        {activeFlow === 'salon' && <SalonView />}
        {activeFlow === 'cabana' && <CabinView />}
      </main>

      {/* Pie de página fijo */}
      <LocationMap />
      <Footer onHomeClick={() => handleFlowSelect('none')} />
    </div>
  );
}