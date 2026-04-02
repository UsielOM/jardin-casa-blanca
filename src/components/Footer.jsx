// src/components/Footer.jsx
import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer({ onHomeClick }) {
  return (
    <footer className="bg-gray-50 border-t py-14 px-6 text-center">
      <div className="max-w-7xl mx-auto">
        {/* Logo / Botón de retorno */}
        <div 
          className="text-3xl font-serif font-bold text-gold tracking-widest uppercase mb-4 cursor-pointer" 
          onClick={onHomeClick}
        >
          Jardín Casa Blanca NECAXA
        </div>
        
        <p className="text-gray-500 font-bold mb-10 italic">
          Memorias inolvidables en Necaxa, Puebla.
        </p>
        
        {/* Redes Sociales */}
        <div className="flex justify-center gap-10 mb-10">
          <a 
            href="https://www.instagram.com/jardincasablancanecaxa/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-all transform hover:scale-125"
          >
            <Instagram className="w-8 h-8" />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61588278576872" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-all transform hover:scale-125"
          >
            <Facebook className="w-8 h-8" />
          </a>
          <a 
            href="https://wa.me/525523091732" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-all transform hover:scale-125"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} JARDÍN CASA BLANCA NECAXA. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}