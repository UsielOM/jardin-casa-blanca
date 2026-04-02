// src/views/HomeSelection.jsx
import React from 'react';
import { cabinData } from '../data/catalog';

export default function HomeSelection({ onFlowSelect }) {
  return (
    <div className="fade-in w-full">
      {/* --- SECCIÓN SUPERIOR: SALÓN Y CABAÑA (ORIGINAL INTACTO) --- */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Opción Salón */}
        <div 
          onClick={() => onFlowSelect('salon')} 
          className="flex-1 h-[50vh] lg:h-screen relative group cursor-pointer overflow-hidden flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: "url('/img/salon/salon-rosa.webp')" }}
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

      {/* --- NUEVA SECCIÓN INFERIOR: INVITACIONES DIGITALES (ESTILO CON IMAGEN DE FONDO) --- */}
      <section 
        onClick={() => onFlowSelect('personalizedInvitationView')} 
        // Cambié las clases py- y bg- por altura y borde
        className="w-full h-[50vh] lg:h-[60vh] relative group cursor-pointer overflow-hidden flex items-center justify-center border-t border-white/20"
      >
        {/* Imagen de Fondo Temática */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105bg-[#0B0B0B]" 
          // AQUÍ: Cambia por la ruta real de tu imagen de invitaciones
          style={{ backgroundImage: "url('/img/invitaciones/backGroundInvitaciones.png')" }}
        >
          {/* Overlay oscuro para legibilidad (ajusta la opacidad aquí si es necesario) */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
        </div>

        {/* Contenido (z-10 para asegurar que esté sobre la imagen) */}
        <div className="relative text-center p-8 max-w-3xl mx-auto flex flex-col items-center z-10">
          
          {/* Título Script Dorado */}
          <span className="font-script text-[#D4AF37] text-3xl md:text-4xl block mb-3">
            Tecnología y Elegancia
          </span>
          
          {/* Título Principal Blanco */}
          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6 uppercase tracking-tight text-shadow-xl">
            Invitaciones Digitales
          </h2>
          
          {/* Descripción (oculta en móviles pequeños para no saturar) */}
          <p className="text-gray-300 text-sm md:text-base mb-8 font-medium leading-relaxed hidden sm:block">
            Sorprende a tus invitados con una experiencia interactiva. Conoce nuestros paquetes,
            descubre cómo funciona nuestro sistema y agenda con nosotros para recibir tu
            formulario de personalización.
          </p>
          
          {/* Botón */}
          <button className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 font-bold group-hover:bg-[#D4AF37] group-hover:text-[#0B0B0B] transition-all uppercase tracking-[0.2em] text-xs shadow-xl">
            Ver Paquetes y Detalles
          </button>

        </div>
      </section>
    </div>
  );
}