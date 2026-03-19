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
  }
];

export const soundData = [
  {
    id: 's1',
    type: 'Sonidero / DJ',
    name: 'Master Mix Sonidero',
    mainVideo: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175',
    description: 'La mejor iluminación y mezclas en vivo para que nadie se quede sentado.',
    packages: [
      { id: 's1-p1', name: 'Paquete Básico', price: 3500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', includes: ['5 horas de servicio', 'Audio profesional', 'Luces rítmicas LED'] },
      { id: 's1-p2', name: 'Paquete VIP Pro', price: 5500, video: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175', includes: ['6 horas de servicio', 'Pantalla gigante', 'Máquina de humo'] }
    ]
  },
    {
    id: 's2',
    type: 'Sonidero / DJ',
    name: 'Master Mix megaman',
    mainVideo: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175',
    description: 'La mejor iluminación y mezclas en vivo para que nadie se quede sentado.',
    packages: [
      { id: 's1-p1', name: 'Paquete Básico', price: 3500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', includes: ['5 horas de servicio', 'Audio profesional', 'Luces rítmicas LED'] },
      { id: 's1-p2', name: 'Paquete VIP Pro', price: 5500, video: 'https://player.vimeo.com/external/517090081.hd.mp4?s=913d80a133d5966d5b0665d5edcd5da69f3bd0fc&profile_id=175', includes: ['6 horas de servicio', 'Pantalla gigante', 'Máquina de humo'] }
    ]
  }
];

export const bandsData = [
  {
    id: 'b1',
    type: 'Grupo Norteño',
    name: 'Los Reyes del Norte',
    mainVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', 
    description: 'Música en vivo con el auténtico sabor del norte.',
    packages: [
      { id: 'b1-p1', name: 'Serenata (1 Hora)', price: 2500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', includes: ['6 músicos uniformados', 'Audio compacto'] },
      { id: 'b1-p2', name: 'Evento Completo', price: 6500, video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ca2a8ebfae0e536bf301ebc1&profile_id=164&oauth2_token_id=57447761', includes: ['3 horas continuas', 'Show interactivo'] }
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
  policy: 'Al llegar a tu estancia con nosotros se hará el recorrido por el lugar y se te indicará mediante una lista lo que está prestando nuestro servicio y al terminar tu alojamiento se hará un chequeo nuevamente verificando que estén las cosas que se otorgaron a un inicio y que estén funcionando, ya que si se usó mal uso de las cosas deberá ser pagado por el cliente que solicitó la reservación esto es con la finalidad de que te sientas en casa y brindarte la mejor atención pero queremos la misma responsabilidad de parte de las personas que estarán ocupando nuestra cabaña.',
  img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=1000'
};