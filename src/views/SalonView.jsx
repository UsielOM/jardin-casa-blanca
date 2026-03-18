// src/views/SalonView.jsx
import React, { useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Tent,
  Clock,
  Info,
  User,
  Tag,
  Calendar as CalendarIcon,
  MessageCircle,
} from "lucide-react";
import {
  tablesData,
  inflatablesProviders,
  soundData,
  bandsData,
  cabinData,
} from "../data/catalog";

export default function SalonView() {
  // --- ESTADOS LOCALES ---
  const [clientDetails, setClientDetails] = useState({
    name: "",
    eventType: "",
  });
  const [eventDate, setEventDate] = useState("");
  const [activeProviderIndex, setActiveProviderIndex] = useState(0);
  const [salonConfig, setSalonConfig] = useState({ extraHours: 0 });
  const [selections, setSelections] = useState({
    tables: {
      t1: { active: false, mantelQty: 0, cubreQty: 0 },
      t2: { active: false, mantelQty: 0, cubreQty: 0 },
    },
    inflatables: [],
    music: [],
  });
  const [cabinConfig, setCabinConfig] = useState({
    rent: false,
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  // --- LÓGICA DE NEGOCIO ---
  const handleTextSecurity = (val) =>
    val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]/g, "");

  const toggleTableConfig = (id) => {
    setSelections((prev) => {
      const active = prev.tables[id].active;
      if (active) {
        return {
          ...prev,
          tables: {
            ...prev.tables,
            [id]: { active: false, mantelQty: 0, cubreQty: 0 },
          },
        };
      } else {
        return {
          ...prev,
          tables: {
            ...prev.tables,
            [id]: { ...prev.tables[id], active: true, mantelQty: 1 },
          },
        };
      }
    });
  };

  const updateTableQtyConfig = (id, field, change) => {
    setSelections((prev) => {
      const newQty = Math.max(0, prev.tables[id][field] + change);
      const mQty = field === "mantelQty" ? newQty : prev.tables[id].mantelQty;
      const cQty = field === "cubreQty" ? newQty : prev.tables[id].cubreQty;
      return {
        ...prev,
        tables: {
          ...prev.tables,
          [id]: {
            ...prev.tables[id],
            [field]: newQty,
            active: mQty + cQty > 0,
          },
        },
      };
    });
  };

  const toggleMusic = (m) => {
    const exists = selections.music.find((item) => item.id === m.id);
    setSelections((prev) => ({
      ...prev,
      music: exists
        ? prev.music.filter((i) => i.id !== m.id)
        : [...prev.music, m],
    }));
  };

  const toggleInflatable = (inf) => {
    const exists = selections.inflatables.find((i) => i.id === inf.id);
    setSelections((prev) => ({
      ...prev,
      inflatables: exists
        ? prev.inflatables.filter((i) => i.id !== inf.id)
        : [...prev.inflatables, inf],
    }));
  };

  const getCabinNights = () => {
    if (!cabinConfig.checkIn || !cabinConfig.checkOut) return 1;
    const start = new Date(cabinConfig.checkIn);
    const end = new Date(cabinConfig.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const getTableTotal = () => {
    let total = 0;
    Object.keys(selections.tables).forEach((k) => {
      if (selections.tables[k].active)
        total +=
          selections.tables[k].mantelQty * 100 +
          selections.tables[k].cubreQty * 110;
    });
    return total;
  };

  const totalEstimadoSalon = () => {
    let total = 2500 + salonConfig.extraHours * 250 + getTableTotal();
    selections.inflatables.forEach((i) => (total += i.price));
    selections.music.forEach((m) => (total += m.price));
    if (cabinConfig.rent)
      total += cabinData.price * cabinConfig.guests * getCabinNights();
    return total;
  };

  const isSalonFormValid =
    clientDetails.name.trim() !== "" &&
    clientDetails.eventType.trim() !== "" &&
    eventDate !== "";

  const generateQuoteTextSalon = () => {
    let msg = `✨ *Hola, me gustaría cotizar mi evento en Jardín Casa Blanca Necaxa* ✨\n\n`;
    msg += `👤 *Nombre:* ${clientDetails.name}\n🎉 *Evento:* ${clientDetails.eventType}\n📅 *Fecha:* ${eventDate}\n\n`;
    msg += `📋 *SELECCIONES:*\n`;
    msg += `🏰 *Renta del Salón:* $2,500 MXN base\n`;
    if (salonConfig.extraHours > 0)
      msg += `   - Horas extras: ${salonConfig.extraHours} ($${salonConfig.extraHours * 250})\n`;

    Object.keys(selections.tables).forEach((k) => {
      const t = selections.tables[k];
      if (t.active) {
        const d = tablesData.find((x) => x.id === k);
        if (t.mantelQty > 0)
          msg += `🪑 ${t.mantelQty}x ${d.name} (Mantel) - $${t.mantelQty * 100}\n`;
        if (t.cubreQty > 0)
          msg += `🪑 ${t.cubreQty}x ${d.name} (Cubre) - $${t.cubreQty * 110}\n`;
      }
    });

    selections.inflatables.forEach(
      (i) => (msg += `🎈 ${i.name} ($${i.price})\n`),
    );
    selections.music.forEach(
      (m) => (msg += `🎵 ${m.type} (${m.name}) - $${m.price}\n`),
    );
    if (cabinConfig.rent)
      msg += `🏡 Cabaña: ${getCabinNights()} noche(s) para ${cabinConfig.guests} pers. ($${cabinData.price * cabinConfig.guests * getCabinNights()})\n`;

    msg += `\n💰 *Costo Total Estimado:* $${totalEstimadoSalon()} MXN\n`;
    msg += `\n⚠️ *Nota:* Si requiero un horario específico para iniciar preparaciones, lo comunicaré por aquí.\n`;
    msg += `ℹ️ *Nota:* Una vez confirmadas las fechas, se validará el precio final por WhatsApp.`;
    return encodeURIComponent(msg);
  };

  const sendWhatsAppSalon = () => {
    if (!isSalonFormValid) return;
    const phone = "525523091732";
    window.open(
      `https://wa.me/${phone}?text=${generateQuoteTextSalon()}`,
      "_blank",
    );
  };

  return (
    <div className="fade-in pt-20">
      {/* Hero Salón */}
      <header
        id="inicio"
        className="relative pt-24 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center text-center min-h-[60vh] lg:min-h-[75vh]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <span className="font-script block mb-4 text-2xl md:text-3xl">
            Bienvenidos a...
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 font-bold uppercase">
            Jardín Casa Blanca
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Configura tu evento ideal: elige distribución, música, diversión y
            más.
          </p>
        </div>
      </header>

      {/* Mesas */}
      <section id="mesas" className="py-16 md:py-24 bg-gray-50 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-6 font-bold uppercase">
            Mesas y Distribución
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl font-medium">
            Combina los estilos que necesites. El total se actualizará
            automáticamente.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {tablesData.map((table) => {
            const t = selections.tables[table.id];
            return (
              <div
                key={table.id}
                className={`bg-white border-2 rounded-sm overflow-hidden transition-all duration-300 ${t.active ? "border-gold shadow-xl transform scale-[1.02]" : "border-gray-200"}`}
              >
                <img
                  src={table.img}
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="p-6 md:p-8 text-center">
                  <h3 className="font-serif text-3xl font-bold mb-3">
                    {table.name}
                  </h3>
                  <p className="text-gray-700 mb-6 text-sm md:text-base font-medium">
                    {table.desc}
                  </p>
                  <button
                    onClick={() => toggleTableConfig(table.id)}
                    className={`w-full py-3 rounded-sm text-sm font-bold uppercase tracking-widest mb-8 ${t.active ? "bg-gold text-white" : "border-2 border-gray-400 text-gray-800 hover:border-gold hover:text-gold"}`}
                  >
                    {t.active ? "✓ Mesa Agregada" : "Seleccionar este tipo"}
                  </button>
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded border">
                      <div className="text-left">
                        <p className="font-bold text-gray-800 text-xs md:text-sm uppercase">
                          Con Mantel
                        </p>
                        <p className="text-[10px] text-gray-500">$100 c/u</p>
                      </div>
                      <div className="flex items-center border rounded bg-white overflow-hidden shadow-sm">
                        <button
                          onClick={() =>
                            updateTableQtyConfig(table.id, "mantelQty", -1)
                          }
                          className="px-4 py-1 font-bold text-xl hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 font-bold text-gray-900 w-10 text-center">
                          {t.mantelQty}
                        </span>
                        <button
                          onClick={() =>
                            updateTableQtyConfig(table.id, "mantelQty", 1)
                          }
                          className="px-4 py-1 font-bold text-xl hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded border">
                      <div className="text-left">
                        <p className="font-bold text-gray-800 text-xs md:text-sm uppercase">
                          Con Cubre
                        </p>
                        <p className="text-[10px] text-gray-500">$110 c/u</p>
                      </div>
                      <div className="flex items-center border rounded bg-white overflow-hidden shadow-sm">
                        <button
                          onClick={() =>
                            updateTableQtyConfig(table.id, "cubreQty", -1)
                          }
                          className="px-4 py-1 font-bold text-xl hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 font-bold text-gray-900 w-10 text-center">
                          {t.cubreQty}
                        </span>
                        <button
                          onClick={() =>
                            updateTableQtyConfig(table.id, "cubreQty", 1)
                          }
                          className="px-4 py-1 font-bold text-xl hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sección Inflables */}
      <section id="inflables" className="py-16 md:py-24 bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-gold mb-6 font-bold uppercase">
              Catálogo de Inflables
            </h2>
            <div className="flex items-center justify-between md:justify-center gap-4 bg-gray-100 p-6 rounded-sm shadow-sm max-w-3xl mx-auto mb-10 border border-gray-200">
              <button
                onClick={() =>
                  setActiveProviderIndex(
                    (prev) =>
                      (prev - 1 + inflatablesProviders.length) %
                      inflatablesProviders.length,
                  )
                }
                className="p-3 bg-white rounded-full shadow hover:bg-gold hover:text-white transition-colors border border-gray-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="text-center flex-1 px-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  PROVEEDOR ACTUAL
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 font-bold">
                  {inflatablesProviders[activeProviderIndex].name}
                </h3>
              </div>
              <button
                onClick={() =>
                  setActiveProviderIndex(
                    (prev) => (prev + 1) % inflatablesProviders.length,
                  )
                }
                className="p-3 bg-white rounded-full shadow hover:bg-gold hover:text-white transition-colors border border-gray-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {inflatablesProviders[activeProviderIndex].products.map((inf) => {
              const sel = selections.inflatables.some((i) => i.id === inf.id);
              return (
                <div
                  key={inf.id}
                  className={`bg-gray-50 border-2 rounded-sm overflow-hidden transition-all duration-300 ${sel ? "border-gold shadow-md transform scale-[1.02]" : "border-gray-200"}`}
                >
                  <img
                    src={inf.img}
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-gray-900 mb-2 text-lg uppercase tracking-tight">
                      {inf.name}
                    </h4>
                    <p className="text-gold font-bold text-xl mb-6">
                      ${inf.price} MXN
                    </p>
                    <button
                      onClick={() => toggleInflatable(inf)}
                      className={`w-full py-3 text-sm font-bold uppercase rounded-sm border-2 transition-all ${sel ? "bg-gold border-gold text-white" : "border-gray-400 text-gray-700 hover:border-gold hover:text-gold"}`}
                    >
                      {sel ? "✓ Agregado" : "Quiero este"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Música */}
      <section id="musica" className="py-16 md:py-24 bg-gray-50 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-16 text-center font-bold uppercase">
            Entretenimiento Musical
          </h2>
          <div className="space-y-10">
            {soundData.map((m) => {
              const sel = selections.music.some((s) => s.id === m.id);
              return (
                <div
                  key={m.id}
                  className={`flex flex-col lg:flex-row bg-white border-2 overflow-hidden transition-all shadow-md ${sel ? "border-gold" : "border-gray-200"}`}
                >
                  <div className="lg:w-1/2 aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
                      <source src={m.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                  <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] text-gold font-bold uppercase tracking-[0.2em]">
                          {m.type}
                        </span>
                        <h4 className="font-serif text-3xl font-bold text-gray-900">
                          {m.name}
                        </h4>
                      </div>
                      <div className="text-right font-bold text-gold text-3xl tracking-tighter">
                        ${m.price}
                        <br />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          MXN EXTRA
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-10 text-gray-700 font-bold text-sm">
                      {m.includes.map((i, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />{" "}
                          {i}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => toggleMusic(m)}
                      className={`w-full py-5 font-bold uppercase tracking-widest border-2 transition-all ${sel ? "bg-gold text-white border-gold shadow-lg" : "border-gray-400 text-gray-800 hover:border-gold"}`}
                    >
                      {sel ? "✓ SELECCIONADO" : "AGREGAR SONIDO"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 space-y-10">
            {bandsData.map((m) => {
              const sel = selections.music.some((s) => s.id === m.id);
              return (
                <div
                  key={m.id}
                  className={`flex flex-col lg:flex-row bg-white border-2 overflow-hidden transition-all shadow-md ${sel ? "border-gold" : "border-gray-200"}`}
                >
                  <div className="lg:w-1/2 aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
                      <source src={m.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                  <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] text-gold font-bold uppercase tracking-[0.2em]">
                          {m.type}
                        </span>
                        <h4 className="font-serif text-3xl font-bold text-gray-900">
                          {m.name}
                        </h4>
                      </div>
                      <div className="text-right font-bold text-gold text-3xl tracking-tighter">
                        ${m.price}
                        <br />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          MXN EXTRA
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-10 text-gray-700 font-bold text-sm">
                      {m.includes.map((i, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />{" "}
                          {i}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => toggleMusic(m)}
                      className={`w-full py-5 font-bold uppercase tracking-widest border-2 transition-all ${sel ? "bg-gold text-white border-gold shadow-lg" : "border-gray-400 text-gray-800 hover:border-gold"}`}
                    >
                      {sel ? "✓ SELECCIONADO" : "AGREGAR GRUPO"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: CABAÑA VIP ADICIONAL --- */}
      <section id="cabana" className="py-16 md:py-24 bg-white px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          <div className="lg:w-1/2 h-[350px] md:h-[500px] lg:h-auto">
            <img
              src={cabinData.img}
              alt="Cabaña"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#2A2A2A] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <Tent className="w-12 h-12 text-gold mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-gold font-bold tracking-tight uppercase">
              Cabaña VIP (Adicional)
            </h2>
            <p className="text-gray-200 mb-8 text-lg font-medium leading-relaxed">
              {cabinData.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-10 font-bold">
              {cabinData.amenities.map((a, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />{" "}
                  {a}
                </li>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 p-6 text-xs font-medium leading-relaxed rounded mb-10 text-gray-400">
              <p className="mb-3 uppercase tracking-tighter">
                <strong className="text-gold">Horarios:</strong>{" "}
                {cabinData.schedule}
              </p>
              <p>
                <strong className="text-gold uppercase tracking-tighter">
                  Políticas:
                </strong>{" "}
                {cabinData.policy}
              </p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-700 pt-8 mb-10">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                Costo Noche/Persona:
              </span>
              <span className="text-4xl text-gold font-bold font-serif">
                ${cabinData.price} MXN
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                  Entrada
                </label>
                <input
                  type="date"
                  value={cabinConfig.checkIn}
                  onChange={(e) =>
                    setCabinConfig({ ...cabinConfig, checkIn: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                  Salida
                </label>
                <input
                  type="date"
                  value={cabinConfig.checkOut}
                  onChange={(e) =>
                    setCabinConfig({ ...cabinConfig, checkOut: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                  Personas (Máx 6)
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={cabinConfig.guests}
                  onChange={(e) =>
                    setCabinConfig({
                      ...cabinConfig,
                      guests: Math.min(
                        6,
                        Math.max(1, parseInt(e.target.value) || 1),
                      ),
                    })
                  }
                  className="w-full bg-transparent border-b-2 border-gray-600 pb-2 text-white focus:border-gold outline-none text-sm transition-all"
                />
              </div>
            </div>
            <div className="bg-black/40 p-6 rounded-sm mb-10 text-center border border-white/10 shadow-inner">
              <p className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-widest">
                Subtotal Cabaña
              </p>
              <p className="font-serif text-4xl text-gold font-bold">
                ${cabinData.price * cabinConfig.guests * getCabinNights()} MXN
              </p>
            </div>
            <button
              onClick={() =>
                setCabinConfig({ ...cabinConfig, rent: !cabinConfig.rent })
              }
              className={`w-full py-5 text-base font-bold uppercase border-2 transition-all tracking-widest ${cabinConfig.rent ? "bg-gold border-gold text-white shadow-lg" : "border-gold text-gold hover:bg-gold hover:text-white"}`}
            >
              {cabinConfig.rent
                ? "✓ AGREGADA A LA COTIZACIÓN"
                : "AGREGAR CABAÑA AL EVENTO"}
            </button>
          </div>
        </div>
      </section>

      {/* Cotizador Final */}
      <section id="cotizador" className="py-20 bg-gold px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-white p-6 md:p-12 lg:p-16 shadow-2xl rounded-sm border-y-8 border-yellow-600">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold uppercase tracking-tight">
              Resumen y Cotización
            </h2>
            <p className="text-gray-600 text-lg font-medium mt-3">
              Verifica tus selecciones antes de enviar tu solicitud por
              WhatsApp.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
                    <User className="w-4 h-4 text-gold" /> Nombre del Titular
                  </label>
                  <input
                    type="text"
                    value={clientDetails.name}
                    onChange={(e) =>
                      setClientDetails({
                        ...clientDetails,
                        name: handleTextSecurity(e.target.value),
                      })
                    }
                    placeholder="Tu nombre"
                    className="w-full border-b-2 border-gray-300 py-3 text-lg focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
                    <Tag className="w-4 h-4 text-gold" /> Tipo de Evento
                  </label>
                  <input
                    type="text"
                    value={clientDetails.eventType}
                    onChange={(e) =>
                      setClientDetails({
                        ...clientDetails,
                        eventType: handleTextSecurity(e.target.value),
                      })
                    }
                    placeholder="Ej: Boda, XV Años"
                    className="w-full border-b-2 border-gray-300 py-3 text-lg focus:border-gold outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
                  <CalendarIcon className="w-4 h-4 text-gold" /> Fecha del
                  Evento
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-3 text-xl focus:border-gold outline-none"
                />
              </div>
              <div className="bg-gray-50 p-6 border-2 border-gray-200 rounded-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                  <CheckCircle className="w-8 h-8 text-gold" />
                  <span className="font-serif text-2xl font-bold">
                    Renta Salón Base
                  </span>
                </div>
                <div className="pl-1 md:pl-10 space-y-6">
                  <p className="flex items-center gap-2 text-gray-700 font-bold">
                    <Clock className="w-5 h-5 text-gold" /> 6 horas base + 1
                    desalojo ($2,500 MXN).
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-gray-700">
                      HORAS EXTRA ($250/h):
                    </span>
                    <div className="flex items-center border-2 border-gray-300 rounded bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() =>
                          setSalonConfig({
                            ...salonConfig,
                            extraHours: Math.max(0, salonConfig.extraHours - 1),
                          })
                        }
                        className="px-5 py-2 font-bold text-xl hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-6 font-bold text-lg">
                        {salonConfig.extraHours}
                      </span>
                      <button
                        onClick={() =>
                          setSalonConfig({
                            ...salonConfig,
                            extraHours: salonConfig.extraHours + 1,
                          })
                        }
                        className="px-5 py-2 font-bold text-xl hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-sm mb-8">
                <h4 className="font-serif text-3xl font-bold text-gold border-b-2 border-gray-100 pb-4 mb-6 uppercase tracking-tight">
                  Tu Evento Ideal
                </h4>
                <div className="space-y-4 text-sm font-bold text-gray-800">
                  {/* Desglose Salón y Horas Extra */}
                  <p className="flex justify-between border-b border-gray-200 pb-2">
                    Salón Base: <span>$2,500 MXN</span>
                  </p>
                  {salonConfig.extraHours > 0 && (
                    <p className="flex justify-between border-b border-gray-200 pb-2 text-gray-600">
                      <span>
                        {salonConfig.extraHours} Horas Extra ($250 c/u):
                      </span>
                      <span>${salonConfig.extraHours * 250} MXN</span>
                    </p>
                  )}

                  {/* Desglose Mesas */}
                  {Object.keys(selections.tables).map((k) => {
                    const t = selections.tables[k];
                    const data = tablesData.find((x) => x.id === k);
                    return (
                      <React.Fragment key={k}>
                        {t.active && t.mantelQty > 0 && (
                          <p className="flex justify-between border-b border-gray-100 pb-1 text-gray-600">
                            <span>
                              {t.mantelQty}x {data.name} (Mantel):
                            </span>
                            <span>${t.mantelQty * 100} MXN</span>
                          </p>
                        )}
                        {t.active && t.cubreQty > 0 && (
                          <p className="flex justify-between border-b border-gray-100 pb-1 text-gray-600">
                            <span>
                              {t.cubreQty}x {data.name} (Cubre):
                            </span>
                            <span>${t.cubreQty * 110} MXN</span>
                          </p>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Desglose Inflables */}
                  {selections.inflatables.map((i) => (
                    <p
                      key={i.id}
                      className="flex justify-between border-b border-gray-100 pb-1 text-gray-600"
                    >
                      <span>{i.name}:</span>
                      <span>${i.price} MXN</span>
                    </p>
                  ))}

                  {/* Desglose Música */}
                  {selections.music.map((m) => (
                    <p
                      key={m.id}
                      className="flex justify-between border-b border-gray-100 pb-1 text-gray-600"
                    >
                      <span>
                        {m.type} ({m.name}):
                      </span>
                      <span>${m.price} MXN</span>
                    </p>
                  ))}

                  {/* Desglose Cabaña */}
                  {cabinConfig.rent && (
                    <p className="flex justify-between text-gold bg-gold/5 p-2 rounded border border-gold/20">
                      <span>
                        Cabaña ({getCabinNights()} Noches, {cabinConfig.guests}{" "}
                        Pers):
                      </span>
                      <span>
                        $
                        {cabinData.price *
                          cabinConfig.guests *
                          getCabinNights()}{" "}
                        MXN
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-[#2A2A2A] text-white p-8 md:p-10 text-center rounded-sm shadow-xl">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Costo Total Estimado
                </span>
                <p className="font-serif text-5xl md:text-7xl text-gold font-bold my-4">
                  ${totalEstimadoSalon()}
                </p>
                <div className="bg-black/30 p-4 border border-white/10 rounded mt-4">
                  <p className="text-xs md:text-sm font-bold text-gray-100 flex gap-3 text-left">
                    <Info className="w-6 h-6 text-gold flex-shrink-0" />{" "}
                    Confirmaremos disponibilidad y precio final vía WhatsApp.
                  </p>
                </div>
              </div>
              <button
                onClick={sendWhatsAppSalon}
                disabled={!isSalonFormValid}
                className={`w-full py-5 md:py-6 text-lg font-bold uppercase tracking-widest flex justify-center items-center gap-3 transition-all shadow-xl rounded-sm mt-8 ${isSalonFormValid ? "bg-[#25D366] text-white hover:bg-[#1DA851]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {isSalonFormValid ? (
                  <>
                    <MessageCircle className="w-6 h-6" /> Enviar por WhatsApp
                  </>
                ) : (
                  "Faltan datos"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
