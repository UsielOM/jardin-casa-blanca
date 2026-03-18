// src/components/Navbar.jsx
import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  activeFlow, 
  onFlowSelect 
}) {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo / Nombre */}
        <div 
          className="text-xl md:text-3xl font-serif font-bold text-gold tracking-widest uppercase cursor-pointer" 
          onClick={() => onFlowSelect('none')}
        >
          Jardín Casa Blanca
        </div>
        
        {/* Menú Desktop */}
        <div className="hidden lg:flex space-x-6 items-center text-sm font-bold tracking-wider text-gray-700">
          {activeFlow === 'none' ? (
            <span className="text-gold italic font-serif text-xl">Selecciona una experiencia</span>
          ) : (
            <>
              <button onClick={() => onFlowSelect('none')} className="hover:text-gold transition-colors flex items-center gap-1">
                ← INICIO
              </button>
              {activeFlow === 'salon' && (
                <>
                  <a href="#mesas" className="hover:text-gold uppercase transition-colors">Mesas</a>
                  <a href="#inflables" className="hover:text-gold uppercase transition-colors">Inflables</a>
                  <a href="#musica" className="hover:text-gold uppercase transition-colors">Música</a>
                  <a href="#cabana" className="hover:text-gold uppercase transition-colors">Cabaña</a>
                  <a href="#cotizador" className="bg-gold text-white px-5 py-2 hover:bg-yellow-600 transition-colors shadow-sm">
                    COTIZAR
                  </a>
                </>
              )}
            </>
          )}
        </div>

        {/* Botón Móvil */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-gold p-1 focus:outline-none"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col p-6 space-y-4 text-center border-t border-gray-100 fade-in">
          {activeFlow !== 'none' && (
            <button 
              onClick={() => onFlowSelect('none')} 
              className="text-gray-900 font-bold py-2 border-b border-gray-100"
            >
              ← VOLVER AL INICIO
            </button>
          )}
          {activeFlow === 'salon' && (
            <>
              <a href="#mesas" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700 font-bold">Mesas</a>
              <a href="#inflables" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700 font-bold">Inflables</a>
              <a href="#musica" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700 font-bold">Música</a>
              <a href="#cabana" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-700 font-bold">Cabaña</a>
              <a href="#cotizador" onClick={() => setIsMenuOpen(false)} className="bg-gold text-white font-bold py-4 rounded-sm shadow-md">
                IR AL COTIZADOR
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}