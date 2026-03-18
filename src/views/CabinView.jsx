// src/views/CabinView.jsx
import React, { useState } from 'react';
import { Tent, CheckCircle, User, Info, MessageCircle } from 'lucide-react';
import { cabinData } from '../data/catalog';

export default function CabinView() {
  const [clientDetails, setClientDetails] = useState({ name: '' });
  const [cabinConfig, setCabinConfig] = useState({ checkIn: '', checkOut: '', guests: 2 });

  // Lógica de seguridad para texto
  const handleTextSecurity = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]/g, '');

  const getCabinNights = () => {
    if (!cabinConfig.checkIn || !cabinConfig.checkOut) return 1;
    const start = new Date(cabinConfig.checkIn);
    const end = new Date(cabinConfig.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const isCabinFormValid = clientDetails.name.trim() !== '' && cabinConfig.checkIn !== '' && cabinConfig.checkOut !== '';

  const generateCabinQuoteText = () => {
    let msg = `✨ *Hola, me gustaría reservar la cabaña en Jardín Casa Blanca Necaxa* ✨\n\n`;
    msg += `👤 *Nombre:* ${clientDetails.name}\n`;
    msg += `👥 *Huéspedes:* ${cabinConfig.guests}\n`;
    msg += `📅 *Check-in:* ${cabinConfig.checkIn}\n`;
    msg += `📅 *Check-out:* ${cabinConfig.checkOut}\n`;
    msg += `🌙 *Noches:* ${getCabinNights()}\n\n`;
    msg += `💰 *Costo Total Estimado:* $${cabinData.price * cabinConfig.guests * getCabinNights()} MXN\n\n`;
    msg += `ℹ️ *Nota:* Una vez confirmadas las fechas disponibles, se confirmará el precio final por WhatsApp.`;
    return encodeURIComponent(msg);
  };

  const sendCabinWhatsApp = () => {
    if (!isCabinFormValid) return;
    const phone = "525523091732";
    window.open(`https://wa.me/${phone}?text=${generateCabinQuoteText()}`, '_blank');
  };

  return (
    <div className="fade-in pt-24 md:pt-32 pb-24 px-4 md:px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden border-t-8 border-gold">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 h-80 lg:h-auto">
            <img src={cabinData.img} alt="Cabaña" className="w-full h-full object-cover" />
          </div>
          <div className="lg:w-1/2 bg-[#2A2A2A] text-white p-8 md:p-14">
            <Tent className="w-14 h-14 text-gold mb-6" />
            <h2 className="font-serif text-5xl font-bold text-gold mb-6 uppercase tracking-tight">Reserva tu Cabaña</h2>
            <p className="text-lg font-medium text-gray-200 mb-10 leading-relaxed">{cabinData.desc}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-gray-300 mb-10">
               {cabinData.amenities.map((a, i) => (
                 <li key={i} className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" /> {a}
                 </li>
               ))}
            </ul>
            <div className="bg-white/5 border border-white/10 p-6 text-sm font-medium leading-relaxed rounded mb-10">
               <p className="mb-3 uppercase tracking-tighter"><strong className="text-gold">Horarios:</strong> {cabinData.schedule}</p>
               <p><strong className="text-gold uppercase tracking-tighter">Reglas:</strong> {cabinData.policy}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-700 pt-8">
              <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">Costo Noche/Persona:</span>
              <span className="font-serif text-4xl text-gold font-bold">${cabinData.price} MXN</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-16 bg-white">
          <h3 className="font-serif text-4xl font-bold mb-12 border-b-2 border-gray-100 pb-4 text-gray-900">Detalles de la Reserva</h3>
          <div className="space-y-12">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-widest">Nombre Completo del Titular</label>
              <input 
                type="text" 
                value={clientDetails.name} 
                onChange={e => setClientDetails({...clientDetails, name: handleTextSecurity(e.target.value)})} 
                className="w-full border-b-2 border-gray-300 py-4 text-xl focus:border-gold outline-none transition-colors" 
                placeholder="¿A nombre de quién reserva?" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div><label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Entrada</label><input type="date" value={cabinConfig.checkIn} onChange={e => setCabinConfig({...cabinConfig, checkIn: e.target.value})} className="w-full border-b-2 border-gray-300 py-3 text-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Salida</label><input type="date" value={cabinConfig.checkOut} onChange={e => setCabinConfig({...cabinConfig, checkOut: e.target.value})} className="w-full border-b-2 border-gray-300 py-3 text-lg focus:border-gold outline-none" /></div>
              <div><label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Huéspedes (Max 6)</label><input type="number" min="1" max="6" value={cabinConfig.guests} onChange={e => setCabinConfig({...cabinConfig, guests: Math.min(6, Math.max(1, parseInt(e.target.value)||1))})} className="w-full border-b-2 border-gray-300 py-3 text-lg focus:border-gold outline-none" /></div>
            </div>
            <div className="bg-gray-100 p-10 md:p-16 text-center border-2 border-gray-200 rounded-sm shadow-inner">
              <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Costo Total Estimado</span>
              <p className="text-xl md:text-2xl text-gray-800 mt-2 mb-6 font-bold">Por {getCabinNights()} noche(s) y {cabinConfig.guests} persona(s)</p>
              <p className="font-serif text-6xl md:text-7xl text-gold font-bold mb-10">${cabinData.price * cabinConfig.guests * getCabinNights()} MXN</p>
              <div className="bg-white border p-6 rounded mb-12 max-w-2xl mx-auto flex gap-4 text-left font-bold text-sm text-gray-700 shadow-sm">
                <Info className="text-gold w-8 h-8 flex-shrink-0" />
                Una vez confirmada la disponibilidad de las fechas solicitadas, se validará el precio final por WhatsApp.
              </div>
              <button 
                onClick={sendCabinWhatsApp} 
                disabled={!isCabinFormValid} 
                className={`w-full max-w-lg mx-auto py-5 md:py-6 text-xl font-bold uppercase tracking-widest flex justify-center items-center gap-4 transition-all shadow-xl rounded-sm ${isCabinFormValid ? 'bg-[#25D366] text-white hover:bg-[#1DA851]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {isCabinFormValid ? <><MessageCircle className="w-7 h-7" /> Reservar por WhatsApp</> : 'Completa los datos para reservar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}