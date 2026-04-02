// src/components/LocationMap.jsx
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function LocationMap() {
  return (
    <section className="bg-white py-24 px-4 md:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Información de contacto */}
        <div className="md:w-1/3 w-full">
          <h3 className="font-serif text-5xl mb-12 text-gold font-bold tracking-tighter uppercase">Visítanos</h3>
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <MapPin className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <p className="text-gray-900 text-xl font-bold leading-tight">
                Jardín Casa Blanca Necaxa<br/>
                <span className="text-gray-500 text-base font-bold uppercase tracking-widest">Necaxa, Puebla</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Phone className="w-8 h-8 text-gold flex-shrink-0" />
              <p className="text-gray-900 text-xl font-bold">+52 55 2309 1732</p>
            </div>
            <div className="flex items-center gap-6">
              <Mail className="w-8 h-8 text-gold flex-shrink-0" />
              <p className="text-gray-900 text-base md:text-lg font-bold break-all lowercase tracking-tight">
                jardincasablancanecaxa@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Mapa de Google */}
{/* Columna del Mapa (Iframe CORREGIDO) */}
<div className="lg:w-2/3 w-full h-[450px] border-4 border-white shadow-2xl rounded-sm overflow-hidden outline outline-1 outline-gray-200">
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d468.0183796483708!2d-98.0121395!3d20.2112101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d089c84b58d2cd%3A0xedd22c5c2099a5d6!2sJard%C3%ADn%20Casa%20Blanca%20Necaxa!5e0!3m2!1ses!2smx!4v1773891209896!5m2!1ses!2smx"
    width="100%" 
    height="100%" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade" // Agregado por seguridad
    title="Ubicación exacta Jardín Casa Blanca Necaxa"
  ></iframe>
</div>
      </div>
    </section>
  );
}