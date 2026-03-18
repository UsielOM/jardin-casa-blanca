// src/components/LocationMap.jsx
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function LocationMap() {
  return (
    <section className="bg-white py-20 px-4 md:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        
        {/* Columna de Información */}
        <div className="lg:w-1/3 w-full">
          <h3 className="font-serif text-4xl mb-10 text-gold font-bold tracking-tight uppercase">
            Contacto y Ubicación
          </h3>
          
          <div className="space-y-8">
            {/* Dirección */}
            <div className="flex items-start gap-5">
              <MapPin className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-900 text-lg font-bold leading-tight">Jardín Casa Blanca</p>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mt-1">
                  Allende, Necaxa, 73206 <br /> Nuevo Necaxa, Puebla.
                </p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-5">
              <Phone className="w-8 h-8 text-gold flex-shrink-0" />
              <p className="text-gray-900 text-lg font-bold">+52 55 2309 1732</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
              <Mail className="w-8 h-8 text-gold flex-shrink-0" />
              <p className="text-gray-900 text-base font-bold break-all lowercase">
                jardincasablancanecaxa@gmail.com
              </p>
            </div>

            {/* Horarios */}
            <div className="flex items-start gap-5 pt-4 border-t border-gray-100">
              <Clock className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <div className="text-sm font-bold text-gray-700 space-y-1">
                <p className="text-gold uppercase tracking-widest text-[10px] mb-2">Horarios de atención</p>
                <p className="flex justify-between gap-4"><span>Jueves:</span> <span className="text-gray-500">9:00 – 17:00</span></p>
                <p className="flex justify-between gap-4"><span>Vie - Dom:</span> <span className="text-gray-500">9:00 – 23:00</span></p>
                <p className="text-[10px] text-gray-400 italic mt-2">Lunes a Miércoles: Cerrado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna del Mapa (Iframe) */}
{/* Columna del Mapa (Iframe) */}
<div className="lg:w-2/3 w-full h-[450px] border-4 border-white shadow-2xl rounded-sm overflow-hidden outline outline-1 outline-gray-200">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d468.0183796483708!2d-98.0121395!3d20.2112101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d089c84b58d2cd%3A0xedd22c5c2099a5d6!2sJard%C3%ADn%20Casa%20Blanca%20Necaxa!5e0!3m2!1ses!2smx!4v1773815778312!5m2!1ses!2smx"
    width="100%" 
    height="100%" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Ubicación exacta Jardín Casa Blanca Necaxa"
  ></iframe>

  
</div>

      </div>
    </section>
  );
}