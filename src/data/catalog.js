// src/data/catalog.js

// --- MESAS ---
export const tablesData = [
  { 
    id: 't1', 
    name: 'Mesa Redonda', 
    desc: 'Clásica y perfecta para fomentar la conversación (10 personas).', 
    img: '/img/mesas/mesa-circular.webp' 
  },
  { 
    id: 't2', 
    name: 'Mesa Rectangular', 
    desc: 'Ideal para optimizar el espacio y acomodar grupos grandes.', 
    img: '/img/mesas/mesa-rectangular.webp' 
  }
];

// --- INFLABLES POR PROVEEDOR ---
export const inflatablesProviders = [
  {
    id: 'prov1',
    name: 'Proveedor 1',
    description: 'Paquetes temáticos de agua y jirafas.',
    products: [
      { id: 'inf1-1', name: 'Paquete de 3 Inflables de agua', price: 1000, img: '/img/inflables/proveedor 1/paquete3.webp' },
      { id: 'inf1-2', name: 'Inflable de Agua', price: 1000, img: '/img/inflables/proveedor 1/inflable-agua-paquete.webp' },
      { id: 'inf1-3', name: 'Inflable Jirafas', price: 1200, img: '/img/inflables/proveedor 1/inflable-jirafas-paquete.webp' },
      { id: 'inf1-4', name: 'Inflable Pequeño', price: 600, img: '/img/inflables/proveedor 1/inflable-pequeño-paquete.webp' }
    ]
  },
  {
    id: 'prov2',
    name: 'Proveedor 2',
    description: 'Variedad de juegos clásicos.',
    products: [
      { id: 'inf2-1', name: 'Inflable 2.1', price: 800, img: '/img/inflables/proveedor 2/proveedor-2.1.webp' },
      { id: 'inf2-2', name: 'Inflable 2.2', price: 850, img: '/img/inflables/proveedor 2/proveedor-2.2.jpeg' }
    ]
  },
  {
    id: 'prov3',
    name: 'Proveedor 3',
    description: 'Gran catálogo de personajes y tamaños.',
    products: [
      { id: 'inf3-1', name: 'Inflable Avenger', price: 900, img: '/img/inflables/proveedor 3/900-avenger.webp' },
      { id: 'inf3-2', name: 'Inflable Frozen', price: 900, img: '/img/inflables/proveedor 3/900-frozen.webp' },
      { id: 'inf3-3', name: 'Inflable Máscara', price: 900, img: '/img/inflables/proveedor 3/900-mascara.webp' },
      { id: 'inf3-4', name: 'Inflable Princesas', price: 900, img: '/img/inflables/proveedor 3/900-princesas.webp' },
      { id: 'inf3-5', name: 'Castillo Amarillo', price: 1200, img: '/img/inflables/proveedor 3/1200-castillo-amarillo.webp' },
      { id: 'inf3-6', name: 'Inflable Mario Bros', price: 1200, img: '/img/inflables/proveedor 3/1200-mario.webp' },
      { id: 'inf3-7', name: 'Inflable Paw Patrol', price: 1200, img: '/img/inflables/proveedor 3/1200-pawpatrol.webp' },
      { id: 'inf3-8', name: 'Inflable Arcos', price: 1400, img: '/img/inflables/proveedor 3/1400-arcos.webp' },
      { id: 'inf3-9', name: 'Inflable Bluey', price: 1400, img: '/img/inflables/proveedor 3/1400-bluey.webp' },
      { id: 'inf3-10', name: 'Inflable Dinosaurio', price: 1400, img: '/img/inflables/proveedor 3/1400-inflable-dinosaurio.webp' },
      { id: 'inf3-11', name: 'Inflable Lineal', price: 1400, img: '/img/inflables/proveedor 3/1400-inflable-lineal.webp' },
      { id: 'inf3-12', name: 'Inflable Azul', price: 1800, img: '/img/inflables/proveedor 3/1800-inflable-azul.webp' }
    ]
  },
  {
    id: 'prov4',
    name: 'Proveedor 4',
    description: 'Brincolines y barcos.',
    products: [
      { id: 'inf4-1', name: 'Brincolín Amarillo', price: 900, img: '/img/inflables/proveedor 4/900-brincolin-amarillo.webp' },
      { id: 'inf4-2', name: 'Inflable Morado', price: 1200, img: '/img/inflables/proveedor 4/1200-inflable-morado.webp' },
      { id: 'inf4-3', name: 'Inflable Barco', price: 1400, img: '/img/inflables/proveedor 4/1400-inflable-barco.webp' }
    ]
  },
  {
    id: 'prov5',
    name: 'Proveedor 5',
    description: 'Catálogo ampliado de personajes.',
    products: [
      { id: 'inf5-1', name: 'Barco Acostado', price: 1500, img: '/img/inflables/proveedor 5/barco-acostado.webp' },
      { id: 'inf5-2', name: 'Bichos Oruga', price: 1100, img: '/img/inflables/proveedor 5/bichos-oruga.webp' },
      { id: 'inf5-3', name: 'Frozen Inflable', price: 1200, img: '/img/inflables/proveedor 5/frozen-inflable.webp' },
      { id: 'inf5-4', name: 'Godopop', price: 1000, img: '/img/inflables/proveedor 5/godopop.webp' },
      { id: 'inf5-5', name: 'Micky Car', price: 1300, img: '/img/inflables/proveedor 5/micky-car.webp' },
      { id: 'inf5-6', name: 'Minnie', price: 1300, img: '/img/inflables/proveedor 5/minnie.webp' },
      { id: 'inf5-7', name: 'Trampolín Azul', price: 800, img: '/img/inflables/proveedor 5/trampolin-azul.webp' }
    ]
  }
];

// --- MÚSICA ---
export const soundData = [
  {
    id: 's1',
    type: 'Sonidero / DJ',
    name: 'Master Mix Sonidero',
    mainVideo: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175',
    description: 'La mejor iluminación y mezclas en vivo para que nadie se quede sentado.',
    packages: [
      { id: 's1-p1', name: 'Paquete Básico', price: 3500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164', includes: ['5 horas de servicio', 'Audio profesional', 'Luces LED'] },
      { id: 's1-p2', name: 'Paquete VIP Pro', price: 5500, video: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175', includes: ['6 horas de servicio', 'Pantalla gigante', 'Humo'] }
    ]
  }
];

export const bandsData = [
  {
    id: 'b1',
    type: 'Grupo Norteño',
    name: 'Los Reyes del Norte',
    mainVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164', 
    description: 'Música en vivo con el auténtico sabor del norte.',
    packages: [
      { id: 'b1-p1', name: 'Serenata (1 Hora)', price: 2500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164', includes: ['6 músicos uniformados', 'Audio compacto'] },
      { id: 'b1-p2', name: 'Evento Completo', price: 6500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164', includes: ['3 horas continuas', 'Show interactivo'] }
    ]
  }
];

// --- CABAÑA ---
export const cabinData = {
  price: 600,
  desc: 'Descansa rodeado de naturaleza. Nuestra cabaña está diseñada para brindarte privacidad, confort y todo lo necesario para sentirte como en casa.',
  amenities: [
    '2 recámaras (3 camas matrimoniales)',
    'Baño completo',
    'Sala y Comedor',
    'Cocina equipada',
    'Vajilla básica',
    'TV e Internet (Wi-Fi)',
    'Amplio espacio de jardín'
  ],
  schedule: 'Entrada: 12:00 PM | Salida: 12:00 PM',
  policy: 'Al llegar se hará un recorrido y entrega de inventario...',
  img: '/img/cabaña/cabaña-luz.webp' 
};