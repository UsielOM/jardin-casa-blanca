// src/views/PersonalizedInvitationView.jsx
import React, { useState, useEffect } from "react";
import { 
  MessageCircle, Smartphone, Sparkles, CheckCircle, Gift, X, Play 
} from "lucide-react";

// --- DATOS REALES DE INVITACIONES ---
const INVITATION_PACKAGES = [
  {
    id: "esencial",
    name: "Paquete Esencial",
    price: 500,
    video: "https://res.cloudinary.com/demo/video/upload/v1690000000/sample.mp4", // <-- CAMBIA ESTO POR TU LINK REAL
    desc: "Ideal para eventos íntimos o exprés. Funcional, elegante y directo al grano.",
    features: [
      "Soporte hasta el dia del evento ",
      "Diseño Elegante predefinido",
      "Mensaje de Bienvenida y Detalles",
      "Cuenta Regresiva",
      "Ubicación del evento ",
      "Galería Básica (hasta 4 fotos)",
      "Confirmación de Asistencia via whatsApp"
    ]
  },
  {
    id: "pro",
    name: "Paquete Pro",
    price: 1300,
    video: "https://res.cloudinary.com/demo/video/upload/v1690000000/sample.mp4", // <-- CAMBIA ESTO POR TU LINK REAL
    desc: "Todo lo que necesitas para una experiencia interactiva y completa. Tu evento con un toque único.",
    isPopular: true,
    features: [
      "Todo lo del Paquete Esencial",
      "Personalización Avanzada (Colores y tipo de letra)",
      "Música de Fondo a tu elección",
      "Integración de videos",
      "Secciones perzonalizadas",
      "Galería Extendida",
      "Confirmación Inteligente con control de pases"
    ]
  },
  {
    id: "vip",
    name: "Paquete VIP",
    price: 2000,
    video: "https://res.cloudinary.com/demo/video/upload/v1690000000/sample.mp4", // <-- CAMBIA ESTO POR TU LINK REAL
    desc: "La experiencia definitiva. Exclusividad total y diseño a la medida para un evento inolvidable.",
    features: [
      "Todo lo del Paquete Pro",
      "Diseño 100% a la Medida",
      "Dominio Web Propio (ej. losxvdesofia.com)",
      "Animaciones Premium y transiciones",
      "Soporte Prioritario"
    ]
  }
];

export default function PersonalizedInvitationView() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalPackage, setModalPackage] = useState(null); // Estado para controlar la modal

  // Bloquear el scroll de fondo cuando la modal está abierta
  useEffect(() => {
    if (modalPackage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalPackage]);

  // Generador del mensaje de WhatsApp (ACTUALIZADO CON TUS NUEVOS MENSAJES)
  const sendWhatsApp = () => {
    let msg = `✨ *Hola Jardín Casa Blanca!* ✨\n\n`;
    
    if (selectedPackage) {
      msg += `Me interesa el servicio de *Invitaciones Digitales Personalizadas* y me interesa este paquete: *${selectedPackage}*.\n\n`;
    } else {
      msg += `Me interesa el servicio de *Invitaciones Digitales Personalizadas*, pero tengo dudas sobre cómo es el servicio.\n\n¿Me podrían ayudar con más información, por favor? 📱✨`;
    }
    
    window.open(`https://wa.me/525523091732?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <div className="fade-in pt-20 bg-gray-50 min-h-screen">
        
        {/* 1. HERO SECTION */}
        <header className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/salon/salon-rosa.webp')" }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>
          <div className="relative text-white max-w-4xl z-10 animate-fade-in">
            <Smartphone className="w-16 h-16 text-gold mx-auto mb-6 opacity-80" />
            <h1 className="font-serif text-4xl md:text-7xl font-bold mb-4 uppercase tracking-tighter text-shadow-xl">
              Invitaciones Digitales
            </h1>
            <p className="text-sm md:text-xl font-medium text-gray-300 uppercase tracking-[0.3em] mb-8">
              Sorprende a tus invitados desde el primer click
            </p>
            <button 
              onClick={() => document.getElementById('paquetes').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 font-bold transition-all uppercase tracking-[0.2em] text-xs"
            >
              Ver Paquetes
            </button>
          </div>
        </header>

        {/* 2. CÓMO FUNCIONA */}
        <section className="py-20 px-4 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 font-bold mb-16 uppercase tracking-tight">
              ¿Cómo funciona?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30 text-gold">
                  <span className="font-serif text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-3">Elige tu paquete</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Revisa nuestras opciones y selecciona la que mejor se adapte al estilo y necesidades de tu evento.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30 text-gold">
                  <span className="font-serif text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-3">Contáctanos</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Escríbenos por WhatsApp. Te enviaremos un formulario especial para que subas tus fotos, itinerario y datos.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/30 text-gold">
                  <span className="font-serif text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-3">¡Comparte!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Diseñamos tu invitación mágica y te entregamos un enlace web único para que se lo envíes a todos tus invitados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PAQUETES */}
        <section id="paquetes" className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-gold font-bold text-[10px] uppercase tracking-[0.4em]">Nuestras opciones</span>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold mt-4 uppercase tracking-tight">
                Planes de Diseño
              </h2>
            </div>

            {/* --- BANNER DE DESCUENTO --- */}
            <div className="max-w-4xl mx-auto mb-16 bg-gold/10 border border-gold/30 rounded-sm p-6 text-center animate-fade-in shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Gift className="w-6 h-6 text-gold" />
                <h3 className="font-serif text-xl font-bold text-gray-900 uppercase tracking-widest">¡Beneficio Exclusivo!</h3>
              </div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Si ya reservaste nuestro <strong>Salón</strong> o <strong>Cabaña VIP</strong>, obtienes automáticamente un <strong className="text-gold text-lg">30% DE DESCUENTO</strong> en cualquiera de nuestras invitaciones digitales. <br className="hidden sm:block" />Tu descuento no tiene fecha de caducidad, ¡hazlo válido hasta que estés listo para empezar tu diseño!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INVITATION_PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative flex flex-col bg-white rounded-sm transition-all duration-300 overflow-hidden ${
                    pkg.isPopular 
                      ? 'border-2 border-gold shadow-2xl scale-100 md:scale-105 z-10' 
                      : 'border border-gray-200 shadow-md hover:border-gold/50'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="bg-gold text-white text-[9px] font-bold uppercase tracking-widest text-center py-2">
                      <Sparkles className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Más Solicitado
                    </div>
                  )}
                  
                  <div className="p-8 border-b border-gray-100 text-center bg-gray-50/50">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 uppercase tracking-tight mb-2">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 h-10 mb-6 px-2">{pkg.desc}</p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-gold font-bold text-xl">$</span>
                      <span className="font-serif text-5xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-gray-400 text-xs font-bold uppercase mb-1">MXN</span>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">¿Qué incluye?</p>
                    <ul className="space-y-4 flex-grow mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* BOTÓN ACTUALIZADO PARA ABRIR MODAL */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalPackage(pkg);
                      }}
                      className={`w-full py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-2 ${
                        selectedPackage === pkg.name 
                          ? 'bg-gray-900 border-gray-900 text-white' 
                          : pkg.isPopular 
                            ? 'bg-gold border-gold text-white hover:bg-gold/90' 
                            : 'bg-transparent border-gray-300 text-gray-600 hover:border-gold hover:text-gold'
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      {selectedPackage === pkg.name ? '✓ Elegido (Ver Detalle)' : 'Ver Ejemplo y Detalles'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CTA / FORMULARIO WHATSAPP */}
        <section id="contacto-whats" className="py-24 bg-gray-900 px-4">
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 md:p-14 shadow-2xl rounded-sm border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5">
              <Smartphone className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-5xl text-gold font-bold uppercase mb-6">
                Comienza tu Diseño
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                {selectedPackage 
                  ? `¡Excelente elección! Has seleccionado el ${selectedPackage}. Mándanos un mensaje para compartirte el formulario donde podrás subir tu información, fotos y gustos musicales.` 
                  : `¿Ya sabes qué paquete quieres o tienes alguna duda? Escríbenos para compartirte el formulario interactivo y empezar a darle vida a tu invitación.`
                }
              </p>

              <button 
                onClick={sendWhatsApp}
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 font-bold uppercase tracking-widest text-xs md:text-sm rounded-sm hover:scale-105 hover:bg-[#1DA851] transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-6 h-6" />
                Continua tu proceso en WhatsApp
              </button>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-6">
                Te atenderemos enseguida.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* --- MODAL EMERGENTE DE VIDEO Y DETALLES --- */}
      {modalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/95 animate-fade-in" onClick={() => setModalPackage(null)}>
          <div 
            className="relative bg-[#1A1A1A] text-white border border-gold/30 rounded-sm shadow-[0_0_100px_rgba(197,160,89,0.2)] w-full max-w-5xl max-h-full flex flex-col animate-pop-in overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header de Modal */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#1A1A1A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                    {modalPackage.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mt-2">
                    Invitación Digital Interactiva
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setModalPackage(null)} 
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Contenido de Modal */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Columna Video Celular */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                   <div className="aspect-[9/16] bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group flex items-center justify-center">
                      <video 
                        className="w-full h-full object-cover z-20 relative" 
                        controls 
                        playsInline 
                        autoPlay 
                        loop 
                        muted 
                        key={modalPackage.video}
                        ref={(el) => { if (el) el.volume = 0.2; }}
                      >
                        <source src={modalPackage.video} type="video/mp4" />
                        Tu navegador no soporta el video.
                      </video>
                   </div>
                </div>

                {/* Columna Detalles */}
                <div className="lg:w-2/3">
                   <h4 className="font-serif text-xl font-bold text-gold mb-8 uppercase tracking-[0.2em] border-b border-gold/20 pb-4 inline-block">
                     Todo lo que incluye:
                   </h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                     {modalPackage.features.map((i, idx) => (
                       <div key={idx} className="flex gap-3 items-start group">
                         <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" /> 
                         <span className="uppercase tracking-widest text-[11px] text-gray-300 font-bold leading-relaxed group-hover:text-white transition-colors">
                           {i}
                         </span>
                       </div>
                     ))}
                   </div>
                   
                   <div className="mt-12 p-6 bg-gold/5 border border-gold/10 rounded-sm">
                      <p className="text-[11px] text-gray-400 italic leading-relaxed">
                        * Recuerda que nuestras invitaciones son compatibles con todos los dispositivos móviles y computadoras. No requieren descargar ninguna aplicación adicional.
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Footer de Modal */}
            <div className="p-8 border-t border-white/10 bg-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-1 font-bold">Inversión del Paquete</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-gold">${modalPackage.price}</span>
                  <span className="text-xs text-gray-500 font-bold">MXN</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedPackage(modalPackage.name);
                  setModalPackage(null);
                  setTimeout(() => {
                    document.getElementById('contacto-whats').scrollIntoView({ behavior: 'smooth' });
                  }, 150); // Pequeño retraso para que cierre la modal primero
                }} 
                className={`w-full sm:w-auto px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl ${
                  selectedPackage === modalPackage.name 
                    ? 'bg-transparent border-2 border-white/20 text-white hover:bg-white/5' 
                    : 'bg-gold border-2 border-gold text-white hover:bg-gold/80 hover:scale-105'
                }`}
              >
                {selectedPackage === modalPackage.name ? '✓ Ya está seleccionado' : 'Seleccionar este Paquete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}