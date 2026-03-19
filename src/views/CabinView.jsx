// src/views/CabinView.jsx
import React, { useState } from 'react';
import { 
  Tent, CheckCircle, MessageCircle, Info, 
  User, Calendar as CalendarIcon, Users
} from 'lucide-react';
import { cabinData } from '../data/catalog';

export default function CabinView() {
  const [clientDetails, setClientDetails] = useState({ name: '' });
  const [cabinConfig, setCabinConfig] = useState({ 
    checkIn: '', 
    checkOut: '', 
    guests: 2 
  });

  const handleTextSecurity = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]/g, '');

  const getCabinNights = () => {
    if (!cabinConfig.checkIn || !cabinConfig.checkOut) return 1;
    const start = new Date(cabinConfig.checkIn);
    const end = new Date(cabinConfig.checkOut);
    const diff = end - start;
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const isCabinFormValid = 
    clientDetails.name.trim() !== '' && 
    cabinConfig.checkIn !== '' && 
    cabinConfig.checkOut !== '';

  const generateCabinQuoteText = () => {
    let msg = `✨ *Hola, me gustaría reservar la cabaña en Jardín Casa Blanca Necaxa* ✨\n\n`;
    msg += `👤 *Nombre:* ${clientDetails.name}\n`;
    msg += `👥 *Huéspedes:* ${cabinConfig.guests}\n`;
    msg += `📅 *Check-in:* ${cabinConfig.checkIn}\n`;
    msg += `📅 *Check-out:* ${cabinConfig.checkOut}\n`;
    msg += `🌙 *Noches:* ${getCabinNights()}\n\n`;
    msg += `💰 *Costo Total Estimado:* $${cabinData.price * cabinConfig.guests * getCabinNights()} MXN\n\n`;
    msg += `ℹ️ Una vez confirmada la disponibilidad de la fecha, se validará el precio final por WhatsApp.`;
    return encodeURIComponent(msg);
  };

  const sendCabinWhatsApp = () => {
    if (!isCabinFormValid) return;
    const phone = "525523091732"; // Tu número de teléfono
    window.open(`https://wa.me/${phone}?text=${generateCabinQuoteText()}`, '_blank');
  };

  const subtotal = cabinData.price * cabinConfig.guests * getCabinNights();

  return (
    <div className="fade-in pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden border-t-8 border-gold">
        
        {/* SECCIÓN SUPERIOR: INFO E IMAGEN */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 h-80 lg:h-auto bg-black">
            <img src={cabinData.img} className="w-full h-full object-cover" alt="Cabaña VIP Jardín Casa Blanca Necaxa" />
          </div>
          <div className="lg:w-1/2 bg-[#2A2A2A] text-white p-8 md:p-14">
            <div className="flex items-center gap-4 mb-6">
              <Tent className="w-10 h-10 text-gold" />
              <h2 className="font-serif text-5xl font-bold text-gold uppercase tracking-tight">Estancia VIP</h2>
            </div>
            <p className="text-xl font-medium text-gray-200 mb-10 leading-relaxed font-serif">{cabinData.desc}</p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-gray-300 mb-12">
               {cabinData.amenities.map((a, i) => (
                 <li key={i} className="flex gap-4 items-center">
                   <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" /> {a}
                 </li>
               ))}
            </ul>

            <div className="bg-white/5 border border-white/10 p-6 text-xs font-medium leading-relaxed rounded mb-10 text-gray-300">
               <p className="mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
                 <strong className="text-gold">Horarios:</strong> {cabinData.schedule}
               </p>
               <p className="leading-relaxed">
                 <strong className="text-gold uppercase tracking-widest block mb-1">Políticas:</strong> 
                 {cabinData.policy}
               </p>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-700 pt-10">
              <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Costo Noche/Persona:</span>
              <span className="font-serif text-5xl text-gold font-bold tracking-tighter">${cabinData.price} MXN</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: FORMULARIO Y COTIZACIÓN */}
        <div className="p-8 md:p-20 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Columna Formulario */}
            <div className="lg:col-span-7 space-y-12">
              <h3 className="font-serif text-4xl font-bold border-b-4 border-gray-100 pb-5 text-gray-900 uppercase">Detalles de tu Reserva</h3>
              
              <div className="space-y-10">
                <div className="relative">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">
                    <User className="w-4 h-4 text-gold" /> Nombre del Titular
                  </label>
                  <input 
                    type="text" 
                    value={clientDetails.name} 
                    onChange={e => setClientDetails({...clientDetails, name: handleTextSecurity(e.target.value)})} 
                    className="w-full border-b-2 border-gray-300 py-3 text-2xl font-bold text-gray-900 focus:border-gold outline-none transition-colors" 
                    placeholder="¿A nombre de quién?" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                      <CalendarIcon className="w-3 h-3 text-gold" /> Fecha de Entrada
                    </label>
                    <input 
                      type="date" 
                      value={cabinConfig.checkIn} 
                      onChange={e => setCabinConfig({...cabinConfig, checkIn: e.target.value})} 
                      className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold text-gray-900 focus:border-gold outline-none" 
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                      <CalendarIcon className="w-3 h-3 text-gold" /> Fecha de Salida
                    </label>
                    <input 
                      type="date" 
                      value={cabinConfig.checkOut} 
                      onChange={e => setCabinConfig({...cabinConfig, checkOut: e.target.value})} 
                      className="w-full border-b-2 border-gray-300 py-3 text-lg font-bold text-gray-900 focus:border-gold outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    <Users className="w-4 h-4 text-gold" /> Huéspedes (Máximo 6 personas)
                  </label>
                  
                  {/* MEJORA 1: Cambiamos Slider por Botones +/- Responsive */}
                  <div className="flex items-center border-2 border-gray-300 rounded bg-white overflow-hidden shadow-sm h-12 w-full sm:w-auto sm:max-w-[200px]">
                    <button 
                      onClick={() => setCabinConfig({...cabinConfig, guests: Math.max(1, cabinConfig.guests - 1)})}
                      className="flex-1 sm:w-12 h-full font-bold text-2xl hover:bg-gray-100 active:bg-gray-200 transition-colors border-r border-gray-200 text-gold"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold text-xl text-gray-900">
                      {cabinConfig.guests}
                    </span>
                    <button 
                      onClick={() => setCabinConfig({...cabinConfig, guests: Math.min(6, cabinConfig.guests + 1)})}
                      className="flex-1 sm:w-12 h-full font-bold text-2xl hover:bg-gray-100 active:bg-gray-200 transition-colors border-l border-gray-200 text-gold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Resumen y WhatsApp */}
            <div className="lg:col-span-5">
              <div className="bg-gray-900 text-white p-10 rounded-sm shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Tent className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                  <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">Resumen de estancia</p>
                  
                  <div className="space-y-4 mb-12">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-400 uppercase text-[10px]">Noches</span>
                      <span className="text-xl">{getCabinNights()}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-400 uppercase text-[10px]">Personas</span>
                      <span className="text-xl">{cabinConfig.guests}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] mb-2 text-center">Total Estimado</p>
                  <p className="font-serif text-7xl text-gold font-bold text-center mb-10 tracking-tighter">${subtotal}</p>

                  <div className="bg-black/40 border border-white/10 p-5 rounded-sm text-[11px] flex gap-4 font-bold text-gray-300 leading-relaxed mb-10">
                    <Info className="w-6 h-6 text-gold flex-shrink-0" /> 
                    Una vez confirmada la disponibilidad de la fecha, se validará el precio final por WhatsApp.
                  </div>
                </div>

                {/* MEJORA 2: Botón de WhatsApp Responsive y Elegante */}
                <button 
                  onClick={sendCabinWhatsApp} 
                  disabled={!isCabinFormValid} 
                  className={`w-full py-4 md:py-6 px-4 text-sm md:text-lg font-bold uppercase tracking-[0.15em] flex justify-center items-center gap-3 transition-all shadow-xl rounded-sm ${
                    isCabinFormValid 
                    ? 'bg-[#25D366] border-[#25D366] text-white hover:bg-[#1DA851] hover:border-[#1DA851] transform active:scale-95' 
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {isCabinFormValid ? (
                    <>
                      {/* Icono responsivo */}
                      <MessageCircle className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0" /> 
                      <span>Reservar vía WhatsApp</span>
                    </>
                  ) : (
                    "Faltan Datos obligatorios"
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}