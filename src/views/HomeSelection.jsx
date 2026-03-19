// src/views/HomeSelection.jsx
import React from 'react';
import { cabinData } from '../data/catalog';

export default function HomeSelection({ onFlowSelect }) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row fade-in">
      {/* Opción Salón */}
      <div 
        onClick={() => onFlowSelect('salon')} 
        className="flex-1 h-[50vh] lg:h-screen relative group cursor-pointer overflow-hidden flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920')" }}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
        </div>
        <div className="relative text-center p-6">
          <span className="font-script text-white text-3xl md:text-4xl block mb-2">Eventos inolvidables</span>
          <h2 className="font-serif text-4xl md:text-7xl text-white font-bold mb-6 uppercase tracking-tighter">Renta de Salón</h2>
          <button className="border-2 border-white text-white px-8 py-3 font-bold group-hover:bg-white group-hover:text-gray-900 transition-all uppercase tracking-[0.2em] text-xs">
            Diseñar mi Evento
          </button>
        </div>
      </div>

      {/* Opción Cabaña */}
      <div 
        onClick={() => onFlowSelect('cabana')} 
        className="flex-1 h-[50vh] lg:h-screen relative group cursor-pointer overflow-hidden flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/20"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
          style={{ backgroundImage: `url('${cabinData.img}')` }}
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
        </div>
        <div className="relative text-center p-6">
          <span className="font-script text-white text-3xl md:text-4xl block mb-2">Descanso natural</span>
          <h2 className="font-serif text-4xl md:text-7xl text-white font-bold mb-6 uppercase tracking-tighter text-shadow-lg">Renta de Cabaña</h2>
          <button className="border-2 border-white text-white px-8 py-3 font-bold group-hover:bg-white group-hover:text-gray-900 transition-all uppercase tracking-[0.2em] text-xs">
            Reservar Estancia
          </button>
        </div>
      </div>
    </section>
  );
}