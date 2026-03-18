// src/views/HomeSelection.jsx
import React from 'react';
import { cabinData } from '../data/catalog';

export default function HomeSelection({ onFlowSelect }) {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row w-full fade-in">
      
      {/* Mitad Salón */}
      <div 
        onClick={() => onFlowSelect('salon')} 
        className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative group cursor-pointer overflow-hidden flex flex-col items-center justify-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920')" }}
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="font-script text-white block mb-2 text-3xl md:text-4xl drop-shadow-md">
            Eventos inolvidables
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 font-bold drop-shadow-lg uppercase">
            Renta de Salón
          </h2>
          <button className="border-2 border-white text-white px-8 py-3 uppercase tracking-widest text-base font-bold group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
            Diseñar Evento
          </button>
        </div>
      </div>

      {/* Mitad Cabaña */}
      <div 
        onClick={() => onFlowSelect('cabana')} 
        className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative group cursor-pointer overflow-hidden flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/20"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
          style={{ backgroundImage: `url('${cabinData.img}')` }}
        >
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="font-script text-white block mb-2 text-3xl md:text-4xl drop-shadow-md">
            Descanso natural
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 font-bold drop-shadow-lg uppercase">
            Renta de Cabaña
          </h2>
          <button className="border-2 border-white text-white px-8 py-3 uppercase tracking-widest text-base font-bold group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
            Reservar Estancia
          </button>
        </div>
      </div>

    </section>
  );
}