// src/data/catalog.js

export const tablesData = [
  { id: 't1', name: 'Mesa Redonda', desc: 'Clásica y perfecta para fomentar la conversación (10 personas).', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
  { id: 't2', name: 'Mesa Rectangular', desc: 'Ideal para optimizar el espacio y acomodar grupos grandes.', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800' }
];

export const inflatablesProviders = [
  {
    id: 'prov1',
    name: 'Saltarines Mágicos',
    description: 'Especialistas en castillos clásicos y juegos para niños pequeños.',
    products: [
      { id: 'inf1', name: 'Castillo Mágico Clásico', price: 600, img: 'https://images.unsplash.com/photo-1603831828854-3e91d57502b4?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf2', name: 'Barco Pirata Mini', price: 800, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600' }
    ]
  },
  {
    id: 'prov2',
    name: 'Aventura Extrema',
    description: 'Inflables gigantes y retos de destreza para todas las edades.',
    products: [
      { id: 'inf3', name: 'Tobogán Acuático', price: 1500, img: 'https://images.unsplash.com/photo-1589552274431-255d676d1e4e?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf4', name: 'Escaladora Extrema', price: 900, img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600' }
    ]
  },
  {
    id: 'prov3',
    name: 'Retos y Competencias',
    description: 'Juegos interactivos y circuitos para grupos.',
    products: [
      { id: 'inf5', name: 'Carrera de Obstáculos', price: 1200, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf6', name: 'Ring de Gladiadores', price: 1100, img: 'https://images.unsplash.com/photo-1603831828854-3e91d57502b4?auto=format&fit=crop&q=80&w=600' }
    ]
  },
  {
    id: 'prov4',
    name: 'Mega Diversión Infinita',
    description: 'El catálogo más grande de opciones para todo tipo de fiestas y eventos masivos.',
    products: [
      { id: 'inf7', name: 'Brinca Brinca Clásico', price: 450, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf8', name: 'Castillo de Princesas', price: 750, img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf9', name: 'Ring de Box Inflable', price: 1050, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf10', name: 'Alberca de Pelotas', price: 650, img: 'https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf11', name: 'Toro Mecánico Inflable', price: 2500, img: 'https://images.unsplash.com/photo-1603831828854-3e91d57502b4?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf12', name: 'Mega Resbaladilla Acuática', price: 1800, img: 'https://images.unsplash.com/photo-1589552274431-255d676d1e4e?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf13', name: 'Gladiadores Americanos', price: 1300, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf14', name: 'Pista de Carreras Locas', price: 1600, img: 'https://images.unsplash.com/photo-1475721025505-c31ebfa20743?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf15', name: 'Combo Escaladora 3 en 1', price: 1400, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600' },
      { id: 'inf16', name: 'Circuito Extremo 20m', price: 3500, img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600' }
    ]
  }
];

export const soundData = [
  {
    id: 's1',
    type: 'Sonidero / DJ',
    name: 'Master Mix Sonidero',
    price: 3500,
    videoUrl: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175',
    includes: [
      '5 horas de servicio.',
      'Iluminación inteligente (Robóticas y láser).',
      'Cabina iluminada y humo.',
      'Animador profesional (MC) y globos/pulseras.'
    ]
  },
  {
    id: 's2',
    type: 'DJ Versátil',
    name: 'DJ Fiesta Total',
    price: 2800,
    videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761',
    includes: [
      '5 horas de música mezclada.',
      'Luces rítmicas básicas.',
      'Excelente ambiente y complacencias.'
    ]
  }
];

export const bandsData = [
  {
    id: 'b1',
    type: 'Grupo Norteño',
    name: 'Los Reyes del Norte',
    price: 4500,
    videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', 
    includes: [
      '2 horas de música continua.',
      'Equipo de audio profesional.',
      'Repertorio personalizado.',
      'Animación e interacción con los invitados.'
    ]
  },
  {
    id: 'b2',
    type: 'Banda Sinaloense',
    name: 'La Gran Banda del Pacífico',
    price: 8500,
    videoUrl: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175',
    includes: [
      '3 horas de música de banda en vivo.',
      'Más de 12 músicos en escena.',
      'Show interactivo con invitados.',
      'Souvenirs incluidos.'
    ]
  }
];

export const cabinData = {
  price: 600,
  desc: 'Descansa rodeado de naturaleza. Nuestra cabaña está diseñada para brindarte privacidad, confort y todo lo necesario para sentirte como en casa.',
  amenities: [
    '2 recámaras (3 camas matrimoniales)',
    'Baño completo',
    'Sala y Comedor',
    'Cocina (Estufa, frigobar, microondas)',
    'Vajilla básica',
    'TV e Internet (Wi-Fi)',
    'Amplio espacio de jardín'
  ],
  schedule: 'Entrada: 12:00 PM | Salida: 12:00 PM',
  policy: 'Al llegar a tu estancia se hará un recorrido y te entregaremos un inventario. Al finalizar tu alojamiento, verificaremos que los artículos e instalaciones se encuentren funcionando como se otorgaron. En caso de desperfecto o mal uso, el cliente titular deberá cubrir el costo. Nuestro objetivo es hacerte sentir en casa, brindarte la mejor atención y pedimos la misma responsabilidad al ocupar nuestro espacio.',
  img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=1000'
};