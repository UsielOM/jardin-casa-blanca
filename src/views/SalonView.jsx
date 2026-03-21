// src/views/SalonView.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle, ChevronLeft, ChevronRight, Clock, Info, User, Tag,
  Calendar as CalendarIcon, MessageCircle, Play, Sparkles, Plus, Minus, Tent, Palette, X, Music, Search, Trophy
} from "lucide-react";
import {
  tablesData,
  inflatablesProviders,
  soundData,
  bandsData,
  cabinData,
} from "../data/catalog";

const CUBRE_COLORS = [
  "Rojo", "Rosa Mexicano", "Palo de Rosa", "Azul Cielo", 
  "Azul Rey", "Amarillo Girasol", "Vino", "Menta", "Tenangos"
];

export default function SalonView() {
  // --- ESTADOS ---
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
  });
  
  const [cabinConfig, setCabinConfig] = useState({ rent: false, checkIn: "", checkOut: "", guests: 2 });
  const [musicTab, setMusicTab] = useState("sounds");
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [showMusicPackages, setShowMusicPackages] = useState(false);
  const [selectedMusicPackage, setSelectedMusicPackage] = useState(null);

  // --- SOLUCIÓN DE RENDIMIENTO Y SCROLL ---
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

  // --- LÓGICA ---
  const handleTextSecurity = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]/g, "");

  const toggleTableConfig = (id) => {
    setSelections((prev) => {
      const active = prev.tables[id].active;
      if (active) return { ...prev, tables: { ...prev.tables, [id]: { active: false, mantelQty: 0, cubreQty: 0, cubreColor: "Rojo" } } };
      return { ...prev, tables: { ...prev.tables, [id]: { ...prev.tables[id], active: true, mantelQty: prev.tables[id].mantelQty === 0 ? 1 : prev.tables[id].mantelQty } } };
    });
  };

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

  const toggleMusicPackage = (provider, pkg) => {
    setSelections((prev) => {
      const existingIdx = prev.music.findIndex((m) => m.providerId === provider.id);
      let newMusic = [...prev.music];
      if (existingIdx > -1) {
        if (newMusic[existingIdx].packageId === pkg.id) newMusic.splice(existingIdx, 1);
        else newMusic[existingIdx] = { providerId: provider.id, providerName: provider.name, packageId: pkg.id, packageName: pkg.name, price: pkg.price };
      } else {
        newMusic.push({ providerId: provider.id, providerName: provider.name, packageId: pkg.id, packageName: pkg.name, price: pkg.price });
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

    selections.inflatables.forEach((i) => (msg += `🎈 ${i.name} - $${i.price} MXN\n`));
    selections.music.forEach((m) => (msg += `🎵 ${m.providerName}: ${m.packageName} - $${m.price} MXN\n`));
    if (cabinConfig.rent) msg += `🏡 Cabaña VIP (${getCabinNights()} noches) - $${cabinData.price * cabinConfig.guests * getCabinNights()} MXN\n`;

    msg += `\n💰 *COSTO TOTAL ESTIMADO:* $${totalEstimadoSalon()} MXN\n`;
    return encodeURIComponent(msg);
  };

  const sendWhatsAppSalon = () => {
    if (!isSalonFormValid) return;
    window.open(`https://wa.me/525523091732?text=${generateQuoteTextSalon()}`, "_blank");
  };

  // ¡AQUÍ ESTÁ TU VARIABLE INTACTA!
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
            <p className="text-lg md:text-2xl font-medium opacity-80 uppercase tracking-widest">Jardín Casa Blanca Necaxa</p>
          </div>
        </header>

        {/* 2. Mobiliario */}
        <section id="mesas" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-gold text-center font-bold mb-16 uppercase tracking-tight">Selección de Mobiliario</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {tablesData.map((table) => {
                const t = selections.tables[table.id];
                return (
                  <div key={table.id} className={`bg-white border-2 rounded-sm overflow-hidden transition-all duration-500 ${t.active ? "border-gold shadow-2xl scale-[1.02]" : "border-gray-200"}`}>
                    <img src={table.img} className="w-full h-64 object-cover" alt={table.name} />
                    <div className="p-8 text-center">
                      <h3 className="font-serif text-3xl font-bold mb-3 uppercase tracking-tight">{table.name}</h3>
                      <p className="text-gray-600 mb-8 font-medium">{table.desc}</p>
                      <button onClick={() => toggleTableConfig(table.id)} className={`w-full py-4 rounded-sm text-sm font-bold uppercase transition-all mb-8 ${t.active ? "bg-gold text-white" : "border-2 border-gray-400"}`}>
                        {t.active ? "✓ Seleccionada" : "Seleccionar este tipo"}
                      </button>
                      <div className="space-y-4 pt-6 border-t border-gray-100">
                        {[ {f:'mantelQty', l:'CON MANTEL', p:100}, {f:'cubreQty', l:'CON CUBRE MANTEL', p:110} ].map(field => (
                          <div key={field.f} className="flex flex-col gap-3 bg-gray-50 p-3 sm:p-4 rounded border border-gray-200">
                            <div className="flex justify-between items-center gap-2">
                              <div className="text-left min-w-0 flex-1">
                                <p className="font-bold text-gray-800 text-xs sm:text-sm uppercase tracking-tight">{field.l}</p>
                                <p className="text-[10px] text-gray-500 font-bold">${field.p} c/u</p>
                              </div>
                              <div className="flex items-center border rounded bg-white overflow-hidden shadow-sm flex-shrink-0 h-10 border-gray-300">
                                <button onClick={() => updateTableQtyConfig(table.id, field.f, -1)} className="px-3 sm:px-5 py-1 font-bold text-lg text-gold hover:bg-gray-100">-</button>
                                <span className="w-8 sm:w-10 text-center font-bold text-gray-900 text-sm">{t[field.f]}</span>
                                <button onClick={() => updateTableQtyConfig(table.id, field.f, 1)} className="px-3 sm:px-5 py-1 font-bold text-lg text-gold hover:bg-gray-100">+</button>
                              </div>
                            </div>
                            {field.f === 'cubreQty' && t.cubreQty > 0 && (
                              <div className="pt-2 border-t border-gray-200 mt-1 animate-fade-in">
                                <label className="flex items-center gap-2 text-[10px] font-bold text-gold mb-2 uppercase tracking-widest"><Palette className="w-3 h-3" /> Elige un color</label>
                                <select value={t.cubreColor} onChange={(e) => updateTableColor(table.id, e.target.value)} className="w-full bg-white border-2 border-gray-200 p-2 rounded-sm text-xs font-bold text-gray-700 outline-none focus:border-gold cursor-pointer">
                                  {CUBRE_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
                                </select>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Inflables */}
        <section id="inflables" className="py-16 md:py-24 bg-white px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-gold mb-12 text-center font-bold uppercase tracking-tight">Inflables Disponibles</h2>
            <div className="flex items-center justify-between md:justify-center gap-4 bg-gray-100 p-6 rounded-sm shadow-sm max-w-3xl mx-auto mb-12 border border-gray-200">
              <button onClick={() => setActiveProviderIndex(prev => (prev - 1 + inflatablesProviders.length) % inflatablesProviders.length)} className="p-3 bg-white rounded-full shadow hover:bg-gold transition-colors"><ChevronLeft /></button>
              <div className="text-center flex-1 px-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">PROVEEDOR ACTUAL</p>
                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 font-bold">{inflatablesProviders[activeProviderIndex].name}</h3>
              </div>
              <button onClick={() => setActiveProviderIndex(prev => (prev + 1) % inflatablesProviders.length)} className="p-3 bg-white rounded-full shadow hover:bg-gold transition-colors"><ChevronRight /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {inflatablesProviders[activeProviderIndex].products.map((inf) => {
                const sel = selections.inflatables.some(i => i.id === inf.id);
                return (
                  <div key={inf.id} className={`bg-gray-50 border-2 rounded-sm overflow-hidden transition-all duration-300 ${sel ? 'border-gold shadow-md scale-[1.03]' : 'border-gray-200'}`}>
                    <img src={inf.img} alt={inf.name} className="w-full h-56 object-cover" />
                    <div className="p-6 text-center">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg uppercase tracking-tight">{inf.name}</h4>
                      <p className="text-gold font-bold text-2xl mb-6">${inf.price} MXN</p>
                      <button onClick={() => toggleInflatable(inf)} className={`w-full py-4 text-xs font-bold uppercase border-2 transition-all ${sel ? 'bg-gold text-white border-gold' : 'border-gray-400 text-gray-700 hover:border-gold'}`}>
                        {sel ? '✓ Agregado' : 'Quiero este'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Música */}
        <section id="musica" className="py-16 md:py-32 bg-gray-900 text-white px-4 md:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-gold text-center font-bold mb-12 uppercase tracking-tighter text-shadow-lg">Entretenimiento Musical</h2>
            
            <div className="flex justify-center mb-16">
              <div className="bg-gray-800 p-1 rounded-full flex shadow-2xl">
                <button onClick={() => { setMusicTab('sounds'); setCurrentMusicIndex(0); setShowMusicPackages(false); }} className={`px-8 py-3 rounded-full font-bold text-xs transition-all uppercase tracking-widest ${musicTab === 'sounds' ? 'bg-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Sonidos y DJs</button>
                <button onClick={() => { setMusicTab('bands'); setCurrentMusicIndex(0); setShowMusicPackages(false); }} className={`px-8 py-3 rounded-full font-bold text-xs transition-all uppercase tracking-widest ${musicTab === 'bands' ? 'bg-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Grupos Musicales</button>
              </div>
            </div>

            <div key={currentArtist.id} className="fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gray-800/50 p-6 md:p-12 rounded-sm border border-white/5 relative shadow-2xl">
                <div className="lg:col-span-7 rounded-sm overflow-hidden shadow-2xl aspect-video bg-black">
                  {/* VIDEO PRINCIPAL: manual, con controls */}
                  <video className="w-full h-full object-cover" controls playsInline key={currentArtist.mainVideo} ref={(el) => { if (el) el.volume = 0.1; }}>
                    <source src={currentArtist.mainVideo} type="video/mp4" />
                  </video>
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-2"><Sparkles className="w-3 h-3" /> {currentArtist.type}</span>
                    <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-none uppercase tracking-tighter break-words">{currentArtist.name}</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">{currentArtist.description}</p>
                  <button onClick={() => setShowMusicPackages(!showMusicPackages)} className={`w-full py-5 rounded-sm font-bold uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-3 ${showMusicPackages ? 'bg-white text-gray-900 border-white' : 'border-gold text-gold hover:bg-gold hover:text-white'}`}>
                    {showMusicPackages ? 'Ocultar Opciones' : 'Conoce nuestros paquetes'}
                    {showMusicPackages ? <Minus /> : <Plus />}
                  </button>
                </div>
                {currentMusicData.length > 1 && (
                  <div className="absolute top-4 right-4 flex items-center gap-4 bg-gray-900/80 px-4 py-2 rounded-full border border-white/10 z-20">
                    <button onClick={() => { setCurrentMusicIndex((prev) => (prev - 1 + currentMusicData.length) % currentMusicData.length); setShowMusicPackages(false); }} className="hover:text-gold"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="text-[10px] font-bold text-gray-400">{currentMusicIndex + 1} / {currentMusicData.length}</span>
                    <button onClick={() => { setCurrentMusicIndex((prev) => (prev + 1) % currentMusicData.length); setShowMusicPackages(false); }} className="hover:text-gold"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                )}
              </div>

              {showMusicPackages && (
                <div className="mt-16 animate-fade-in px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
                    {currentArtist.packages.map(pkg => {
                      const isSelected = selections.music.find(m => m.packageId === pkg.id);
                      const hasManyBenefits = pkg.includes.length > 6;
                      
                      return (
                        <div 
                          key={pkg.id} 
                          onClick={() => setSelectedMusicPackage({ provider: currentArtist, package: pkg })}
                          className={`flex flex-col bg-[#1A1A1A] border-2 rounded-sm transition-all duration-500 group h-full cursor-pointer overflow-hidden ${
                            isSelected 
                              ? 'border-gold shadow-[0_0_40px_rgba(197,160,89,0.2)] scale-[1.02]' 
                              : 'border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="h-40 relative overflow-hidden bg-black flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* VIDEO DE PAQUETE: manual, controls y stopPropagation */}
                            <video className="w-full h-full object-cover z-20 relative opacity-80" controls playsInline key={pkg.video} ref={(el) => { if (el) el.volume = 0.1; }}>
                              <source src={pkg.video} type="video/mp4" />
                            </video>
                          </div>

                          <div className="p-6 flex flex-col flex-grow">
                            <h4 className="text-lg font-serif font-bold text-white uppercase tracking-[0.2em] mb-4 text-center">{pkg.name}</h4>
                            <div className="flex-grow">
                              <ul className="space-y-2 mb-6">
                                {pkg.includes.slice(0, 6).map((i, idx) => (
                                  <li key={idx} className="flex gap-2 items-start text-[11px] text-gray-400 font-medium">
                                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" /> 
                                    <span className="leading-tight uppercase tracking-wider">{i}</span>
                                  </li>
                                ))}
                                {hasManyBenefits && (
                                  <li className="text-[10px] text-gold font-bold uppercase tracking-widest pt-2 border-t border-white/5 text-center group-hover:underline">
                                    + Ver servicios detallados
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                              <div className="text-left">
                                <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mb-0.5 font-bold">Inversión</p>
                                <span className="text-xl font-serif font-bold text-gold">${pkg.price}</span>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); toggleMusicPackage(currentArtist, pkg); }} className={`px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isSelected ? 'bg-gold text-white' : 'border border-gold/30 text-gold'}`}>
                                {isSelected ? '✓ Quitar' : 'Elegir'}
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

        {/* 5. Cabaña */}
        <section id="cabana" className="py-16 md:py-24 bg-white px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden border border-gray-100">
            <div className="lg:w-1/2 h-[350px] md:h-[500px] lg:h-auto">
              <img src={cabinData.img} alt="Cabaña" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 bg-[#2A2A2A] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <Tent className="w-10 h-10 text-gold" />
                <h2 className="font-serif text-4xl md:text-5xl text-gold font-bold uppercase tracking-tight">Cabaña VIP (Adicional)</h2>
              </div>
              <p className="text-gray-200 mb-8 text-lg font-medium leading-relaxed font-serif">{cabinData.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-10 font-bold">
                {cabinData.amenities.map((a, i) => <li key={i} className="flex gap-2 items-center"><CheckCircle className="w-4 h-4 text-gold flex-shrink-0" /> {a}</li>)}
              </div>
              <div className="bg-white/5 border border-white/10 p-6 text-xs font-medium rounded mb-10 text-gray-300">
                <p className="mb-4 uppercase tracking-widest border-b border-white/10 pb-2"><strong className="text-gold">Horarios:</strong> {cabinData.schedule}</p>
                <p className="leading-relaxed"><strong className="text-gold uppercase tracking-widest block mb-1">Políticas:</strong> {cabinData.policy}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div><label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">Entrada</label><input type="date" value={cabinConfig.checkIn} onChange={e => setCabinConfig({...cabinConfig, checkIn: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-sm transition-all" /></div>
                <div><label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">Salida</label><input type="date" value={cabinConfig.checkOut} onChange={e => setCabinConfig({...cabinConfig, checkOut: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-sm transition-all" /></div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Gente</label>
                  <div className="flex items-center border-2 border-gray-600 rounded bg-transparent h-10 w-full">
                    <button onClick={() => setCabinConfig({...cabinConfig, guests: Math.max(1, cabinConfig.guests - 1)})} className="flex-1 text-gold hover:bg-white/5">-</button>
                    <span className="w-10 text-center text-sm">{cabinConfig.guests}</span>
                    <button onClick={() => setCabinConfig({...cabinConfig, guests: Math.min(6, cabinConfig.guests + 1)})} className="flex-1 text-gold hover:bg-white/5">+</button>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 p-8 rounded-sm mb-8 border border-white/10 shadow-inner text-center">
                <p className="font-serif text-5xl text-gold font-bold tracking-tighter">${cabinData.price * cabinConfig.guests * getCabinNights()} MXN</p>
              </div>
              <button onClick={() => setCabinConfig(prev => ({...prev, rent: !prev.rent}))} className={`w-full py-5 text-xs font-bold uppercase border-2 transition-all tracking-widest ${cabinConfig.rent ? 'bg-gold border-gold text-white' : 'border-gold text-gold'}`}>{cabinConfig.rent ? '✓ AGREGADA' : 'AGREGAR CABAÑA'}</button>
            </div>
          </div>
        </section>

        {/* 6. Cotizador Final */}
        <section id="cotizador" className="py-20 bg-gold px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-white p-6 md:p-12 lg:p-16 shadow-2xl rounded-sm border-y-8 border-yellow-600">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold uppercase tracking-tight">Cotización Detallada</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div><label className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-3 uppercase tracking-widest"><User className="w-4 h-4 text-gold" /> Titular</label><input type="text" value={clientDetails.name} onChange={e => setClientDetails({...clientDetails, name: handleTextSecurity(e.target.value)})} placeholder="Tu nombre" className="w-full border-b-2 border-gray-300 py-3 focus:border-gold outline-none" /></div>
                  <div><label className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-3 uppercase tracking-widest"><Tag className="w-4 h-4 text-gold" /> Evento</label><input type="text" value={clientDetails.eventType} onChange={e => setClientDetails({...clientDetails, eventType: handleTextSecurity(e.target.value)})} placeholder="Ej: Boda" className="w-full border-b-2 border-gray-300 py-3 focus:border-gold outline-none" /></div>
                </div>
                <div><label className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-3 uppercase tracking-widest"><CalendarIcon className="w-4 h-4 text-gold" /> Fecha</label><input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full border-b-2 border-gray-300 py-3 font-bold focus:border-gold outline-none" /></div>
                <div className="bg-gray-50 p-8 border-2 border-gray-200 rounded-sm">
                  <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-5"><CheckCircle className="w-8 h-8 text-gold" /><span className="font-serif text-3xl font-bold">Base Salón - $2,500</span></div>
                  <div className="flex justify-between items-center gap-6 pt-4 text-gray-700 font-bold">
                    <span className="text-xs uppercase tracking-widest text-gray-500">Horas Extra ($250/h):</span>
                    <div className="flex items-center border-2 border-gray-300 rounded bg-white overflow-hidden shadow-sm h-12 w-32">
                      <button onClick={() => setSalonConfig({...salonConfig, extraHours: Math.max(0, salonConfig.extraHours - 1)})} className="flex-1">-</button>
                      <span className="w-10 text-center">{salonConfig.extraHours}</span>
                      <button onClick={() => setSalonConfig({...salonConfig, extraHours: salonConfig.extraHours + 1})} className="flex-1">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="bg-gray-50 border-2 border-gray-200 p-8 md:p-10 rounded-sm mb-10 font-bold text-sm">
                  <h4 className="font-serif text-3xl text-gold border-b-4 border-gold/20 pb-5 mb-8 uppercase text-center">Resumen</h4>
                  <div className="space-y-5">
                     <p className="flex justify-between items-center text-xs"><span>RENTA BASE SALÓN</span> <span>$2,500</span></p>
                     {salonConfig.extraHours > 0 && <p className="flex justify-between items-center text-xs"><span>HORAS EXTRA ({salonConfig.extraHours}h)</span> <span>${salonConfig.extraHours * 250}</span></p>}
                     {Object.keys(selections.tables).map(k => {
                       const t = selections.tables[k];
                       if (!t.active) return null;
                       const d = tablesData.find(x => x.id === k);
                       return (
                         <div key={k} className="pt-4 border-t border-gray-200 space-y-2">
                           <p className="text-[10px] text-gold uppercase tracking-widest">{d.name}</p>
                           {t.mantelQty > 0 && <div className="flex justify-between items-center ml-2"><span>{t.mantelQty}x Mantel</span> <span>${t.mantelQty * 100}</span></div>}
                           {t.cubreQty > 0 && <div className="flex justify-between items-center ml-2"><span>{t.cubreQty}x Cubre ({t.cubreColor})</span> <span>${t.cubreQty * 110}</span></div>}
                         </div>
                       );
                     })}
                     {selections.inflatables.map(i => <div key={i.id} className="pt-4 border-t border-gray-200 flex justify-between items-center text-xs"><span>🎈 {i.name}</span> <span>${i.price}</span></div>)}
                     {selections.music.map(m => <div key={m.packageId} className="pt-4 border-t border-gray-200 flex justify-between items-center text-xs"><span>🎵 {m.providerName}: {m.packageName}</span> <span>${m.price}</span></div>)}
                     {cabinConfig.rent && <div className="pt-4 border-t border-gold/20 bg-gold/5 p-4 rounded mt-4 flex justify-between items-center font-bold"><span>🏡 Cabaña VIP ({getCabinNights()} Noches)</span> <span>${cabinData.price * cabinConfig.guests * getCabinNights()}</span></div>}
                  </div>
                </div>
                <div className="bg-[#2A2A2A] text-white p-10 text-center rounded-sm shadow-2xl">
                  <p className="font-serif text-6xl md:text-8xl text-gold font-bold mb-6">${totalEstimadoSalon()}</p>
                  <button onClick={sendWhatsAppSalon} disabled={!isSalonFormValid} className={`w-full py-4 px-4 text-sm font-bold uppercase flex justify-center items-center gap-3 transition-all rounded-sm mt-8 border-2 ${isSalonFormValid ? 'bg-[#25D366] border-[#25D366] text-white hover:bg-[#1DA851]' : 'bg-gray-200 border-gray-200 text-gray-400'}`}>
                    {isSalonFormValid ? <><MessageCircle className="w-7 h-7" /> Enviar por WhatsApp</> : "Faltan datos de reserva"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- MODAL EMERGENTE (AHORA ESTÁ FUERA DEL DIV FADE-IN Y SIN BACKDROP-BLUR PARA MEJOR RENDIMIENTO) --- */}
      {selectedMusicPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/95 animate-fade-in" onClick={() => setSelectedMusicPackage(null)}>
          <div 
            className="relative bg-[#1A1A1A] text-white border border-gold/30 rounded-sm shadow-[0_0_100px_rgba(197,160,89,0.2)] w-full max-w-5xl max-h-full flex flex-col animate-pop-in overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header de la Modal */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#1A1A1A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                    {selectedMusicPackage.package.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mt-2">
                    {selectedMusicPackage.provider.name}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMusicPackage(null)} 
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Contenido Principal */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Columna Video en Modal: MANUAL CON CONTROLES */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                   <div className="aspect-[9/16] bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
                      <video className="w-full h-full object-cover z-20 relative" controls playsInline key={selectedMusicPackage.package.video} ref={(el) => { if (el) el.volume = 0.1; }}>
                        <source src={selectedMusicPackage.package.video} type="video/mp4" />
                      </video>
                   </div>
                </div>

                {/* Columna Detalles */}
                <div className="lg:w-2/3">
                   <h4 className="font-serif text-xl font-bold text-gold mb-8 uppercase tracking-[0.2em] border-b border-gold/20 pb-4 inline-block">
                     Servicios Exclusivos Incluidos:
                   </h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                     {selectedMusicPackage.package.includes.map((i, idx) => (
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
                        * Todos nuestros shows incluyen personal uniformado y equipo de animación profesional de última generación.
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Footer de la Modal */}
            <div className="p-8 border-t border-white/10 bg-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-1 font-bold">Total del Paquete Seleccionado</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-gold">${selectedMusicPackage.package.price}</span>
                  <span className="text-xs text-gray-500 font-bold">MXN</span>
                </div>
              </div>
              
              <button 
                onClick={() => { toggleMusicPackage(selectedMusicPackage.provider, selectedMusicPackage.package); setSelectedMusicPackage(null); }} 
                className={`w-full sm:w-auto px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl ${
                  selections.music.find(m => m.packageId === selectedMusicPackage.package.id)
                    ? 'bg-transparent border-2 border-white/20 text-white hover:bg-white/5' 
                    : 'bg-gold border-2 border-gold text-white hover:bg-gold/80 hover:scale-105'
                }`}
              >
                {selections.music.find(m => m.packageId === selectedMusicPackage.package.id) ? '✓ Quitar de la lista' : 'Agregar este Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}