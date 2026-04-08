// src/data/catalog.js

// --- MESAS ---
export const tablesData = [
  {
    id: "t1",
    name: "Mesa Redonda",
    desc: "Clásica y perfecta para fomentar la conversación, incluye sillas.",
    img: "/img/mesas/mesa-circular.webp",
  },
  {
    id: "t2",
    name: "Mesa Rectangular",
    desc: "Ideal para optimizar el espacio y acomodar grupos grandes, incluye sillas.",
    img: "/img/mesas/mesa-rectangular.webp",
  },
];

// --- INFLABLES POR PROVEEDOR ---
export const inflatablesProviders = [
  {
    id: "prov1",
    name: "Proveedor 1",
    description: "Paquetes temáticos de agua y jirafas.",
    products: [
      { id: "inf1-1", name: "Paquete de 3 Inflables de agua", price: 1200, img: "/img/inflables/proveedor 1/paquete3.webp" },
      { id: "inf1-2", name: "Inflable de Agua", price: 600, img: "/img/inflables/proveedor 1/inflable-agua-paquete.webp" },
      { id: "inf1-3", name: "Inflable Jirafas", price: 600, img: "/img/inflables/proveedor 1/inflable-jirafas-paquete.webp" },
      { id: "inf1-4", name: "Inflable Pequeño", price: 600, img: "/img/inflables/proveedor 1/inflable-pequeño-paquete.webp" },
    ],
  },
  {
    id: "prov2",
    name: "Proveedor 2",
    description: "Variedad de juegos clásicos.",
    products: [
      { id: "inf2-1", name: "Inflable de Princesas", price: 1500, img: "/img/inflables/proveedor 2/proveedor-2.1.webp" },
      { id: "inf2-2", name: "Inflable de castillo", price: 1500, img: "/img/inflables/proveedor 2/proveedor-2.2.jpeg" },
    ],
  },
  {
    id: "prov3",
    name: "Proveedor 3",
    description: "Gran catálogo de personajes y tamaños.",
    products: [
      { id: "inf3-1", name: "Inflable Avenger", price: 1000, img: "/img/inflables/proveedor 3/900-avenger.webp" },
      { id: "inf3-2", name: "Inflable Frozen", price: 1000, img: "/img/inflables/proveedor 3/900-frozen.webp" },
      { id: "inf3-3", name: "Inflable Máscara", price: 1000, img: "/img/inflables/proveedor 3/900-mascara.webp" },
      { id: "inf3-4", name: "Inflable Princesas", price: 1200, img: "/img/inflables/proveedor 3/900-princesas.webp" },
      { id: "inf3-5", name: "Castillo Amarillo", price: 1400, img: "/img/inflables/proveedor 3/1200-castillo-amarillo.webp" },
      { id: "inf3-6", name: "Inflable Mario Bros", price: 1400, img: "/img/inflables/proveedor 3/1200-mario.webp" },
      { id: "inf3-7", name: "Inflable Paw Patrol", price: 1400, img: "/img/inflables/proveedor 3/1200-pawpatrol.webp" },
      { id: "inf3-8", name: "Inflable Arcos", price: 1400, img: "/img/inflables/proveedor 3/1400-arcos.webp" },
      { id: "inf3-9", name: "Inflable Bluey", price: 1400, img: "/img/inflables/proveedor 3/1400-bluey.webp" },
      { id: "inf3-10", name: "Inflable Dinosaurio", price: 1400, img: "/img/inflables/proveedor 3/1400-inflable-dinosaurio.webp" },
      { id: "inf3-11", name: "Inflable Lineal", price: 1400, img: "/img/inflables/proveedor 3/1400-inflable-lineal.webp" },
      { id: "inf3-12", name: "Inflable Azul", price: 1900, img: "/img/inflables/proveedor 3/1800-inflable-azul.webp" },
    ],
  },
  {
    id: "prov4",
    name: "Proveedor 4",
    description: "Brincolines y barcos.",
    products: [
      { id: "inf4-1", name: "Brincolín Amarillo", price: 1000, img: "/img/inflables/proveedor 4/900-brincolin-amarillo.webp" },
      { id: "inf4-2", name: "Inflable Morado", price: 1200, img: "/img/inflables/proveedor 4/1200-inflable-morado.webp" },
      { id: "inf4-3", name: "Inflable Barco", price: 1400, img: "/img/inflables/proveedor 4/1400-inflable-barco.webp" },
    ],
  },
  {
    id: "prov5",
    name: "Proveedor 5",
    description: "Catálogo ampliado de personajes.",
    products: [
      { id: "inf5-1", name: "Barco", price: 1400, img: "/img/inflables/proveedor 5/barco-acostado.webp" },
      { id: "inf5-2", name: "Bichos Oruga", price: 1200, img: "/img/inflables/proveedor 5/bichos-oruga.webp" },
      { id: "inf5-3", name: "Frozen Inflable", price: 1400, img: "/img/inflables/proveedor 5/frozen-inflable.webp" },
      { id: "inf5-4", name: "Casa morada con azul", price: 1200, img: "/img/inflables/proveedor 5/godopop.webp" },
      { id: "inf5-5", name: "Micky Car", price: 1200, img: "/img/inflables/proveedor 5/micky-car.webp" },
      { id: "inf5-6", name: "Minnie", price: 1100, img: "/img/inflables/proveedor 5/minnie.webp" },
      { id: "inf5-7", name: "Trampolín Azul", price: 1000, img: "/img/inflables/proveedor 5/trampolin-azul.webp" },
    ],
  },
];

// --- MÚSICA ---
// Listas predefinidas para no repetir código
const SHOWS_DISPONIBLES = [
  "Show 80's", "Show 90's", "Show Luis Miguel", "Show Vicente Fernández", 
  "Show Daddy Yankee", "Show La Monja", "Show La Máscara", "Show Beetle Juice", 
  "Show Harry Potter", "Show El Juego del Calamar", "Show Carnaval"
];

const BOTARGAS_DISPONIBLES = [
  "Luis Miguel", "Vitor", "Vicente Fernández", "Blue Demon", "Vaca Lola", "Pepo", "Elvis"
];

export const soundData = [
  {
    id: "s2", 
    type: "Show y Animación",
    name: "Proveedor musical I",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774245328/2_diotju.mp4",
    description: "Todos los paquetes tienen audio profesional, DJ en vivo, 5 horas de música continua + 2 de cortesía para música de fondo",
    packages: [
      {
        id: "s2-p1",
        name: "Paquete silver",
        price: 6200,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774245331/video_3_sin_marca_k15ohu.mp4",
        includes: [
          "Banda Sinaloense (Alineación básica)",
          "Mascaritas",
          "Audio profesional y DJ",
          "5 horas de música + 2 de cortesía"
        ],
        options: [
          { 
            id: "show_o_botarga", 
            label: "Elige 1 Show o 1 Botarga", 
            max: 1, 
            choices: [
              ...SHOWS_DISPONIBLES
            ] 
          }
        ]
      },
      {
        id: "s2-p2",
        name: "PAQUETE GOLD",
        price: 8200,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774245333/1_sin_marca_r0te3w.mp4",
        includes: [
          "Banda Sinaloense",
          "Audio profesional y DJ",
          "5 horas de música + 2 de cortesía"
        ],
        options: [
          { id: "shows_gold", label: "Elige 2 Shows", max: 2, choices: SHOWS_DISPONIBLES }
        ]
      },
      {
        id: "s2-p3",
        name: "PAQUETE PLATINUM",
        price: 10200,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774246925/WhatsApp_Video_2026-03-23_at_12.18.14_AM_kyj2aq.mp4",
        includes: [
          "Souvenirs variados",
          "Banda Sinaloense",
          "Audio profesional y DJ",
          "5 horas de música + 2 de cortesía"
        ],
        options: [
          { id: "shows_plat", label: "Elige 4 Shows", max: 4, choices: SHOWS_DISPONIBLES }
        ]
      },
      {
        id: "s2-p4",
        name: "PAQUETE DIAMANTE",
        price: 16200,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774245328/2_diotju.mp4",
        includes: [
          "TODOS LOS SHOWS INCLUIDOS (80's, 90's, Luis Miguel, Vicente F., Daddy Yankee, La Monja, La Máscara, Beetle Juice, Harry Potter, Calamar, Carnaval, Brincos Dieras, Depredador Led)",
          "Botargas a elegir",
          "Banda Sinaloense",
          "Souvenirs (globos, sombreros, collares, banderas)",
          "Botella de tequila y Tabla de Shots",
          "Toro con Pirotecnia",
          "6 chisperos de pirotecnia",
          "Mochila fumigadora y Espumas",
          "Bazookas de confeti",
          "Luces Neon y Botella gigante"
        ],
      },
    ],
  },
  {
    id: "s3",
    type: "Show y Animación",
    name: "Proveedor musical II",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775595553/VID-20260325-WA0007_1_z7mbml.mp4",
    description: "Todos los paquetes tienen 2 horas de musica de fondo para la comida",
    packages: [
      {
        id: "s3-p1",
        name: "Paquete basico",
        price: 6000,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775595553/VID-20260325-WA0016_2_q4rxud.mp4",
        includes: [
          "2 horas de música de fondo para la comida"
        ],
        extraHourPrice: 900,
        options: [
          { id: "botargas", label: "Elige tus botargas", max: 2, choices: BOTARGAS_DISPONIBLES }
        ],
        addons: [
          { name: "Pista de baile 25m2", price: 5000 },
          { name: "Papelitos (Bazokazo)", price: 300 },
          { name: "Robot LED", price: 1500 }
        ]
      },
      {
        id: "s3-p2",
        name: "Paquete Mediano",
        price: 9000,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775595554/VID-20260325-WA0012_pfnnny.mp4",
        includes: [
          "5 horas de música de fondo para la comida"
        ],
        extraHourPrice: 900,
        options: [
          { id: "botargas", label: "Elige tus botargas", max: 3, choices: BOTARGAS_DISPONIBLES }
        ],
        addons: [
          { name: "Pista de baile 25m2", price: 5000 },
          { name: "Papelitos (Bazokazo)", price: 300 },
          { name: "Robot LED", price: 1500 }
        ]
      },
      {
        id: "s3-p3",
        name: "Paquete Grande",
        price: 12000,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775595556/VID-20260325-WA0015_ctwxa9.mp4",
        includes: [
          "5 horas de música de fondo para la comida",
          "Sanqueros"
        ],
        extraHourPrice: 900,
        options: [
          { id: "botargas", label: "Elige tus botargas", max: 4, choices: BOTARGAS_DISPONIBLES }
        ],
        addons: [
          { name: "Pista de baile 25m2", price: 5000 },
          { name: "Papelitos (Bazokazo)", price: 300 },
          { name: "Robot LED", price: 1500 }
        ]
      },
    ],
  },
  {
    id: "s4",
    type: "Show y Animación",
    name: "Proveedor musical III",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775598920/Messenger_creation_38AAC1E0-EBDF-4B2E-9EBC-6533F7457113_wlprwt.mp4",
    description: "Lo mejor para tus eventos",
    packages: [
      {
        id: "s4-p1",
        name: "Paquete 1",
        price: 5200,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775598905/Messenger_creation_47746323-8D2F-4188-A817-1E1024692C47_bmlvt3.mp4",
        includes: [
          "Para un maximo de 100 invitados",
          "Servicio por 5 horas"
        ]
      },
      {
        id: "s4-p2",
        name: "Paquete 2",
        price: 6700,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775598903/Messenger_creation_5788BD26-3B6B-455E-AD69-28381C1687D8_grgkuf.mp4",
        includes: [
          "Para un maximo de 200 personas",
          "Servicio por 5 horas",
          "En este paquete regalamos souvenirs para batucada el audio e iluminación es de acuerdo al espacio"
        ]
      }
    ],
  },
  {
    id: "s5",
    type: "Show y Animación",
    name: "Proveedor musical IV",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775614882/InShot_20260325_230328741_jwaydy.mp4",
    description: "5 horas de baile mas 2 horas de musica suave para la comida",
    packages: [
      {
        id: "s5-p1",
        name: "Paquete chico",
        price: 6000,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775614881/InShot_20260325_230618213_lhdpug.mp4",
        includes: [
          "2 Graves de piso",
          "2 medios",
          "Porteria de iluminacion LED",
          "Cabina DJ",
          "Pantalla de proyeccion de 84 (Opcional por espacio)",
          "Animacion",
          "Mezcla en vivo en audio y video",
          "Globos largos en el baile"
        ]
      },
      {
        id: "s5-p2",
        name: "Paquete Mediano",
        price: 6500,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775614869/InShot_20260325_230936472_ewelxh.mp4",
        includes: [
          "4 Graves de piso",
          "4 medios",
          "Porteria de iluminacion LED",
          "Cabina DJ",
          "Pantalla de proyeccion de 84 (Opcional por espacio)",
          "Animacion",
          "Mezcla en vivo en audio y video",
          "Globos largos en el baile"
        ]
      },
      {
        id: "s5-p3",
        name: "Paquete Grande",
        price: 7500,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/q_auto/f_auto/v1775614837/InShot_20260325_231730466_xbwcsa.mp4",
        includes: [
          "6 Graves de piso",
          "6 medios activos y pasivos",
          "Porteria de iluminacion LED",
          "Cabina DJ",
          "Pantalla de proyeccion de 90 (Opcional por espacio)",
          "Animacion",
          "Mezcla en vivo en audio y video",
          "Globos largos en el baile"
        ]
      }
    ],
  },
];

export const bandsData = [
  {
    id: "b1",
    type: "Banda norteño",
    name: "Proveedor I Banda Norteña",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774496244/WhatsApp_Video_2026-03-25_at_9.36.21_PM_bdgm9u.mp4",
    description: "Somos un grupo musical de nueva generacion ayudanos a crecer y seguir tocando",
    packages: [
      {
        id: "sb1-p1",
        name: "Paquete Uno",
        price: 1700,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774497988/VIDEO_PROMO_tn7o8s.mp4",
        extraHourPrice: 1500,
        includes: ["Acordeon", "Bajo", "guitarra", "cantante", "Show de 1 hora"],
      },
    ],
  },
  {
    id: "b2",
    type: "Banda norteño",
    name: "Proveedor II Banda Norteña",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499123/WhatsApp_Video_2026-03-25_at_10.16.45_PM_xauqce.mp4",
    description: "Somos un grupo musical de norteño",
    packages: [
      {
        id: "sb2-p1",
        name: "Trío Norteño",
        price: 2000,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499214/WhatsApp_Video_2026-03-25_at_10.16.53_PM_mpbhxt.mp4",
        extraHourPrice: 1800,
        includes: ["acordeón", "Bajo", "guitarra", "cantante", "Show de 1 hora"],
      },
      {
        id: "sb2-p2",
        name: "PAQUETE COMPLETO",
        price: 2400,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499217/Video_de_mutzan_smyh0r.mp4",
        extraHourPrice: 2000,
        includes: ["acordeón", "Bajo", "guitarra", "cantante", "Batería", "Show de 1 hora"],
      },
    ],
  },
  {
    id: "b3",
    type: "Banda norteño",
    name: "Proveedor III Banda Norteña",
    mainVideo: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499766/WhatsApp_Video_2026-03-25_at_10.21.50_PM_lenmf1.mp4",
    description: "Somos un grupo musical de norteño",
    packages: [
      {
        id: "sb3-p1",
        name: "PAQUETE BÁSICO",
        price: 2400,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499767/WhatsApp_Video_2026-03-25_at_10.21.13_PM_of1qve.mp4",
        extraHourPrice: 2000,
        includes: ["acordeón", "Bajo", "guitarra", "bajo quinto", "audio para 30 a 50 personas.", "Show de 1 hora"],
      },
      {
        id: "sb3-p2",
        name: "PAQUETE CON PERCUSIÓN",
        price: 8400,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499768/WhatsApp_Video_2026-03-25_at_10.20.50_PM_zdoapr.mp4",
        extraHourPrice: 2500,
        includes: ["guitarra eléctrica", "bajo electrico", "simulador de batería", "con audio y luces.", "Capacidad: 70 a 100 personas.", "Show de 3 hora"],
      },
      {
        id: "sb3-p3",
        name: "PAQUETE COMPLETO",
        price: 19900,
        video: "https://res.cloudinary.com/dnopl3t98/video/upload/v1774499768/WhatsApp_Video_2026-03-25_at_10.21.49_PM_ivmpn3.mp4",
        extraHourPrice: 3500,
        includes: ["Acordeón", "Bajo quinto", "Guitarra electrica", "Bajarra", "requinto", "equínta", "batería completa", "audio", "chisperos", "flamas", "luces", "Capacidad: 150 a 200 personas.", "Show de 5 horas"],
      },
    ],
  },
];

// --- CABAÑA ---
export const cabinData = {
  price: 600,
  desc: "Descansa rodeado de naturaleza. Nuestra cabaña está diseñada para brindarte privacidad, confort y todo lo necesario para sentirte como en casa.",
  amenities: [
    "2 recámaras (3 camas matrimoniales)",
    "Baño completo",
    "Sala y Comedor",
    "Cocina equipada",
    "Vajilla básica",
    "TV e Internet (Wi-Fi)",
    "Amplio espacio de jardín",
  ],
  schedule: "Entrada: 12:00 PM | Salida: 12:00 PM",
  policy: "Al llegar se hará un recorrido, entrega de inventario de lo que se esta entregando, se debera firmar un contrato en donde se estableceran terminos y condiciones de uso de las instalaciones, de igual forma el ultimo dia de su visita se volvera a realizar el conteo de inventario y debera coincidir con el primer inventario.",
  img: "/img/cabaña/cabaña-luz.webp",
};

// --- BARRAS TEMÁTICAS (UNIFICADAS) ---
export const specialBarsData = [
  {
    id: "snacks",
    name: "Barra de Snacks Preparados",
    includes: ["Montaje y servicio de snacks a tu medida"],
    options: [
      { id: "papas", label: "Papas (Elige 1)", max: 1, choices: ["Papas naturales", "Papas Flamin hot", "Papas Con queso"] },
      { id: "chicharrones", label: "Chicharrones (Elige 1)", max: 1, choices: ["Chicharrón ventana", "Chicharrón rueda"] },
      { id: "semillas", label: "Semillas (Máx 2)", max: 2, choices: ["Cacahuates japoneses", "Cacahuates salados", "Cacahuates enchilados"] },
      { id: "gomitas", label: "Gomitas (Máx 2)", max: 2, choices: ["Panditas", "Viborita", "Enchiladas", "Frutita", "Normales", "Donitas"] },
      { id: "verduras", label: "Verduras (Máx 3)", max: 3, choices: ["Pepino", "Jícama", "Zanahoria"] },
      { id: "extras", label: "Extras (Máx 1)", max: 1, choices: ["Cueritos"] }
    ]
  },
  {
    id: "hotcakes",
    name: "Barra de Hot Cakes",
    includes: ["Hot cakes recién hechos en tu evento"],
    options: [
      { id: "liquidos", label: "Líquidos (Máx 3)", max: 3, choices: ["Lechera", "Chocolate", "Cajeta", "Crema de avellana", "Mermelada", "Miel"] },
      { id: "granel", label: "A Granel (Máx 4)", max: 4, choices: ["Chispas colores", "Chispas de chocolate", "Chispas chocolate blanco", "Granola"] },
      { id: "galletas", label: "Galletas (Máx 1)", max: 1, choices: ["Galletas chocolate", "Galletas de bombón", "Galletas chokis"] },
      { id: "fruta", label: "Fruta Fresca (Máx 2)", max: 2, choices: ["Uvas", "Fresa", "Durazno", "Plátano"] }
    ]
  },
  {
    id: "maruchan",
    name: "Barra de Maruchan",
    includes: ["Sopas Maruchan", "Salsas", "Limón"],
    options: [
      { id: "sabor", label: "Sabor de Maruchan (Escoger 1)", max: 1, choices: ["Piquín", "Camarón", "Pollo"] },
      { id: "papas", label: "Papas (Escoger 2)", max: 2, choices: ["Chetos flaming hot", "Papas naturales", "Papas flaming hot", "Chetos de queso"] }
    ]
  },
  {
    id: "esquites",
    name: "Barra de Esquites",
    includes: ["Esquites", "Mayonesa", "Queso", "Limón", "Picante"],
    options: [
      { id: "adicionales", label: "Escoger adicional (Máx 2)", max: 2, choices: ["Con papas saladas", "Chetos queso", "Chetos flamin hot", "Doritos queso", "Doritos flamin hot", "Papas saladas", "Papas flamin hot"] }
    ]
  },
  {
    id: "dorilocos",
    name: "Barra de Dorilocos",
    includes: ["Doritos pequeños", "Jícama", "Zanahoria", "Pepino", "Cacahuates", "Cueritos", "Salsas", "Limon"],
    options: []
  },
  {
    id: "micheladas",
    name: "Barra de Micheladas",
    includes: [],
    options: [
      { id: "servicio", label: "Tipo de Servicio (Escoger 1)", max: 1, choices: ["Con servicio (Personal para escarchar y mezclar)", "Sin servicio (Barra lista para los clientes)"] },
      { id: "mezcla", label: "Mezcla (Escoger 2)", max: 2, choices: ["Mezcla Clamato azul", "Mezcla Clamato rojo"] }
    ]
  },
  {
    id: "aguas",
    name: "Barra Aguas de Sabor",
    includes: [],
    options: [
      { id: "sabores", label: "Sabores (Escoger 3 máximos)", max: 3, choices: ["Limón con chia", "Horchata", "Jamaica", "Frutas", "Mazapán", "Café", "Piña", "Tamarindo", "Fruta de temporada"] }
    ]
  },
  {
    id: "clericot",
    name: "Barra de Clericot",
    includes: ["Se dejarán los vitroleros listos para que los invitados puedan pasar a servirse tu bebida"],
    options: []
  },
  {
    id: "chilaquiles",
    name: "Barra de Chilaquiles",
    includes: ["Tortilla", "Crema", "Queso", "Cilantro", "Cebolla"],
    options: [
      { id: "proteina", label: "Proteína (Escoger 1)", max: 1, choices: ["Pollo", "Cecina"] },
      { id: "salsas", label: "Salsas (Escoger 2)", max: 2, choices: ["Salsa verde", "Salsa roja", "Habanero"] }
    ]
  },
  {
    id: "dulces",
    name: "Mesa de Dulces",
    includes: ["Palomitas", "Chicharrones", "Bombones", "Tamarindos", "Gomitas", "Cacahuates", "Vasos con fruta", "Manzana con chamoy", "Jícama", "Zanahoria", "Pepino"],
    options: []
  },
  {
    id: "tropical",
    name: "Mesa Tropical",
    includes: ["Mango", "Sandía", "Jícama", "Zanahoria", "Pepino", "Melón", "Papaya"],
    options: []
  }
];