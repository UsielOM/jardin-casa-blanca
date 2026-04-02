// src/components/Navbar.jsx
import React from 'react';
import { Menu, X, ChevronLeft } from 'lucide-react';

export default function Navbar({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  activeFlow, 
  onFlowSelect 
}) {
  // Enlaces rápidos para el flujo de Salón
  const salonLinks = [
    { name: 'Mobiliario', href: '#mesas' },
    { name: 'Inflables', href: '#inflables' },
    { name: 'Música', href: '#musica' },
    { name: 'Cabaña', href: '#cabana' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* LOGO MEJORADO VISUALMENTE (Centrado, abajo y en dorado) */}
        <div 
          className="cursor-pointer flex items-center gap-2" 
          onClick={() => onFlowSelect('none')}
        >
          {activeFlow !== 'none' && <ChevronLeft className="w-5 h-5 text-gold lg:hidden" />}
          
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xl md:text-2xl font-serif font-bold text-gold uppercase tracking-tighter leading-none">
              Jardín Casa Blanca
            </span>
            <span className="text-[10px] md:text-[12px] font-sans font-bold text-gold uppercase tracking-[0.4em] leading-none mt-1.5">
              Necaxa
            </span>
          </div>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden lg:flex items-center space-x-8 text-[10px] font-bold text-gray-700 tracking-[0.2em]">
          {activeFlow === 'none' ? (
            <>
              <button onClick={() => onFlowSelect('salon')} className="hover:text-gold transition-colors uppercase">Eventos</button>
              <button onClick={() => onFlowSelect('cabana')} className="hover:text-gold transition-colors uppercase">Cabaña</button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onFlowSelect('none')} 
                className="text-gold hover:text-gray-900 transition-colors uppercase flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> INICIO
              </button>
              
              {/* Links de secciones si estamos en Salón */}
              {activeFlow === 'salon' && salonLinks.map(link => (
                <a key={link.href} href={link.href} className="hover:text-gold transition-colors uppercase">
                  {link.name}
                </a>
              ))}

              <a 
                href="#cotizador" 
                className="bg-gold text-white px-6 py-2 hover:bg-gray-900 transition-all rounded-sm shadow-sm"
              >
                COTIZAR AHORA
              </a>
            </>
          )}
        </div>

        {/* BOTÓN MÓVIL */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-gold p-2"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl fade-in overflow-y-auto max-h-screen">
          <div className="flex flex-col p-8 space-y-6 text-center">
            {activeFlow !== 'none' && (
              <button 
                onClick={() => onFlowSelect('none')} 
                className="text-gold font-bold uppercase tracking-widest text-sm border-b pb-4"
              >
                ← VOLVER AL MENÚ PRINCIPAL
              </button>
            )}

            {activeFlow === 'salon' ? (
              <>
                {salonLinks.map(link => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-800 font-bold uppercase tracking-widest text-sm"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#cotizador" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gold text-white py-5 rounded-sm font-bold uppercase tracking-[0.2em] shadow-lg"
                >
                  VER MI COTIZACIÓN
                </a>
              </>
            ) : (
              <>
                <button onClick={() => onFlowSelect('salon')} className="text-gray-800 font-bold uppercase tracking-widest text-sm">Salón de Eventos</button>
                <button onClick={() => onFlowSelect('cabana')} className="text-gray-800 font-bold uppercase tracking-widest text-sm">Cabaña VIP</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}