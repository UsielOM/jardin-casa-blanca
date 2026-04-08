// src/views/SalonView.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle, ChevronLeft, ChevronRight, Clock, Info, User, Tag,
  Calendar as CalendarIcon, MessageCircle, Play, Sparkles, Plus, Minus, Tent, Palette, X, Music, Search, Trophy,
  Cookie, Coffee, Check
} from "lucide-react";
import {
  tablesData,
  inflatablesProviders,
  soundData,
  bandsData,
  cabinData,
  specialBarsData,
} from "../data/catalog";

const CUBRE_COLORS = [
  "Rojo", "Rosa Mexicano", "Palo de Rosa", "Azul Cielo", 
  "Azul Rey", "Amarillo Girasol", "Vino", "Menta", "Tenangos"
];

// --- DICCIONARIO DE COLORES VISUALES ---
const COLOR_SWATCHES = {
  "Rojo": "bg-red-600",
  "Rosa Mexicano": "bg-pink-600",
  "Palo de Rosa": "bg-rose-300",
  "Azul Cielo": "bg-sky-300",
  "Azul Rey": "bg-blue-700",
  "Amarillo Girasol": "bg-yellow-400",
  "Vino": "bg-red-900",
  "Menta": "bg-teal-300",
  "Tenangos": "bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500"
};

// --- COMPONENTE MODAL DE MÚSICA ---
const MusicDetailsModal = ({ data, onClose, onSelect, isSelected }) => {
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  const existingConfig = data?.currentConfig || {};
  const [extraHours, setExtraHours] = useState(existingConfig.extraHours || 0);
  const [selectedOptions, setSelectedOptions] = useState(existingConfig.selectedOptions || {});
  const [selectedAddons, setSelectedAddons] = useState(existingConfig.selectedAddons || []);

  useEffect(() => {
    const timer = setTimeout(() => setCanLoadVideo(true), 350);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;
  const { provider, package: pkg } = data;

  const modalTotal = pkg.price 
    + (extraHours * (pkg.extraHourPrice || 0)) 
    + selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.name === addon.name) 
        ? prev.filter(a => a.name !== addon.name) 
        : [...prev, addon]
    );
  };

  const handleOptionChange = (opt, choice) => {
    setSelectedOptions(prev => {
      if (opt.max) {
        const currentList = prev[opt.id] || [];
        if (currentList.includes(choice)) {
          return { ...prev, [opt.id]: currentList.filter(c => c !== choice) };
        }
        if (currentList.length < opt.max) {
          return { ...prev, [opt.id]: [...currentList, choice] };
        }
        return prev; 
      } else {
        return { ...prev, [opt.id]: choice };
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/95 animate-fade-in transform-gpu" onClick={onClose}>
      <div 
        className="relative bg-[#1A1A1A] text-white border border-gold/30 rounded-sm shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col animate-pop-in overflow-hidden transform-gpu" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#1A1A1A] sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-gold" />
            <div>
              <h3 className="font-serif text-2xl md:text-4xl font-bold uppercase tracking-tight text-white leading-none break-words">
                {pkg.name}
              </h3>
              <p className="text-sm font-bold text-gold uppercase tracking-[0.2em] mt-2">
                {provider.name}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/3 flex flex-col gap-4">
               <div className="aspect-[9/16] bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
                  {canLoadVideo ? (
                    <video className="w-full h-full object-cover z-20 relative" controls playsInline preload="metadata" key={pkg.video} ref={(el) => { if (el) el.volume = 0.2; }}>
                      <source src={pkg.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    </div>
                  )}
               </div>
            </div>

            <div className="lg:w-2/3">
               <h4 className="font-serif text-2xl font-bold text-gold mb-8 uppercase tracking-[0.1em] border-b border-gold/20 pb-4 inline-block">
                 Servicios Exclusivos Incluidos:
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                 {pkg.includes.map((i, idx) => (
                   <div key={idx} className="flex gap-3 items-start group">
                     <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" /> 
                     <span className="uppercase tracking-wide text-sm text-gray-200 font-medium leading-relaxed">{i}</span>
                   </div>
                 ))}
               </div>

               {(pkg.extraHourPrice || pkg.options || pkg.addons) && (
                 <div className="mt-10 border-t border-white/10 pt-8 animate-fade-in">
                    <h4 className="font-serif text-2xl font-bold text-gold mb-6 uppercase tracking-[0.1em]">Personaliza tu paquete:</h4>
                    
                    {pkg.extraHourPrice && (
                      <div className="mb-6 bg-white/5 p-5 rounded border border-white/10 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-base uppercase tracking-widest text-white">Horas Extra</p>
                          <p className="text-sm text-gray-400 font-medium mt-1">${pkg.extraHourPrice} MXN por hora extra</p>
                        </div>
                        <div className="flex items-center border border-gray-600 rounded bg-black overflow-hidden h-12 w-32">
                          <button onClick={() => setExtraHours(Math.max(0, extraHours - 1))} className="flex-1 text-gold hover:bg-white/10 font-bold text-2xl">-</button>
                          <span className="w-12 text-center text-lg font-bold">{extraHours}</span>
                          <button onClick={() => setExtraHours(extraHours + 1)} className="flex-1 text-gold hover:bg-white/10 font-bold text-2xl">+</button>
                        </div>
                      </div>
                    )}

                    {pkg.options && pkg.options.map(opt => {
                      const currentSelections = selectedOptions[opt.id] || (opt.max ? [] : "");
                      return (
                        <div key={opt.id} className="mb-6 bg-white/5 p-5 rounded border border-white/10">
                          <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-base uppercase tracking-widest text-white">{opt.label}</p>
                            {opt.max && <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Seleccionados: {currentSelections.length} / {opt.max}</span>}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {opt.choices.map(choice => {
                              const isSelected = opt.max ? currentSelections.includes(choice) : currentSelections === choice;
                              return (
                                <button
                                  key={choice}
                                  onClick={() => handleOptionChange(opt, choice)}
                                  className={`px-5 py-3 text-sm font-bold uppercase rounded-sm border transition-all ${isSelected ? 'bg-gold border-gold text-white shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'border-gray-500 text-gray-300 hover:border-gold/50 hover:text-white'}`}
                                >
                                  {choice}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {pkg.addons && pkg.addons.length > 0 && (
                      <div className="mb-6 bg-white/5 p-5 rounded border border-white/10">
                        <p className="font-bold text-base uppercase tracking-widest text-white mb-4">Equipo / Aditamentos Extra</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {pkg.addons.map(addon => {
                            const isAddonSelected = selectedAddons.some(a => a.name === addon.name);
                            return (
                              <button
                                key={addon.name}
                                onClick={() => toggleAddon(addon)}
                                className={`flex justify-between items-center p-4 text-sm font-bold border rounded-sm transition-all ${isAddonSelected ? 'bg-gold/10 border-gold text-white' : 'border-gray-500 text-gray-300 hover:border-gold/50'}`}
                              >
                                <span>{isAddonSelected ? '✓' : '+'} {addon.name}</span>
                                <span className={isAddonSelected ? 'text-gold' : 'text-gray-400'}>${addon.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                 </div>
               )}

               <div className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-sm">
                  <p className="text-base text-gray-300 italic leading-relaxed">
                    * Todos los paquetes y equipos extras están sujetos a disponibilidad. Para más detalles o solicitudes especiales, no dudes en contactarnos.
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-white/10 bg-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-2 font-bold">Total del Paquete (con extras)</p>
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span className="font-serif text-5xl md:text-6xl font-bold text-gold">${modalTotal}</span>
              <span className="text-lg text-gray-400 font-bold">MXN</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {isSelected && (
              <button 
                onClick={() => { onSelect(provider, pkg, null, true); onClose(); }} 
                className="w-full sm:w-auto px-8 py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] transition-all bg-transparent border-2 border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Quitar
              </button>
            )}
            <button 
              onClick={() => { onSelect(provider, pkg, { extraHours, selectedOptions, selectedAddons, modalTotal }); onClose(); }} 
              className={`w-full sm:w-auto px-12 py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-2xl ${isSelected ? 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20' : 'bg-gold border-2 border-gold text-white hover:scale-105'}`}
            >
              {isSelected ? 'Actualizar Plan' : 'Agregar este Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISTA PRINCIPAL ---
export default function SalonView() {
  const [clientDetails, setClientDetails] = useState({ name: "", eventType: "" });
  const [eventDate, setEventDate] = useState("");
  const [activeProviderIndex, setActiveProviderIndex] = useState(0);
  const [salonConfig, setSalonConfig] = useState({ extraHours: 0 });
  
  const [selections, setSelections] = useState({
    tables: {
      t1: { active: false, mantelQty: 0, cubreQty: 0, cubreColor: "Rojo" },
      t2: { active: false, mantelQty: 0, cubreQty: 0, cubreColor: "Rojo" },
    },
    inflatables: [],
    music: [], 
    specialBars: [] 
  });
  
  // --- LÓGICA DE CARRUSEL PARA BARRAS TEMÁTICAS ---
  const [currentBarIndex, setCurrentBarIndex] = useState(0);
  const [isConfiguringBar, setIsConfiguringBar] = useState(false);
  const [specialBarDraft, setSpecialBarDraft] = useState({ qty: 50, options: {} });

  const currentBar = specialBarsData[currentBarIndex];
  
  const existingBar = selections.specialBars.find(b => b.typeId === currentBar.id);
  const isAlreadyAdded = !!existingBar;

  const nextSpecialBar = () => {
    setCurrentBarIndex((prev) => (prev + 1) % specialBarsData.length);
    setIsConfiguringBar(false);
  };

  const prevSpecialBar = () => {
    setCurrentBarIndex((prev) => (prev - 1 + specialBarsData.length) % specialBarsData.length);
    setIsConfiguringBar(false);
  };

  const handleOpenConfig = () => {
    if (existingBar) {
      setSpecialBarDraft({ qty: existingBar.qty, options: existingBar.options });
    } else {
      setSpecialBarDraft({ qty: 50, options: {} });
    }
    setIsConfiguringBar(true);
  };

  const toggleSpecialBarDraftOption = (optId, choice, max) => {
    setSpecialBarDraft(prev => {
      const currentList = prev.options[optId] || [];
      if (currentList.includes(choice)) {
        return { ...prev, options: { ...prev.options, [optId]: currentList.filter(c => c !== choice) } };
      }
      if (currentList.length < max) {
        return { ...prev, options: { ...prev.options, [optId]: [...currentList, choice] } };
      }
      return prev;
    });
  };

  const addSpecialBarToQuote = () => {
    setSelections(prev => {
      const existingIndex = prev.specialBars.findIndex(b => b.typeId === currentBar.id);
      
      const newBarData = {
        id: existingIndex > -1 ? prev.specialBars[existingIndex].id : Date.now().toString(),
        typeId: currentBar.id,
        name: currentBar.name,
        qty: specialBarDraft.qty,
        options: specialBarDraft.options
      };

      let newSpecialBars = [...prev.specialBars];
      if (existingIndex > -1) {
        newSpecialBars[existingIndex] = newBarData;
      } else {
        newSpecialBars.push(newBarData);
      }

      return { ...prev, specialBars: newSpecialBars };
    });
    
    setIsConfiguringBar(false);
  };

  const removeSpecialBarFromQuote = (uniqueId) => {
    setSelections(prev => ({
      ...prev,
      specialBars: prev.specialBars.filter(bar => bar.id !== uniqueId)
    }));
  };

  const [cabinConfig, setCabinConfig] = useState({ rent: false, checkIn: "", checkOut: "", guests: 2 });
  const [musicTab, setMusicTab] = useState("sounds");
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [showMusicPackages, setShowMusicPackages] = useState(false);
  const [selectedMusicPackage, setSelectedMusicPackage] = useState(null);

  useEffect(() => {
    if (selectedMusicPackage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMusicPackage]);

  const handleTextSecurity = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]/g, "");

  const updateTableQtyConfig = (id, field, change) => {
    setSelections((prev) => {
      const newQty = Math.max(0, prev.tables[id][field] + change);
      const newConfig = { ...prev.tables[id], [field]: newQty };
      return { ...prev, tables: { ...prev.tables, [id]: { ...newConfig, active: (newConfig.mantelQty + newConfig.cubreQty) > 0 } } };
    });
  };

  const updateTableColor = (id, color) => {
    setSelections(prev => ({
      ...prev,
      tables: { ...prev.tables, [id]: { ...prev.tables[id], cubreColor: color } }
    }));
  };

  const handleMusicSelect = (provider, pkg, config, isRemoving = false) => {
    setSelections((prev) => {
      let newMusic = [...prev.music];
      const existingIdx = newMusic.findIndex((m) => m.providerId === provider.id);

      if (isRemoving) {
        if (existingIdx > -1) newMusic.splice(existingIdx, 1);
      } else {
        const newEntry = {
          providerId: provider.id,
          providerName: provider.name,
          packageId: pkg.id,
          packageName: pkg.name,
          basePrice: pkg.price,
          extraHours: config.extraHours,
          extraHourPrice: pkg.extraHourPrice || 0,
          selectedOptions: config.selectedOptions,
          selectedAddons: config.selectedAddons,
          price: config.modalTotal 
        };

        if (existingIdx > -1) {
          newMusic[existingIdx] = newEntry; 
        } else {
          newMusic.push(newEntry);
        }
      }
      return { ...prev, music: newMusic };
    });
  };

  const toggleInflatable = (inf) => {
    const exists = selections.inflatables.find((i) => i.id === inf.id);
    setSelections((prev) => ({
      ...prev,
      inflatables: exists ? prev.inflatables.filter((i) => i.id !== inf.id) : [...prev.inflatables, inf],
    }));
  };

  const getCabinNights = () => {
    if (!cabinConfig.checkIn || !cabinConfig.checkOut) return 1;
    const diff = new Date(cabinConfig.checkOut) - new Date(cabinConfig.checkIn);
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const totalEstimadoSalon = () => {
    let total = 2500 + salonConfig.extraHours * 250;
    Object.keys(selections.tables).forEach((k) => {
      if (selections.tables[k].active) total += selections.tables[k].mantelQty * 100 + selections.tables[k].cubreQty * 110;
    });
    selections.inflatables.forEach((i) => (total += i.price));
    selections.music.forEach((m) => (total += m.price));
    if (cabinConfig.rent) total += cabinData.price * cabinConfig.guests * getCabinNights();
    return total;
  };

  const isSalonFormValid = clientDetails.name.trim() !== "" && clientDetails.eventType.trim() !== "" && eventDate !== "";

  const generateQuoteTextSalon = () => {
    let msg = `✨ *Hola, me gustaría cotizar mi evento en Jardín Casa Blanca Necaxa* ✨\n\n`;
    msg += `👤 *Nombre:* ${clientDetails.name}\n🎉 *Evento:* ${clientDetails.eventType}\n📅 *Fecha:* ${eventDate}\n\n`;
    msg += `📋 *DESGLOSE DE SERVICIOS:*\n🏰 Renta del Salón: $2,500 MXN\n`;
    if (salonConfig.extraHours > 0) msg += `⏳ Horas extras: ${salonConfig.extraHours} ($${salonConfig.extraHours * 250})\n`;

    Object.keys(selections.tables).forEach((k) => {
      const t = selections.tables[k];
      if (t.active) {
        const d = tablesData.find((x) => x.id === k);
        if (t.mantelQty > 0) msg += `🪑 ${t.mantelQty}x ${d.name} (Mantel) - $${t.mantelQty * 100} MXN\n`;
        if (t.cubreQty > 0) msg += `🪑 ${t.cubreQty}x ${d.name} (Cubre Color: ${t.cubreColor}) - $${t.cubreQty * 110} MXN\n`;
      }
    });

    if (selections.specialBars.length > 0) {
      msg += `\n🍹 *BARRAS Y MESAS TEMÁTICAS (A Cotizar)*\n`;
      selections.specialBars.forEach(bar => {
         msg += `  - ${bar.name} (${bar.qty} personas)\n`;
         const barConfig = specialBarsData.find(b => b.id === bar.typeId);
         if (barConfig && barConfig.options) {
             barConfig.options.forEach(opt => {
                 const chosen = bar.options[opt.id];
                 if (chosen && chosen.length > 0) {
                     msg += `    * ${opt.label.split('(')[0].trim()}: ${chosen.join(', ')}\n`;
                 }
             });
         }
      });
    }

    msg += `\n`;
    selections.inflatables.forEach((i) => (msg += `🎈 ${i.id}: ${i.name} - $${i.price} MXN\n`));
    
    selections.music.forEach((m) => {
      msg += `🎵 ${m.providerName}: ${m.packageName} - $${m.basePrice} MXN\n`;
      if (m.extraHours > 0) msg += `   - ${m.extraHours} Hora(s) Extra - $${m.extraHours * m.extraHourPrice} MXN\n`;
      
      if (m.selectedOptions) {
        Object.keys(m.selectedOptions).forEach(optKey => {
           const val = m.selectedOptions[optKey];
           if (Array.isArray(val)) {
             if (val.length > 0) msg += `   - Elección: ${val.join(', ')}\n`;
           } else {
             if (val) msg += `   - Elección: ${val}\n`;
           }
        });
      }
      if (m.selectedAddons && m.selectedAddons.length > 0) {
        m.selectedAddons.forEach(addon => {
           msg += `   - Aditamento: ${addon.name} - $${addon.price} MXN\n`;
        });
      }
    });

    if (cabinConfig.rent) msg += `🏡 Cabaña VIP (${getCabinNights()} noches) - $${cabinData.price * cabinConfig.guests * getCabinNights()} MXN\n`;

    msg += `\n💰 *COSTO TOTAL ESTIMADO:* $${totalEstimadoSalon()} MXN\n`;
    msg += `\n⚠️ *El precio final se validará por mensaje, ya que bandas, inflables y Barras Temáticas están sujetos a disponibilidad.*\n`;
    return encodeURIComponent(msg);
  };

  const sendWhatsAppSalon = () => {
    if (!isSalonFormValid) return;
    window.open(`https://wa.me/525523091732?text=${generateQuoteTextSalon()}`, "_blank");
  };

  const currentMusicData = musicTab === "sounds" ? soundData : bandsData;
  const currentArtist = currentMusicData[currentMusicIndex];

  return (
    <>
      <div className="fade-in pt-20">
        {/* 1. Hero */}
        <header className="relative h-[40vh] md:h-[60vh] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/salon/salon-rosa.webp')" }}>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative text-white max-w-4xl">
            <h1 className="font-serif text-5xl md:text-9xl font-bold mb-4 uppercase tracking-tighter text-shadow-xl">Tu Evento Ideal</h1>
            <p className="text-lg md:text-2xl font-medium opacity-90 uppercase tracking-widest mt-2">Jardín Casa Blanca Necaxa</p>
          </div>
        </header>

        {/* INSTRUCCIONES */}
        <section className="bg-white py-16 px-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <Info className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold uppercase tracking-tight mb-6">
              Arma tu paquete a la medida
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
              Bienvenido a nuestro cotizador interactivo. Navega por las siguientes secciones hacia abajo para elegir el tipo de mobiliario, 
              agregar servicios de comida y bebida, seleccionar inflables, grupos musicales o incluso reservar nuestra cabaña VIP. 
              Al final de la página verás el desglose total de tu evento y podrás enviarnos tu cotización directamente por WhatsApp.
            </p>
          </div>
        </section>

        {/* 2. MOBILIARIO */}
        <section id="mesas" className="py-20 md:py-28 px-4 bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-gold text-center font-bold mb-16 uppercase tracking-tight">Selección de Mobiliario</h2>
            <div className="grid grid-cols-1 gap-14">
              {tablesData.map((table) => {
                const t = selections.tables[table.id];
                return (
                  <div key={table.id} className={`flex flex-col lg:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl ${t.active ? "ring-2 ring-gold" : ""}`}>
                    
                    <div className="lg:w-2/5 h-72 lg:h-auto relative">
                      <img src={table.img} className="w-full h-full object-cover" alt={table.name} />
                      {t.active && (
                        <div className="absolute top-4 right-4 bg-gold text-white p-3 rounded-full shadow-lg animate-fade-in">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-between">
                      <div className="mb-8">
                        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight text-gray-900">{table.name}</h3>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">{table.desc}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`p-6 rounded-md border transition-colors ${t.mantelQty > 0 ? "bg-gold/5 border-gold/40" : "bg-gray-50 border-gray-300"}`}>
                          <div className="flex justify-between items-center mb-5">
                            <div>
                              <p className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-widest">Con Mantel</p>
                              <p className="text-sm text-gray-600 font-medium mt-1">$100 MXN c/u</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-white border border-gray-400 rounded shadow-sm w-full h-14">
                            <button onClick={() => updateTableQtyConfig(table.id, 'mantelQty', -1)} className="flex-1 h-full text-gold hover:bg-gray-100 font-bold text-2xl transition-colors">-</button>
                            <span className="w-14 text-center text-lg font-bold text-gray-900">{t.mantelQty}</span>
                            <button onClick={() => updateTableQtyConfig(table.id, 'mantelQty', 1)} className="flex-1 h-full text-gold hover:bg-gray-100 font-bold text-2xl transition-colors">+</button>
                          </div>
                        </div>

                        <div className={`p-6 rounded-md border transition-colors ${t.cubreQty > 0 ? "bg-gold/5 border-gold/40" : "bg-gray-50 border-gray-300"}`}>
                          <div className="flex justify-between items-center mb-5">
                            <div>
                              <p className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-widest">Mantel + Cubre</p>
                              <p className="text-sm text-gray-600 font-medium mt-1">$110 MXN c/u</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-white border border-gray-400 rounded shadow-sm w-full h-14">
                            <button onClick={() => updateTableQtyConfig(table.id, 'cubreQty', -1)} className="flex-1 h-full text-gold hover:bg-gray-100 font-bold text-2xl transition-colors">-</button>
                            <span className="w-14 text-center text-lg font-bold text-gray-900">{t.cubreQty}</span>
                            <button onClick={() => updateTableQtyConfig(table.id, 'cubreQty', 1)} className="flex-1 h-full text-gold hover:bg-gray-100 font-bold text-2xl transition-colors">+</button>
                          </div>
                        </div>
                      </div>

                      {t.cubreQty > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                          <div className="flex items-center gap-3 mb-6">
                            <Palette className="w-6 h-6 text-gold" />
                            <p className="text-sm md:text-base font-bold text-gray-600 uppercase tracking-widest">
                              Color del Cubre: <span className="text-gray-900 ml-2 border-b-2 border-gold pb-1">{t.cubreColor}</span>
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {CUBRE_COLORS.map(color => (
                              <button 
                                key={color}
                                title={color}
                                onClick={() => updateTableColor(table.id, color)}
                                className={`
                                  relative w-12 h-12 rounded-full shadow-md transition-all duration-300
                                  ${COLOR_SWATCHES[color]} 
                                  ${t.cubreColor === color 
                                    ? 'ring-4 ring-gold ring-offset-4 scale-110' 
                                    : 'border-2 border-gray-200 hover:scale-110 hover:shadow-lg'}
                                `}
                              >
                                {t.cubreColor === color && (
                                  <Check className="absolute inset-0 m-auto w-6 h-6 text-white drop-shadow-md" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. SERVICIOS DE CASA UNIFICADOS */}
        <section id="servicios-casa" className="py-20 md:py-28 bg-white px-4 md:px-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="w-14 h-14 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold uppercase tracking-tight mb-4">Barras Temáticas Premium</h2>
              <p className="text-gray-600 font-medium text-sm md:text-base uppercase tracking-widest mt-2">
                Complementos exclusivos. El precio se cotizará por WhatsApp según la selección y disponibilidad.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative mb-12">
              <div className={`bg-white border transition-all duration-300 rounded-xl flex flex-col overflow-hidden ${isConfiguringBar ? 'border-gold shadow-2xl ring-2 ring-gold scale-[1.02] z-10' : 'border-gray-300 shadow-lg'}`}>
                
                <div className="bg-gray-50 border-b border-gray-300 p-5 md:p-8 flex justify-between items-center">
                  <button onClick={prevSpecialBar} className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-colors shadow-md">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="text-center px-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2 hidden sm:block">Catálogo de Barras ({currentBarIndex + 1}/{specialBarsData.length})</p>
                    <div className="flex items-center gap-3">
                      <h4 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold uppercase tracking-widest leading-tight">
                        {currentBar.name}
                      </h4>
                      {isAlreadyAdded && <CheckCircle className="w-8 h-8 text-green-600 hidden sm:block" />}
                    </div>
                  </div>

                  <button onClick={nextSpecialBar} className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-colors shadow-md">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8 md:p-12 flex-grow flex flex-col">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 flex-grow text-center font-medium">
                    {currentBar.includes.length > 0 ? (
                      <><strong className="text-gray-900">Incluye:</strong> {currentBar.includes.join(", ")}.</>
                    ) : (
                      "Servicio y montaje exclusivo a tu medida."
                    )}
                  </p>

                  {!isConfiguringBar && (
                    <button
                      onClick={handleOpenConfig}
                      className={`w-full py-5 text-sm md:text-base font-bold uppercase tracking-widest border-2 rounded-md transition-colors shadow-sm ${isAlreadyAdded ? 'border-green-600 text-green-700 hover:bg-green-50' : 'border-gray-300 text-gray-700 hover:border-gold hover:text-gold hover:bg-yellow-50'}`}
                    >
                      {isAlreadyAdded ? '✓ Modificar esta Barra' : 'Configurar esta Barra'}
                    </button>
                  )}

                  {isConfiguringBar && (
                    <div className="mt-4 animate-fade-in flex flex-col gap-8">
                      
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 flex flex-col items-center shadow-inner">
                         <p className="text-sm text-gray-600 font-bold uppercase tracking-widest mb-4 text-center">¿Para cuántas personas?</p>
                         <div className="flex items-center justify-center gap-8">
                           <button onClick={() => setSpecialBarDraft(prev => ({...prev, qty: Math.max(50, prev.qty - 10)}))} className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded text-gold hover:text-gray-900 hover:bg-gray-100 font-bold text-4xl leading-none shadow-sm">-</button>
                           <span className="w-20 text-center font-bold text-3xl text-gray-900">{specialBarDraft.qty}</span>
                           <button onClick={() => setSpecialBarDraft(prev => ({...prev, qty: Math.min(200, prev.qty + 10)}))} className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded text-gold hover:text-gray-900 hover:bg-gray-100 font-bold text-4xl leading-none shadow-sm">+</button>
                         </div>
                      </div>

                      {currentBar.options.length > 0 && (
                        <div className="space-y-8 mt-4">
                          {currentBar.options.map(opt => {
                            const currentList = specialBarDraft.options[opt.id] || [];
                            return (
                              <div key={opt.id}>
                                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                  <p className="font-bold text-sm uppercase tracking-widest text-gray-900">{opt.label}</p>
                                  <span className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded">
                                    {currentList.length} / {opt.max}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  {opt.choices.map(choice => {
                                    const isSelected = currentList.includes(choice);
                                    return (
                                      <button
                                        key={choice}
                                        onClick={() => toggleSpecialBarDraftOption(opt.id, choice, opt.max)}
                                        className={`px-5 py-3 text-sm md:text-base font-bold rounded-md border-2 transition-colors ${isSelected ? 'bg-gold border-gold text-white shadow-lg' : 'border-gray-300 text-gray-700 hover:border-gold/50 hover:text-gray-900 bg-white hover:bg-gray-50'}`}
                                      >
                                        {choice}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
                         <button onClick={() => setIsConfiguringBar(false)} className="w-full sm:w-1/3 py-5 text-sm font-bold uppercase tracking-widest border-2 border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
                           Cancelar
                         </button>
                         <button onClick={addSpecialBarToQuote} className={`w-full sm:w-2/3 py-5 text-sm md:text-base font-bold uppercase tracking-widest text-white rounded-md shadow-lg transition-all transform hover:scale-[1.02] ${isAlreadyAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-gold hover:bg-yellow-600'}`}>
                           {isAlreadyAdded ? 'Actualizar mi cotización' : 'Agregar a mi cotización'}
                         </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-16 flex-wrap max-w-lg mx-auto">
              {specialBarsData.map((bar, idx) => {
                const isSelectedInCart = selections.specialBars.some(b => b.typeId === bar.id);
                return (
                  <button 
                    key={bar.id} 
                    onClick={() => {
                      setCurrentBarIndex(idx);
                      setIsConfiguringBar(false);
                    }}
                    className={`h-3 rounded-full transition-all duration-300 shadow-sm ${idx === currentBarIndex ? 'bg-gold w-10' : (isSelectedInCart ? 'bg-green-500 w-4' : 'bg-gray-300 w-3 hover:bg-gray-400')}`} 
                    title={bar.name}
                  />
                )
              })}
            </div>

            {selections.specialBars.length > 0 && (
              <div className="max-w-4xl mx-auto bg-gray-100 border border-gray-300 p-8 md:p-10 rounded-xl shadow-inner animate-fade-in">
                <h4 className="font-serif text-3xl text-gray-900 font-bold uppercase tracking-tight mb-8 text-center border-b border-gray-300 pb-4">Tus Barras Seleccionadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selections.specialBars.map(bar => (
                    <div key={bar.id} className="bg-white border border-gray-300 shadow-md p-6 rounded-lg flex justify-between items-start group relative overflow-hidden transition-all hover:shadow-lg">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold"></div>
                      <div className="pl-4 flex-grow">
                        <p className="font-bold text-gold text-base md:text-lg uppercase tracking-widest mb-1">{bar.name}</p>
                        <p className="text-sm text-gray-600 font-bold mb-3 bg-gray-100 inline-block px-3 py-1 rounded">{bar.qty} personas</p>
                        <div className="space-y-1">
                          {Object.keys(bar.options).map(optKey => {
                            const vals = bar.options[optKey];
                            if (!vals || vals.length === 0) return null;
                            return <p key={optKey} className="text-xs md:text-sm text-gray-700 uppercase font-medium">✓ {vals.join(", ")}</p>
                          })}
                        </div>
                      </div>
                      <button onClick={() => removeSpecialBarFromQuote(bar.id)} className="text-red-500 hover:text-red-700 p-3 opacity-100 md:opacity-60 group-hover:opacity-100 transition-all bg-red-50 hover:bg-red-100 rounded-full flex-shrink-0" title="Quitar Barra">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. INFLABLES */}
        <section id="inflables" className="py-20 md:py-28 bg-gray-50 px-4 md:px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <Tent className="w-14 h-14 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold uppercase tracking-tight mb-4">Inflables Disponibles</h2>
              <p className="text-gray-600 font-medium text-sm md:text-base uppercase tracking-widest mt-2">
                Diversión garantizada para los más pequeños.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {inflatablesProviders.map((prov, idx) => (
                 <button
                   key={prov.id}
                   onClick={() => setActiveProviderIndex(idx)}
                   className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ${activeProviderIndex === idx ? 'bg-gold text-white shadow-lg scale-105 ring-2 ring-gold ring-offset-2' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                 >
                   {prov.name}
                 </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fade-in">
              {inflatablesProviders[activeProviderIndex].products.map((inf) => {
                const sel = selections.inflatables.some(i => i.id === inf.id);
                return (
                  <div key={inf.id} className={`group relative flex flex-col bg-white border-2 transition-all duration-500 rounded-2xl overflow-hidden ${sel ? 'border-gold shadow-2xl ring-2 ring-gold scale-[1.02]' : 'border-gray-200 shadow-md hover:shadow-xl'}`}>
                    
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img src={inf.img} alt={inf.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {sel && (
                        <div className="absolute top-4 right-4 bg-gold text-white p-2 rounded-full shadow-xl animate-pop-in z-10">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow text-center">
                      <h4 className="font-serif text-xl md:text-2xl text-gray-900 font-bold uppercase tracking-tight mb-3 leading-tight flex-grow">{inf.name}</h4>
                      <p className="text-gold font-bold text-3xl mb-8">${inf.price} <span className="text-sm text-gray-500 font-medium">MXN</span></p>

                      <button 
                        onClick={() => toggleInflatable(inf)} 
                        className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded-md transition-all duration-300 shadow-sm ${sel ? 'bg-gold text-white shadow-lg hover:bg-yellow-600' : 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gold hover:text-gold hover:bg-yellow-50'}`}
                      >
                        {sel ? '✓ Agregado' : 'Seleccionar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Música */}
        <section id="musica" className="py-20 md:py-32 bg-gray-900 text-white px-4 md:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-gold text-center font-bold mb-16 uppercase tracking-tighter text-shadow-lg">Entretenimiento Musical</h2>
            
            <div className="flex justify-center mb-20">
              <div className="bg-gray-800 p-2 rounded-full flex shadow-2xl border border-gray-700">
                <button onClick={() => { setMusicTab('sounds'); setCurrentMusicIndex(0); setShowMusicPackages(false); }} className={`px-10 py-4 rounded-full font-bold text-sm md:text-base transition-all uppercase tracking-widest ${musicTab === 'sounds' ? 'bg-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Sonidos y DJs</button>
                <button onClick={() => { setMusicTab('bands'); setCurrentMusicIndex(0); setShowMusicPackages(false); }} className={`px-10 py-4 rounded-full font-bold text-sm md:text-base transition-all uppercase tracking-widest ${musicTab === 'bands' ? 'bg-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Grupos Musicales</button>
              </div>
            </div>

            <div key={currentArtist.id} className="fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gray-800/50 p-8 md:p-16 rounded-xl border border-white/10 relative shadow-2xl">
                <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-2xl aspect-video bg-black border border-gray-700">
                  <video className="w-full h-full object-cover" controls playsInline key={currentArtist.mainVideo} ref={(el) => { if (el) el.volume = 0.1; }}>
                    <source src={currentArtist.mainVideo} type="video/mp4" />
                  </video>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <span className="text-gold font-bold text-sm uppercase tracking-[0.3em] flex items-center gap-3 mb-4"><Sparkles className="w-5 h-5" /> {currentArtist.type}</span>
                    <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight uppercase tracking-tighter break-words">{currentArtist.name}</h3>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium">{currentArtist.description}</p>
                  <button onClick={() => setShowMusicPackages(!showMusicPackages)} className={`w-full py-6 rounded-md font-bold uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-4 text-sm md:text-base shadow-lg ${showMusicPackages ? 'bg-white text-gray-900 border-white' : 'border-gold text-gold hover:bg-gold hover:text-white'}`}>
                    {showMusicPackages ? 'Ocultar Opciones' : 'Conoce nuestros paquetes'}
                    {showMusicPackages ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </button>
                </div>
                {currentMusicData.length > 1 && (
                  <div className="absolute top-6 right-6 flex items-center gap-6 bg-gray-900/90 px-6 py-3 rounded-full border border-gray-600 z-20 shadow-lg">
                    <button onClick={() => { setCurrentMusicIndex((prev) => (prev - 1 + currentMusicData.length) % currentMusicData.length); setShowMusicPackages(false); }} className="hover:text-gold transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                    <span className="text-sm font-bold text-gray-300">{currentMusicIndex + 1} / {currentMusicData.length}</span>
                    <button onClick={() => { setCurrentMusicIndex((prev) => (prev + 1) % currentMusicData.length); setShowMusicPackages(false); }} className="hover:text-gold transition-colors"><ChevronRight className="w-6 h-6" /></button>
                  </div>
                )}
              </div>

              {showMusicPackages && (
                <div className="mt-20 animate-fade-in px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
                    {currentArtist.packages.map(pkg => {
                      const currentConfig = selections.music.find(m => m.packageId === pkg.id);
                      const isSelected = !!currentConfig;
                      const hasManyBenefits = pkg.includes.length > 6;
                      
                      return (
                        <div 
                          key={pkg.id} 
                          onClick={() => setSelectedMusicPackage({ provider: currentArtist, package: pkg, currentConfig })}
                          className={`flex flex-col bg-[#1A1A1A] border-2 rounded-xl transition-all duration-500 group h-full cursor-pointer overflow-hidden ${
                            isSelected 
                              ? 'border-gold shadow-[0_0_50px_rgba(197,160,89,0.3)] scale-[1.03]' 
                              : 'border-gray-700 hover:border-gray-500 hover:shadow-2xl'
                          }`}
                        >
                          <div className="h-48 relative overflow-hidden bg-black flex-shrink-0 border-b border-gray-800" onClick={(e) => e.stopPropagation()}>
                            <video className="w-full h-full object-cover z-20 relative opacity-80 group-hover:opacity-100 transition-opacity" controls playsInline key={pkg.video} ref={(el) => { if (el) el.volume = 0.1; }}>
                              <source src={pkg.video} type="video/mp4" />
                            </video>
                          </div>

                          <div className="p-8 flex flex-col flex-grow">
                            <h4 className="text-xl font-serif font-bold text-white uppercase tracking-[0.2em] mb-6 text-center">{pkg.name}</h4>
                            <div className="flex-grow">
                              <ul className="space-y-4 mb-8">
                                {pkg.includes.slice(0, 6).map((i, idx) => (
                                  <li key={idx} className="flex gap-3 items-start text-sm text-gray-300 font-medium">
                                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /> 
                                    <span className="leading-tight uppercase tracking-wider">{i}</span>
                                  </li>
                                ))}
                                {hasManyBenefits && (
                                  <li className="text-sm text-gold font-bold uppercase tracking-widest pt-4 border-t border-gray-800 text-center group-hover:text-yellow-400 transition-colors flex items-center justify-center gap-2">
                                    <Search className="w-4 h-4"/> Ver todos los servicios
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="mt-auto pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                              <div className="text-center sm:text-left">
                                <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-1 font-bold">Inversión</p>
                                <span className="text-2xl font-serif font-bold text-gold">${isSelected ? currentConfig.price : pkg.price}</span>
                              </div>
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  if (isSelected) {
                                    handleMusicSelect(currentArtist, pkg, null, true);
                                  } else {
                                    handleMusicSelect(currentArtist, pkg, { extraHours: 0, selectedOptions: {}, selectedAddons: [], modalTotal: pkg.price });
                                  }
                                }} 
                                className={`w-full sm:w-auto px-6 py-3 rounded-md text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md ${isSelected ? 'bg-gold text-white hover:bg-yellow-600' : 'border-2 border-gray-600 text-gray-300 hover:border-gold hover:text-gold hover:bg-gray-800'}`}
                              >
                                {isSelected ? '✓ Quitar' : 'Elegir Rápido'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. Cabaña */}
        <section id="cabana" className="py-20 md:py-28 bg-white px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden border border-gray-200">
            <div className="lg:w-1/2 h-[400px] md:h-[600px] lg:h-auto">
              <img src={cabinData.img} alt="Cabaña" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 bg-[#2A2A2A] text-white p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-5 mb-8">
                <Tent className="w-12 h-12 text-gold" />
                <h2 className="font-serif text-4xl md:text-5xl text-gold font-bold uppercase tracking-tight">Cabaña VIP</h2>
              </div>
              <p className="text-gray-300 mb-10 text-lg md:text-xl font-medium leading-relaxed font-serif">{cabinData.desc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-gray-200 mb-12 font-medium">
                {cabinData.amenities.map((a, i) => <li key={i} className="flex gap-3 items-center"><CheckCircle className="w-5 h-5 text-gold flex-shrink-0" /> {a}</li>)}
              </div>
              
              <div className="bg-black/30 border border-gray-700 p-8 rounded-lg mb-12 text-sm text-gray-300 shadow-inner">
                <p className="mb-5 uppercase tracking-widest border-b border-gray-700 pb-3 flex flex-col sm:flex-row justify-between"><strong className="text-gold mb-1 sm:mb-0">Horarios:</strong> {cabinData.schedule}</p>
                <p className="leading-relaxed"><strong className="text-gold uppercase tracking-widest block mb-2">Políticas de Estancia:</strong> {cabinData.policy}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Entrada</label>
                  <input type="date" value={cabinConfig.checkIn} onChange={e => setCabinConfig({...cabinConfig, checkIn: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-base transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Salida</label>
                  <input type="date" value={cabinConfig.checkOut} onChange={e => setCabinConfig({...cabinConfig, checkOut: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-base transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest text-center">Huéspedes</label>
                  <div className="flex items-center justify-between border-2 border-gray-600 rounded bg-black/50 h-12 w-full px-2">
                    <button onClick={() => setCabinConfig({...cabinConfig, guests: Math.max(1, cabinConfig.guests - 1)})} className="w-10 h-full text-gold hover:text-white font-bold text-2xl">-</button>
                    <span className="text-center text-lg font-bold">{cabinConfig.guests}</span>
                    <button onClick={() => setCabinConfig({...cabinConfig, guests: Math.min(6, cabinConfig.guests + 1)})} className="w-10 h-full text-gold hover:text-white font-bold text-2xl">+</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/60 p-10 rounded-lg mb-10 border border-gray-700 shadow-2xl text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">Inversión Total por Cabaña</p>
                <p className="font-serif text-5xl md:text-6xl text-gold font-bold tracking-tighter">${cabinData.price * cabinConfig.guests * getCabinNights()} <span className="text-2xl text-gray-400">MXN</span></p>
              </div>
              
              <button onClick={() => setCabinConfig(prev => ({...prev, rent: !prev.rent}))} className={`w-full py-6 text-sm md:text-base font-bold uppercase border-2 rounded-md transition-all tracking-widest shadow-lg ${cabinConfig.rent ? 'bg-gold border-gold text-white hover:bg-yellow-600' : 'border-gold text-gold hover:bg-gold/10'}`}>
                {cabinConfig.rent ? '✓ CABAÑA AGREGADA' : 'AGREGAR CABAÑA AL PAQUETE'}
              </button>
            </div>
          </div>
        </section>

        {/* 7. Cotizador Final */}
        <section id="cotizador" className="py-24 bg-gold px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-white p-8 md:p-16 lg:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl border-y-8 border-yellow-700">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold uppercase tracking-tight">Cotización Detallada</h2>
              <p className="text-gray-600 font-medium text-sm md:text-base mt-4">Ingresa tus datos para generar el resumen final y enviarlo a nuestro WhatsApp.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label className="flex items-center gap-3 text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest"><User className="w-5 h-5 text-gold" /> Titular del Evento</label>
                    <input type="text" value={clientDetails.name} onChange={e => setClientDetails({...clientDetails, name: handleTextSecurity(e.target.value)})} placeholder="Ej. Juan Pérez" className="w-full border-b-2 border-gray-300 py-4 text-lg text-gray-900 focus:border-gold outline-none transition-colors bg-transparent" />
                  </div>
                  <div>
                    <label className="flex items-center gap-3 text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest"><Tag className="w-5 h-5 text-gold" /> Tipo de Evento</label>
                    <input type="text" value={clientDetails.eventType} onChange={e => setClientDetails({...clientDetails, eventType: handleTextSecurity(e.target.value)})} placeholder="Ej. Boda, XV Años" className="w-full border-b-2 border-gray-300 py-4 text-lg text-gray-900 focus:border-gold outline-none transition-colors bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-3 text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest"><CalendarIcon className="w-5 h-5 text-gold" /> Fecha del Evento</label>
                  <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full border-b-2 border-gray-300 py-4 text-lg font-bold text-gray-900 focus:border-gold outline-none transition-colors bg-transparent cursor-pointer" />
                </div>
                
                <div className="bg-gray-50 p-8 md:p-10 border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center gap-5 border-b border-gray-300 pb-6 mb-6">
                    <CheckCircle className="w-10 h-10 text-gold flex-shrink-0" />
                    <span className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Base Salón - $2,500 <span className="text-sm font-medium text-gray-500 block font-sans mt-2 tracking-normal normal-case">Incluye 6 horas de evento + 1 hora para desalojar.</span></span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-2 text-gray-800 font-bold">
                    <span className="text-sm uppercase tracking-widest text-gray-600">Horas Extra ($250/h):</span>
                    <div className="flex items-center border-2 border-gray-300 rounded-md bg-white overflow-hidden shadow-sm h-14 w-full sm:w-40">
                      <button onClick={() => setSalonConfig({...salonConfig, extraHours: Math.max(0, salonConfig.extraHours - 1)})} className="flex-1 text-2xl text-gold hover:bg-gray-100 transition-colors">-</button>
                      <span className="w-16 text-center text-xl">{salonConfig.extraHours}</span>
                      <button onClick={() => setSalonConfig({...salonConfig, extraHours: salonConfig.extraHours + 1})} className="flex-1 text-2xl text-gold hover:bg-gray-100 transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 rounded-lg mb-10 font-bold text-sm shadow-sm">
                  <h4 className="font-serif text-3xl md:text-4xl text-gold border-b-2 border-gold/30 pb-6 mb-8 uppercase text-center">Resumen Final</h4>
                  
                  <div className="space-y-6 text-gray-800">
                     <p className="flex justify-between items-center text-sm md:text-base border-b border-gray-200 pb-3"><span>RENTA BASE SALÓN</span> <span className="text-lg">$2,500</span></p>
                     
                     {salonConfig.extraHours > 0 && <p className="flex justify-between items-center text-sm md:text-base border-b border-gray-200 pb-3 text-gold"><span>HORAS EXTRA ({salonConfig.extraHours}h)</span> <span className="text-lg">${salonConfig.extraHours * 250}</span></p>}
                     
                     {Object.keys(selections.tables).map(k => {
                       const t = selections.tables[k];
                       if (!t.active) return null;
                       const d = tablesData.find(x => x.id === k);
                       return (
                         <div key={k} className="pt-4 pb-4 border-b border-gray-200 space-y-3">
                           <p className="text-xs md:text-sm text-gold uppercase tracking-widest">{d.name}</p>
                           {t.mantelQty > 0 && <div className="flex justify-between items-center ml-4 text-sm"><span>{t.mantelQty}x Con Mantel</span> <span>${t.mantelQty * 100}</span></div>}
                           {t.cubreQty > 0 && <div className="flex justify-between items-center ml-4 text-sm"><span>{t.cubreQty}x Mantel + Cubre ({t.cubreColor})</span> <span>${t.cubreQty * 110}</span></div>}
                         </div>
                       );
                     })}

                     {/* RESUMEN BARRAS TEMATICAS */}
                     {selections.specialBars.length > 0 && (
                       <div className="pt-4 pb-4 border-b border-gray-200">
                         <p className="text-xs md:text-sm text-gold uppercase tracking-widest mb-3">🍹 BARRAS TEMÁTICAS</p>
                         {selections.specialBars.map(bar => (
                           <div key={bar.id} className="flex justify-between items-center text-sm ml-4 mt-2">
                             <span className="text-gray-700 font-medium">- {bar.name} ({bar.qty} pax)</span>
                             <span className="text-xs text-gray-500 italic bg-gray-200 px-2 py-1 rounded">A cotizar</span>
                           </div>
                         ))}
                       </div>
                     )}

                     {selections.inflatables.map(i => <div key={i.id} className="pt-4 pb-4 border-b border-gray-200 flex justify-between items-center text-sm md:text-base"><span>🎈 {i.name}</span> <span>${i.price}</span></div>)}
                     
                     {/* RESUMEN DE MÚSICA */}
                     {selections.music.map(m => (
                       <div key={m.packageId} className="pt-4 pb-4 border-b border-gray-200 space-y-3">
                         <div className="flex justify-between items-center text-sm md:text-base">
                           <span className="text-gold font-bold">🎵 {m.providerName}</span> 
                           <span className="text-lg">${m.basePrice}</span>
                         </div>
                         <div className="text-sm text-gray-600 font-medium ml-6">{m.packageName}</div>
                         
                         {m.extraHours > 0 && (
                           <div className="flex justify-between items-center text-sm text-gray-600 ml-6">
                             <span>+ {m.extraHours} Hora(s) Extra</span>
                             <span>${m.extraHours * m.extraHourPrice}</span>
                           </div>
                         )}
                         {m.selectedOptions && Object.keys(m.selectedOptions).map(opt => {
                           const val = m.selectedOptions[opt];
                           if (!val || (Array.isArray(val) && val.length === 0)) return null;
                           return (
                             <div key={opt} className="flex justify-between items-center text-sm text-gray-600 ml-6">
                               <span>✓ Opciones: {Array.isArray(val) ? val.join(', ') : val}</span>
                             </div>
                           );
                         })}
                         {m.selectedAddons && m.selectedAddons.map(addon => (
                           <div key={addon.name} className="flex justify-between items-center text-sm text-gray-600 ml-6">
                             <span>+ {addon.name}</span>
                             <span>${addon.price}</span>
                           </div>
                         ))}
                       </div>
                     ))}

                     {cabinConfig.rent && <div className="pt-6 pb-2 border-b border-gray-200 flex justify-between items-center font-bold text-sm md:text-base text-gray-900"><span className="text-gold">🏡 Cabaña VIP ({getCabinNights()} Noches)</span> <span className="text-lg">${cabinData.price * cabinConfig.guests * getCabinNights()}</span></div>}
                  </div>

                  {/* MENSAJE PROMOCIONAL */}
                  <div className="mt-10 pt-8 border-t-2 border-gray-200">
                    <div className="bg-yellow-50 border border-gold/40 p-6 rounded-lg text-sm leading-relaxed text-gray-800 font-medium shadow-sm">
                      <p className="mb-3">
                        <span className="text-xl mr-2">🎁</span> <strong className="text-gold uppercase tracking-widest block md:inline mb-1 md:mb-0">Beneficio Especial:</strong> Al contratar un servicio de barra, obtienes <strong>1 hora gratis</strong> para tu evento en nuestro salón.
                      </p>
                      <p className="mb-3">
                        <span className="text-xl mr-2">✨</span> También al contratar un servicio con nosotros tienes un <strong>30% de descuento</strong> en tus Invitaciones Digitales.
                      </p>
                      <p className="text-xs text-gray-500 italic mt-4 pt-4 border-t border-gold/20">
                        ⚠️ Nota: Promociones válidas únicamente contratando a través de nuestros medios oficiales (esta página web y nuestras redes sociales).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#2A2A2A] text-white p-12 text-center rounded-xl shadow-2xl border border-gray-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-yellow-300 to-gold"></div>
                  
                  <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">Total Estimado</p>
                  <p className="font-serif text-6xl md:text-8xl text-gold font-bold mb-6 tracking-tighter drop-shadow-lg">${totalEstimadoSalon()}</p>
                  
                  <p className="text-sm md:text-base text-gray-300 italic mb-10 px-4 leading-relaxed font-medium">
                    * El precio final se validará por mensaje. Bandas, Inflables y Barras Temáticas están sujetos a disponibilidad.
                  </p>

                  <button onClick={sendWhatsAppSalon} disabled={!isSalonFormValid} className={`w-full py-6 px-6 text-base md:text-lg font-bold uppercase flex justify-center items-center gap-4 transition-all duration-300 rounded-lg shadow-xl ${isSalonFormValid ? 'bg-[#25D366] border border-[#128C7E] text-white hover:bg-[#1DA851] transform hover:-translate-y-1' : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'}`}>
                    {isSalonFormValid ? <><MessageCircle className="w-8 h-8" /> Enviar cotización por WhatsApp</> : "Faltan datos (Nombre, Evento, Fecha)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- MODAL EMERGENTE DE MÚSICA --- */}
      {selectedMusicPackage && (
        <MusicDetailsModal 
          data={selectedMusicPackage} 
          onClose={() => setSelectedMusicPackage(null)} 
          onSelect={handleMusicSelect}
          isSelected={selections.music.some(m => m.packageId === selectedMusicPackage.package.id)}
        />
      )}
    </>
  );
}