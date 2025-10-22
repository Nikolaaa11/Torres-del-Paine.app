// Torres del Paine Complete PWA - JavaScript Version
// Optimizado para Samsung Galaxy S24

const { useState, useEffect, useRef } = React;
const { 
  Mountain, MapPin, Calendar, DollarSign, Backpack, AlertTriangle, Camera, Navigation, Star, CheckCircle, Clock, Users, Zap, Shield, Heart, TrendingUp, Eye, Settings, Menu, X, Play, Pause, RotateCcw, Info, Download, Share2, Bookmark, Bell, Wifi, WifiOff, MessageCircle, Map, Thermometer, Wind, CloudRain, Sun, Moon, Battery, Signal, Bluetooth, Compass, Route, Timer, Headphones, Mic, FileText, Search, Filter, SortAsc, MoreVertical, Send, ImageIcon, Video, Trash2, Edit, Save, Plus, Minus, Home, User, Globe, Phone, Tent, Utensils, Shirt, Scissors, Package, Plane, Car, Bus, CreditCard, ReceiptText 
} = window.lucideReact;

const TorresPaineCompleteApp = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('standard');
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weather, setWeather] = useState({ temp: 8, condition: 'windy', wind: 45 });
  const [photos, setPhotos] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({ battery: 85, signal: 'offline', bluetooth: true });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [planningPhase, setPlanningPhase] = useState(1);
  const [budget, setBudget] = useState({ total: 0, spent: 0 });

  // Datos completos del circuito
  const circuitData = {
    totalDistance: 130,
    totalDays: 8,
    walkingHours: '60-70',
    highestPoint: '1,241m',
    difficulty: 'EXTREMA'
  };

  const circuitDays = [
    { 
      day: 1, 
      location: 'Serón', 
      distance: '9.3km', 
      difficulty: 1, 
      highlight: 'Inicio épico',
      services: ['agua', 'camping', 'refugio'],
      altitude: '150m',
      walkingTime: '3-4h',
      weather: 'Variable',
      tips: ['Registrarse CONAF', 'Verificar equipo', 'Salida temprana']
    },
    { 
      day: 2, 
      location: 'Dickson', 
      distance: '18.5km', 
      difficulty: 3, 
      highlight: 'Pampa ventosa',
      services: ['agua', 'camping', 'refugio', 'duchas'],
      altitude: '250m',
      walkingTime: '6-7h',
      weather: 'Vientos fuertes',
      tips: ['Vientos 60+ km/h', 'Usar cortavientos', 'Hidratarse bien']
    },
    { 
      day: 3, 
      location: 'Los Perros', 
      distance: '12km', 
      difficulty: 2, 
      highlight: 'Preparación Gardner',
      services: ['agua', 'camping'],
      altitude: '285m',
      walkingTime: '4-5h',
      weather: 'Húmedo',
      tips: ['Solo camping', 'Sin duchas', 'Preparar Gardner']
    },
    { 
      day: 4, 
      location: 'Grey (Paso Gardner)', 
      distance: '16km', 
      difficulty: 5, 
      highlight: 'PASO GARDNER - EXTREMO',
      services: ['agua', 'camping', 'refugio', 'duchas'],
      altitude: '1,241m',
      walkingTime: '8-10h',
      weather: 'Extremo',
      tips: ['SALIDA 5:00 AM', 'Crampones obligatorios', 'Día más peligroso']
    },
    { 
      day: 5, 
      location: 'Paine Grande', 
      distance: '11km', 
      difficulty: 1, 
      highlight: 'Recuperación',
      services: ['agua', 'camping', 'refugio', 'duchas', 'wifi', 'tienda'],
      altitude: '75m',
      walkingTime: '3-4h',
      weather: 'Estable',
      tips: ['Refugio principal', 'WiFi disponible', 'Reabastecimiento']
    },
    { 
      day: 6, 
      location: 'Cuernos (Valle Francés)', 
      distance: '25km', 
      difficulty: 4, 
      highlight: 'Valle Francés - DÍA MÁS LARGO',
      services: ['agua', 'camping', 'refugio', 'duchas'],
      altitude: '200m',
      walkingTime: '8-9h',
      weather: 'Variable',
      tips: ['Día más largo', 'Dejar mochilas Italiano', 'Mirador imperdible']
    },
    { 
      day: 7, 
      location: 'Chileno', 
      distance: '7.5km', 
      difficulty: 1, 
      highlight: 'Preparación Torres',
      services: ['agua', 'camping'],
      altitude: '410m',
      walkingTime: '2-3h',
      weather: 'Protegido',
      tips: ['Solo camping', 'Preparar Torres', 'Descanso antes final']
    },
    { 
      day: 8, 
      location: 'Las Torres', 
      distance: '19km', 
      difficulty: 3, 
      highlight: 'GRAN FINAL - MIRADOR TORRES',
      services: ['agua', 'parking'],
      altitude: '850m',
      walkingTime: '6-8h',
      weather: 'Montaña',
      tips: ['Salida 4:00 AM', 'Mirador más famoso', 'Celebración final']
    }
  ];

  const planningPhases = [
    {
      phase: 1,
      title: '6+ MESES ANTES: DECISIÓN Y RESERVAS CRÍTICAS',
      subtitle: '⚠️ ETAPA MÁS IMPORTANTE - Sin esto NO hay viaje',
      color: 'from-red-500 to-pink-500',
      urgency: 'CRÍTICO',
      tasks: [
        { category: 'ACCIONES INMEDIATAS', items: ['Decidir fechas exactas del viaje', 'Elegir tipo alojamiento (camping/refugio)'] },
        { category: 'RESERVAS OBLIGATORIAS', items: ['pasesparques.cl - Entrada parque', 'lastorres.com + vertice.travel'] },
        { category: 'PRESUPUESTO', items: ['Definir presupuesto total', 'Apartar dinero para depósitos'] },
        { category: '⚠️ URGENTE', items: ['Refugios se agotan RÁPIDO', 'Temporada alta = 6+ meses'] }
      ]
    },
    {
      phase: 2,
      title: '4-5 MESES ANTES: TRANSPORTE Y PREPARACIÓN FÍSICA',
      subtitle: '✈️ Confirmar reservas y comenzar entrenamiento',
      color: 'from-orange-500 to-red-500',
      urgency: 'ALTO',
      tasks: [
        { category: '✈️ TRANSPORTE', items: ['Reservar vuelos Santiago→Pto.Natales', 'skyairline.com, latam.com'] },
        { category: '🏨 HOSPEDAJE', items: ['Hotel Puerto Natales (2 noches)', 'Confirmar reservas refugios'] },
        { category: '🏃 ENTRENAMIENTO', items: ['Iniciar plan entrenamiento 16 semanas', 'Caminatas con peso 10+ kg'] },
        { category: '🛡️ SEGURO', items: ['Contratar seguro viaje', '⚠️ Cobertura deportes extremos'] }
      ]
    },
    {
      phase: 3,
      title: '3 MESES ANTES: EQUIPAMIENTO Y DOCUMENTOS',
      subtitle: '🎒 Conseguir y probar todo el equipo necesario',
      color: 'from-green-500 to-teal-500',
      urgency: 'MEDIO',
      tasks: [
        { category: '🎒 EQUIPOS', items: ['Comprar/alquilar carpa 4 estaciones', 'Saco dormir -10°C mínimo'] },
        { category: '👕 ROPA', items: ['Sistema 3 capas completo', 'Botas trekking impermeables'] },
        { category: '📄 DOCUMENTOS', items: ['Verificar vigencia pasaporte', 'Vacunas (si es necesario)'] },
        { category: '🧪 PRUEBAS', items: ['Probar carpa en casa', 'Test peso mochila completa'] }
      ]
    },
    {
      phase: 4,
      title: '2 MESES ANTES: FINALIZACIÓN Y CONFIRMACIONES',
      subtitle: '✅ Confirmar todo y ultimar detalles',
      color: 'from-blue-500 to-cyan-500',
      urgency: 'MEDIO',
      tasks: [
        { category: '✅ CONFIRMACIONES', items: ['Confirmar todas las reservas', 'Llamar refugios/aerolíneas'] },
        { category: '🎒 EQUIPOS FINALES', items: ['Completar equipos faltantes', 'Reparar equipos dañados'] },
        { category: '🍽️ COMIDA', items: ['Planificar menús completos', 'Lista compras Puerto Natales'] },
        { category: '💰 FINANZAS', items: ['Conseguir efectivo USD/CLP', 'Avisar banco viajes'] }
      ]
    },
    {
      phase: 5,
      title: '1 MES ANTES: ENTRENAMIENTO INTENSIVO',
      subtitle: '💪 Preparación física final y detalles menores',
      color: 'from-purple-500 to-pink-500',
      urgency: 'ALTO',
      tasks: [
        { category: '💪 ENTRENAMIENTO', items: ['Caminatas largas 8+ horas', 'Peso completo 18+ kg'] },
        { category: '🏥 SALUD', items: ['Chequeo médico final', 'Medicamentos personales'] },
        { category: '🌤️ CLIMA', items: ['Monitorear pronósticos', 'Plan B fechas alternativas'] },
        { category: '📋 LISTAS', items: ['Lista final equipaje', 'Checklist completa'] }
      ]
    }
  ];

  const gearList = {
    capaBase: [
      '2x Camisetas térmicas lana merino',
      '2x Camisetas manga corta técnicas', 
      '3x Ropa interior térmica',
      '4x Calcetines trekking lana',
      '1x Calzoncillos/bragas extra'
    ],
    capaIntermedia: [
      '1x Fleece o soft shell capucha',
      '1x Chaleco plumas ultraliviano',
      '1x Polar grueso campamento',
      '1x Chaqueta térmica extra'
    ],
    capaExterior: [
      '1x Chaqueta impermeable',
      '1x Pantalón impermeable',
      '1x Poncho lluvia emergencia',
      '2x Pantalones trekking',
      '1x Short técnico'
    ],
    extremidades: [
      '2x Gorros térmicos',
      '1x Gorro visera para sol',
      '1x Buff o cuello polar',
      '2x Guantes impermeables'
    ],
    calzado: [
      'Botas trekking impermeables',
      'Zapatillas campamento',
      'Polainas impermeables',
      'Crampones (sept-abril)'
    ],
    accesorios: [
      'Gafas sol categoría 4',
      'Protector solar SPF 50+',
      'Bálsamo labial UV',
      'Repelente DEET 30%+'
    ]
  };

  const dailyMenu = {
    'dias1-2': {
      title: 'Serón → Dickson',
      desayuno: 'Avena + frutos secos',
      almuerzo: 'Sándwich + barrita',
      cena: 'Pasta liofilizada',
      bebidas: 'Café, té, chocolate',
      agua: '3-4 litros/día'
    },
    'dias3-4': {
      title: 'Los Perros → Grey',
      desayuno: 'Granola energética',
      almuerzo: 'Frutos secos + queso',
      cena: 'Estofado liofilizado',
      extra: 'Bebida isotónica',
      chocolate: 'Energía extra'
    },
    'dias5-6': {
      title: 'Paine Grande → Cuernos',
      desayuno: 'Pancakes instantáneos',
      almuerzo: 'Wrap + atún',
      cena: 'Arroz con pollo',
      snack: 'Queso + galletas',
      fruta: 'Deshidratada'
    },
    'dias7-8': {
      title: 'Chileno → Las Torres',
      desayuno: 'Barras energéticas',
      almuerzo: 'Trail mix premium',
      cena: 'Celebración en refugio',
      final: 'GRAN CELEBRACIÓN'
    }
  };

  const transportOptions = {
    economica: { name: 'ECONÓMICA', method: 'Bus Santiago→Pto.Natales', cost: '$190-360 USD', time: '28 horas' },
    intermedia: { name: 'INTERMEDIA', method: 'Vuelo Stgo→Punta Arenas + Bus', cost: '$90-180 USD', time: '6 horas total' },
    premium: { name: 'PREMIUM', method: 'Vuelo directo Stgo→Pto.Natales', cost: '$57-120 USD', time: '3h 15min' }
  };

  const emergencyInfo = {
    conaf: '+56 61 2691931',
    hospital: '+56 61 2411583',
    carabineros: '+56 61 2411023',
    emergencias: '131',
    rescueCost: '$2,000-5,000 USD',
    coverage: 'Sin señal: 80% del circuito'
  };

  const budgetBreakdown = {
    mochilero: {
      transporte: 250,
      alojamiento: 280,
      entrada: 56,
      comida: 100,
      equipos: 150,
      seguro: 50,
      total: '$600-900'
    },
    standard: {
      transporte: 150,
      alojamiento: 500,
      entrada: 56,
      comida: 250,
      equipos: 200,
      seguro: 75,
      total: '$1000-1500'
    },
    premium: {
      transporte: 120,
      alojamiento: 800,
      entrada: 56,
      comida: 400,
      equipos: 300,
      seguro: 100,
      total: '$1800-2500'
    }
  };

  // Interactive Map Component
  const InteractiveMap = () => React.createElement('div', {
    className: "relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-green-700 via-blue-700 to-purple-700 rounded-xl overflow-hidden border border-white/20 map-container"
  }, [
    React.createElement('div', { 
      key: 'overlay',
      className: "absolute inset-0 bg-black/20" 
    }),
    
    // Map Background
    React.createElement('div', { 
      key: 'background',
      className: "absolute inset-0" 
    }, [
      React.createElement('div', {
        key: 'lago1',
        className: "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }, React.createElement('div', {
        className: "text-center text-white"
      }, React.createElement('div', {
        className: "text-sm font-bold bg-blue-600/80 px-3 py-1 rounded-full mb-2"
      }, 'LAGO NORDENSKJÖLD'))),
      
      React.createElement('div', {
        key: 'lago2',
        className: "absolute bottom-1/3 left-1/2 transform -translate-x-1/2"
      }, React.createElement('div', {
        className: "text-center text-white"
      }, React.createElement('div', {
        className: "text-sm font-bold bg-cyan-600/80 px-3 py-1 rounded-full mb-2"
      }, 'LAGO GREY')))
    ]),
    
    // Circuit Trail
    React.createElement('svg', {
      key: 'trail',
      className: "absolute inset-0 w-full h-full",
      viewBox: "0 0 400 300"
    }, React.createElement('path', {
      d: "M 100 150 Q 150 100 200 120 Q 250 140 300 120 Q 350 100 320 160 Q 290 220 240 200 Q 190 180 140 200 Q 90 220 100 150",
      stroke: "#ef4444",
      strokeWidth: "3",
      strokeDasharray: "5,5",
      fill: "none",
      className: "animate-pulse"
    })),
    
    // Day Points
    ...circuitDays.map((day, index) => {
      const positions = [
        { x: '25%', y: '50%' }, // Serón
        { x: '35%', y: '30%' }, // Dickson  
        { x: '50%', y: '25%' }, // Los Perros
        { x: '65%', y: '20%' }, // Gardner/Grey
        { x: '75%', y: '40%' }, // Paine Grande
        { x: '70%', y: '65%' }, // Cuernos
        { x: '50%', y: '75%' }, // Chileno
        { x: '30%', y: '80%' }  // Torres
      ];
      
      return React.createElement('button', {
        key: day.day,
        onClick: () => setCurrentDay(day.day),
        className: `absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          currentDay === day.day
            ? 'scale-110 sm:scale-125 z-20'
            : 'hover:scale-105 sm:hover:scale-110 z-10'
        }`,
        style: { left: positions[index].x, top: positions[index].y }
      }, [
        React.createElement('div', {
          key: 'day-circle',
          className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
            currentDay === day.day
              ? 'bg-red-500 border-red-300 text-white shadow-lg'
              : 'bg-white/80 border-white text-gray-800 hover:bg-white'
          }`
        }, day.day),
        React.createElement('div', {
          key: 'day-label',
          className: `mt-1 text-[10px] sm:text-xs font-medium text-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap ${
            currentDay === day.day
              ? 'bg-red-500/90 text-white'
              : 'bg-black/60 text-white'
          }`
        }, day.location)
      ]);
    }),
    
    // Current Location Indicator
    currentLocation && React.createElement('div', {
      key: 'location',
      className: "absolute top-4 right-4 bg-green-500/90 text-white px-3 py-2 rounded-lg text-sm"
    }, React.createElement('div', {
      className: "flex items-center space-x-2"
    }, [
      React.createElement(Navigation, { key: 'nav-icon', className: "w-4 h-4" }),
      React.createElement('span', { key: 'nav-text' }, 'Tu ubicación')
    ]))
  ]);

  // Detailed Day Info Component
  const DayDetails = ({ day }) => {
    const dayData = circuitDays[day - 1];
    
    return React.createElement('div', {
      className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
    }, [
      React.createElement('div', {
        key: 'header',
        className: "flex flex-col sm:flex-row justify-between items-start mb-4 gap-3"
      }, [
        React.createElement('div', { key: 'title-section' }, [
          React.createElement('h3', {
            key: 'title',
            className: "text-2xl font-bold text-white mb-2"
          }, `Día ${day}: ${dayData.location}`),
          React.createElement('p', {
            key: 'highlight',
            className: "text-lg text-blue-200 mb-2"
          }, dayData.highlight),
          React.createElement('div', {
            key: 'stats',
            className: "flex items-center space-x-4 text-sm text-gray-300"
          }, [
            React.createElement('span', { key: 'distance' }, `📏 ${dayData.distance}`),
            React.createElement('span', { key: 'time' }, `⏱️ ${dayData.walkingTime}`),
            React.createElement('span', { key: 'altitude' }, `📍 ${dayData.altitude}`)
          ])
        ]),
        React.createElement('div', {
          key: 'difficulty',
          className: "text-right"
        }, [
          React.createElement('div', {
            key: 'stars',
            className: "flex"
          }, [1,2,3,4,5].map(star => 
            React.createElement(Star, {
              key: star,
              className: `w-5 h-5 ${
                star <= dayData.difficulty 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-600'
              }`
            })
          )),
          React.createElement('p', {
            key: 'diff-text',
            className: "text-sm text-gray-300 mt-1"
          }, `Dificultad ${dayData.difficulty}/5`)
        ])
      ]),
      
      React.createElement('div', {
        key: 'content',
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      }, [
        React.createElement('div', { key: 'services' }, [
          React.createElement('h4', {
            key: 'services-title',
            className: "font-semibold text-blue-300 mb-3"
          }, '🏠 Servicios Disponibles'),
          React.createElement('div', {
            key: 'services-list',
            className: "space-y-2"
          }, dayData.services.map(service => 
            React.createElement('div', {
              key: service,
              className: "flex items-center space-x-2 text-sm text-gray-300"
            }, [
              React.createElement(CheckCircle, {
                key: 'check',
                className: "w-4 h-4 text-green-400"
              }),
              React.createElement('span', {
                key: 'service-name',
                className: "capitalize"
              }, service)
            ])
          ))
        ]),
        
        React.createElement('div', { key: 'tips' }, [
          React.createElement('h4', {
            key: 'tips-title',
            className: "font-semibold text-blue-300 mb-3"
          }, '💡 Consejos del Día'),
          React.createElement('div', {
            key: 'tips-list',
            className: "space-y-2"
          }, dayData.tips.map((tip, index) =>
            React.createElement('div', {
              key: index,
              className: "flex items-start space-x-2 text-sm text-gray-300"
            }, [
              React.createElement('span', {
                key: 'bullet',
                className: "text-yellow-400 mt-0.5"
              }, '•'),
              React.createElement('span', {
                key: 'tip-text'
              }, tip)
            ])
          ))
        ]),
        
        React.createElement('div', { key: 'conditions' }, [
          React.createElement('h4', {
            key: 'conditions-title',
            className: "font-semibold text-blue-300 mb-3"
          }, '🌤️ Condiciones'),
          React.createElement('div', {
            key: 'conditions-list',
            className: "space-y-2 text-sm text-gray-300"
          }, [
            React.createElement('p', { key: 'clima' }, [
              React.createElement('strong', { key: 'clima-label' }, 'Clima: '),
              dayData.weather
            ]),
            React.createElement('p', { key: 'tiempo' }, [
              React.createElement('strong', { key: 'tiempo-label' }, 'Tiempo caminata: '),
              dayData.walkingTime
            ]),
            React.createElement('p', { key: 'altitud' }, [
              React.createElement('strong', { key: 'altitud-label' }, 'Altitud máxima: '),
              dayData.altitude
            ])
          ])
        ])
      ])
    ]);
  };

  // Planning Phase Component
  const PlanningPhaseView = () => {
    const currentPhase = planningPhases[planningPhase - 1];
    
    return React.createElement('div', {
      className: "space-y-6"
    }, React.createElement('div', {
      className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
    }, [
      React.createElement('div', {
        key: 'phase-header',
        className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
      }, [
        React.createElement('div', { key: 'phase-info' }, [
          React.createElement('h2', {
            key: 'phase-title',
            className: "text-2xl font-bold text-white"
          }, currentPhase.title),
          React.createElement('p', {
            key: 'phase-subtitle',
            className: "text-gray-300 mt-1"
          }, currentPhase.subtitle)
        ]),
        React.createElement('div', {
          key: 'phase-nav',
          className: "flex space-x-2"
        }, planningPhases.map((phase, index) =>
          React.createElement('button', {
            key: phase.phase,
            onClick: () => setPlanningPhase(phase.phase),
            className: `w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
              planningPhase === phase.phase
                ? 'bg-blue-500 border-blue-400 text-white'
                : 'border-white/30 text-gray-400 hover:border-blue-400'
            }`
          }, phase.phase)
        ))
      ]),
      
      React.createElement('div', {
        key: 'urgency-banner',
        className: `bg-gradient-to-r ${currentPhase.color} rounded-xl p-1 mb-6`
      }, React.createElement('div', {
        className: "bg-black/50 rounded-lg p-4"
      }, React.createElement('div', {
        className: "flex items-center justify-between"
      }, [
        React.createElement('span', {
          key: 'urgency',
          className: "text-white font-bold"
        }, `URGENCIA: ${currentPhase.urgency}`),
        React.createElement('span', {
          key: 'phase-counter',
          className: "text-white"
        }, `Fase ${planningPhase} de ${planningPhases.length}`)
      ]))),
      
      React.createElement('div', {
        key: 'tasks-grid',
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      }, currentPhase.tasks.map((taskGroup, index) =>
        React.createElement('div', {
          key: index,
          className: "bg-white/10 rounded-xl p-3 sm:p-4"
        }, [
          React.createElement('h3', {
            key: 'task-category',
            className: "font-bold text-white mb-3"
          }, taskGroup.category),
          React.createElement('div', {
            key: 'task-items',
            className: "space-y-2"
          }, taskGroup.items.map((item, itemIndex) =>
            React.createElement('div', {
              key: itemIndex,
              className: "flex items-start space-x-2"
            }, [
              React.createElement('span', {
                key: 'bullet',
                className: "text-blue-400 mt-1"
              }, '•'),
              React.createElement('span', {
                key: 'item-text',
                className: "text-gray-300 text-sm"
              }, item)
            ])
          ))
        ])
      )),
      
      React.createElement('div', {
        key: 'phase-controls',
        className: "flex justify-between items-center mt-6"
      }, [
        React.createElement('button', {
          key: 'prev-btn',
          onClick: () => setPlanningPhase(Math.max(1, planningPhase - 1)),
          disabled: planningPhase === 1,
          className: "px-6 py-2 bg-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-all duration-300"
        }, '← Anterior'),
        React.createElement('span', {
          key: 'phase-indicator',
          className: "text-gray-300"
        }, `${planningPhase} / ${planningPhases.length}`),
        React.createElement('button', {
          key: 'next-btn',
          onClick: () => setPlanningPhase(Math.min(planningPhases.length, planningPhase + 1)),
          disabled: planningPhase === planningPhases.length,
          className: "px-6 py-2 bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all duration-300"
        }, 'Siguiente →')
      ])
    ]));
  };

  // Complete Gear List Component
  const GearListView = () => React.createElement('div', {
    className: "space-y-6"
  }, React.createElement('div', {
    className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
  }, [
    React.createElement('h2', {
      key: 'gear-title',
      className: "text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6"
    }, '📋 Lista Completa de Equipamiento'),

    React.createElement('div', {
      key: 'gear-grid',
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    }, Object.entries(gearList).map(([category, items]) =>
      React.createElement('div', {
        key: category,
        className: "bg-white/10 rounded-xl p-4"
      }, [
        React.createElement('h3', {
          key: 'category-title',
          className: "font-bold text-white mb-3 capitalize flex items-center"
        }, [
          React.createElement('span', {
            key: 'category-icon',
            className: "mr-2"
          }, 
            category === 'capaBase' ? '🏔️' :
            category === 'capaIntermedia' ? '🧥' :
            category === 'capaExterior' ? '🌧️' :
            category === 'extremidades' ? '🧤' :
            category === 'calzado' ? '👢' :
            category === 'accesorios' ? '🕶️' : '📦'
          ),
          category.replace(/([A-Z])/g, ' $1').toLowerCase()
        ]),
        React.createElement('div', {
          key: 'category-items',
          className: "space-y-2"
        }, items.map((item, index) =>
          React.createElement('div', {
            key: index,
            className: "flex items-start space-x-2"
          }, [
            React.createElement('input', {
              key: 'checkbox',
              type: "checkbox",
              className: "mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            }),
            React.createElement('span', {
              key: 'item-text',
              className: "text-gray-300 text-sm"
            }, item)
          ])
        ))
      ])
    )),
    
    React.createElement('div', {
      key: 'critical-gear',
      className: "mt-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-400/30"
    }, [
      React.createElement('h3', {
        key: 'critical-title',
        className: "text-xl font-bold text-white mb-4"
      }, '⚠️ EQUIPOS CRÍTICOS'),
      React.createElement('div', {
        key: 'critical-grid',
        className: "grid grid-cols-1 md:grid-cols-2 gap-4"
      }, [
        React.createElement('div', { key: 'obligatorios' }, [
          React.createElement('h4', {
            key: 'obligatorios-title',
            className: "font-semibold text-orange-300 mb-2"
          }, 'OBLIGATORIOS'),
          React.createElement('ul', {
            key: 'obligatorios-list',
            className: "space-y-1 text-gray-300 text-sm"
          }, [
            React.createElement('li', { key: 'carpa' }, '• Carpa 4 estaciones'),
            React.createElement('li', { key: 'saco' }, '• Saco dormir -10°C mínimo'),
            React.createElement('li', { key: 'botas' }, '• Botas impermeables'),
            React.createElement('li', { key: 'crampones' }, '• Crampones (abril-septiembre)')
          ])
        ]),
        React.createElement('div', { key: 'recomendados' }, [
          React.createElement('h4', {
            key: 'recomendados-title',
            className: "font-semibold text-orange-300 mb-2"
          }, 'RECOMENDADOS'),
          React.createElement('ul', {
            key: 'recomendados-list',
            className: "space-y-1 text-gray-300 text-sm"
          }, [
            React.createElement('li', { key: 'gps' }, '• GPS satelital'),
            React.createElement('li', { key: 'power' }, '• Power bank solar'),
            React.createElement('li', { key: 'botiquin' }, '• Botiquín completo'),
            React.createElement('li', { key: 'silbato' }, '• Silbato emergencia')
          ])
        ])
      ])
    ])
  ]));

  // Budget Calculator Component
  const BudgetCalculator = () => React.createElement('div', {
    className: "space-y-6"
  }, React.createElement('div', {
    className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
  }, [
    React.createElement('h2', {
      key: 'budget-title',
      className: "text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6"
    }, '💰 Calculadora de Presupuesto Detallada'),

    React.createElement('div', {
      key: 'budget-levels',
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    }, Object.entries(budgetBreakdown).map(([level, costs]) =>
      React.createElement('div', {
        key: level,
        className: `rounded-xl p-6 border-2 transition-all duration-300 ${
          selectedDifficulty === level 
            ? 'border-blue-400 bg-blue-500/20' 
            : 'border-white/20 bg-white/5 hover:border-white/40'
        }`
      }, [
        React.createElement('div', {
          key: 'level-header',
          className: "text-center mb-4"
        }, [
          React.createElement('h3', {
            key: 'level-name',
            className: "text-xl font-bold text-white capitalize"
          }, level),
          React.createElement('p', {
            key: 'level-total',
            className: "text-2xl font-bold text-blue-400 mt-2"
          }, costs.total)
        ]),
        
        React.createElement('div', {
          key: 'cost-breakdown',
          className: "space-y-3"
        }, Object.entries(costs).filter(([key]) => key !== 'total').map(([category, cost]) =>
          React.createElement('div', {
            key: category,
            className: "flex justify-between items-center py-2 border-b border-white/10"
          }, [
            React.createElement('span', {
              key: 'category-name',
              className: "text-gray-300 capitalize"
            }, `${category}:`),
            React.createElement('span', {
              key: 'category-cost',
              className: "text-white font-medium"
            }, `$${cost}`)
          ])
        )),
        
        React.createElement('button', {
          key: 'select-btn',
          onClick: () => setSelectedDifficulty(level),
          className: `w-full mt-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            selectedDifficulty === level
              ? 'bg-blue-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`
        }, `Seleccionar ${level}`)
      ])
    )),
    
    React.createElement('div', {
      key: 'payment-schedule',
      className: "mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30"
    }, [
      React.createElement('h3', {
        key: 'schedule-title',
        className: "text-xl font-bold text-white mb-4"
      }, '📊 Cronograma de Pagos'),
      React.createElement('div', {
        key: 'schedule-grid',
        className: "grid grid-cols-1 md:grid-cols-5 gap-4"
      }, [
        { time: '6 meses antes', amount: '$300-400', items: 'Depósitos + entrada' },
        { time: '4 meses antes', amount: '$400-900', items: 'Vuelos + equipos' },
        { time: '2 meses antes', amount: '$600-800', items: 'Saldo refugios + ropa' },
        { time: '1 semana antes', amount: '$450', items: 'Efectivo + comida' },
        { time: 'Durante viaje', amount: '$200', items: 'Extras + souvenirs' }
      ].map((payment, index) =>
        React.createElement('div', {
          key: index,
          className: "bg-white/10 rounded-lg p-4 text-center"
        }, [
          React.createElement('p', {
            key: 'payment-time',
            className: "text-sm text-gray-300 mb-1"
          }, payment.time),
          React.createElement('p', {
            key: 'payment-amount',
            className: "text-lg font-bold text-green-400 mb-2"
          }, payment.amount),
          React.createElement('p', {
            key: 'payment-items',
            className: "text-xs text-gray-400"
          }, payment.items)
        ])
      ))
    ])
  ]));

  // Daily Menu Component
  const MenuView = () => React.createElement('div', {
    className: "space-y-6"
  }, React.createElement('div', {
    className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
  }, [
    React.createElement('h2', {
      key: 'menu-title',
      className: "text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6"
    }, '🍽️ Menú Diario Completo'),

    React.createElement('div', {
      key: 'menu-grid',
      className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
    }, Object.entries(dailyMenu).map(([period, menu]) =>
      React.createElement('div', {
        key: period,
        className: "bg-white/10 rounded-xl p-4"
      }, [
        React.createElement('h3', {
          key: 'period-title',
          className: "font-bold text-white mb-3"
        }, menu.title),
        React.createElement('div', {
          key: 'period-meals',
          className: "space-y-2"
        }, Object.entries(menu).filter(([key]) => key !== 'title').map(([meal, food]) =>
          React.createElement('div', {
            key: meal,
            className: "flex justify-between items-center py-1"
          }, [
            React.createElement('span', {
              key: 'meal-name',
              className: "text-gray-300 capitalize"
            }, `${meal}:`),
            React.createElement('span', {
              key: 'meal-food',
              className: "text-white text-sm"
            }, food)
          ])
        ))
      ])
    )),
    
    React.createElement('div', {
      key: 'additional-info',
      className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
    }, [
      React.createElement('div', {
        key: 'emergency-provisions',
        className: "bg-red-500/10 rounded-xl p-4 border border-red-500/30"
      }, [
        React.createElement('h3', {
          key: 'emergency-title',
          className: "font-bold text-red-300 mb-3"
        }, '🆘 Provisiones Emergencia'),
        React.createElement('ul', {
          key: 'emergency-list',
          className: "space-y-1 text-gray-300 text-sm"
        }, [
          React.createElement('li', { key: 'extra-food' }, '• 2 días comida extra'),
          React.createElement('li', { key: 'energy-bars' }, '• Barras energéticas extra'),
          React.createElement('li', { key: 'chocolate' }, '• Chocolate alto en calorías'),
          React.createElement('li', { key: 'soup' }, '• Sopa instantánea')
        ])
      ]),
      
      React.createElement('div', {
        key: 'supplements',
        className: "bg-green-500/10 rounded-xl p-4 border border-green-500/30"
      }, [
        React.createElement('h3', {
          key: 'supplements-title',
          className: "font-bold text-green-300 mb-3"
        }, '💊 Suplementos'),
        React.createElement('ul', {
          key: 'supplements-list',
          className: "space-y-1 text-gray-300 text-sm"
        }, [
          React.createElement('li', { key: 'condiments' }, '• Sal, pimienta, ajo en polvo'),
          React.createElement('li', { key: 'oil' }, '• Aceite oliva pequeño'),
          React.createElement('li', { key: 'vitamins' }, '• Multivitamínicos'),
          React.createElement('li', { key: 'electrolytes' }, '• Electrolitos en polvo')
        ])
      ])
    ])
  ]));

  // Effects para detectar conexión online/offline
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effect para obtener geolocalización
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  // Main render
  return React.createElement('div', {
    className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
  }, [
    // Status Bar
    React.createElement('div', {
      key: 'status-bar',
      className: "flex justify-between items-center px-4 py-2 bg-black/50 text-white text-sm"
    }, [
      React.createElement('div', {
        key: 'status-left',
        className: "flex items-center space-x-2"
      }, [
        React.createElement('span', {
          key: 'time'
        }, new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })),
        React.createElement(isOffline ? WifiOff : Wifi, {
          key: 'wifi-icon',
          className: `w-4 h-4 ${isOffline ? 'text-red-400' : 'text-green-400'}`
        })
      ]),
      React.createElement('div', {
        key: 'status-right',
        className: "flex items-center space-x-2"
      }, [
        React.createElement(Signal, {
          key: 'signal-icon',
          className: "w-4 h-4 text-gray-400"
        }),
        React.createElement(Battery, {
          key: 'battery-icon',
          className: "w-4 h-4 text-green-400"
        }),
        React.createElement('span', {
          key: 'battery-level'
        }, `${deviceInfo.battery}%`)
      ])
    ]),

    // Emergency Mode
    emergencyMode && React.createElement('div', {
      key: 'emergency-modal',
      className: "fixed inset-0 z-50 bg-red-900/95 backdrop-blur-sm flex items-center justify-center p-4"
    }, React.createElement('div', {
      className: "bg-red-500 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border-2 border-red-400"
    }, [
      React.createElement(AlertTriangle, {
        key: 'emergency-icon',
        className: "w-16 h-16 text-white mx-auto mb-4"
      }),
      React.createElement('h2', {
        key: 'emergency-title',
        className: "text-2xl font-bold text-white mb-4"
      }, 'MODO EMERGENCIA'),
      React.createElement('div', {
        key: 'emergency-info',
        className: "space-y-3 text-white text-lg"
      }, [
        React.createElement('p', { key: 'conaf' }, [
          React.createElement('strong', { key: 'conaf-label' }, 'CONAF Rescate:'),
          React.createElement('br', { key: 'conaf-br' }),
          emergencyInfo.conaf
        ]),
        React.createElement('p', { key: 'hospital' }, [
          React.createElement('strong', { key: 'hospital-label' }, 'Hospital:'),
          React.createElement('br', { key: 'hospital-br' }),
          emergencyInfo.hospital
        ]),
        React.createElement('p', { key: 'emergencias' }, [
          React.createElement('strong', { key: 'emergencias-label' }, 'Emergencias:'),
          React.createElement('br', { key: 'emergencias-br' }),
          emergencyInfo.emergencias
        ]),
        React.createElement('p', {
          key: 'cost',
          className: "text-sm text-red-100 mt-4"
        }, `Costo rescate: ${emergencyInfo.rescueCost}`)
      ]),
      React.createElement('div', {
        key: 'emergency-buttons',
        className: "flex space-x-3 mt-6"
      }, [
        React.createElement('button', {
          key: 'call-btn',
          onClick: () => window.open(`tel:${emergencyInfo.conaf}`),
          className: "flex-1 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all duration-300"
        }, [
          React.createElement(Phone, {
            key: 'phone-icon',
            className: "w-5 h-5 mx-auto mb-1"
          }),
          'Llamar Rescate'
        ]),
        React.createElement('button', {
          key: 'close-btn',
          onClick: () => setEmergencyMode(false),
          className: "px-6 py-3 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-all duration-300"
        }, 'Cerrar')
      ])
    ])),

    // Navigation
    React.createElement('nav', {
      key: 'navigation',
      className: "fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 z-30 safe-area-bottom"
    }, React.createElement('div', {
      className: "flex justify-around items-center py-1 sm:py-2 px-1"
    }, [
      { id: 'dashboard', icon: Home, label: 'Inicio' },
      { id: 'map', icon: Map, label: 'Mapa' },
      { id: 'planning', icon: Calendar, label: 'Plan' },
      { id: 'gear', icon: Backpack, label: 'Equipos' },
      { id: 'budget', icon: DollarSign, label: 'Presupuesto' },
      { id: 'menu', icon: Utensils, label: 'Menú' }
    ].map(item =>
      React.createElement('button', {
        key: item.id,
        onClick: () => {
          setActiveView(item.id);
          if (window.hapticFeedback) window.hapticFeedback('light');
        },
        className: `flex flex-col items-center space-y-0.5 sm:space-y-1 p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
          activeView === item.id
            ? 'text-blue-400 bg-blue-500/20'
            : 'text-gray-400 hover:text-white'
        }`
      }, [
        React.createElement(item.icon, {
          key: 'nav-icon',
          className: "w-5 h-5 sm:w-6 sm:h-6"
        }),
        React.createElement('span', {
          key: 'nav-label',
          className: "text-[10px] sm:text-xs"
        }, item.label)
      ])
    ))),

    // Main Content
    React.createElement('main', {
      key: 'main-content',
      className: "p-3 sm:p-4 pb-20 sm:pb-24"
    }, (() => {
      switch(activeView) {
        case 'dashboard':
          return React.createElement('div', {
            className: "space-y-6"
          }, [
            // Hero Stats
            React.createElement('div', {
              key: 'hero-stats',
              className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
            }, [
              React.createElement('div', {
                key: 'hero-header',
                className: "text-center mb-4 sm:mb-6"
              }, [
                React.createElement('h1', {
                  key: 'app-title',
                  className: "text-2xl sm:text-3xl font-bold text-white mb-2"
                }, 'Torres del Paine'),
                React.createElement('p', {
                  key: 'app-subtitle',
                  className: "text-sm sm:text-base text-blue-200"
                }, 'Circuito O - Guía Completa 2025')
              ]),

              React.createElement('div', {
                key: 'stats-grid',
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
              }, [
                React.createElement('div', {
                  key: 'distance',
                  className: "text-center"
                }, [
                  React.createElement('div', {
                    key: 'distance-value',
                    className: "text-2xl font-bold text-blue-400"
                  }, `${circuitData.totalDistance}km`),
                  React.createElement('div', {
                    key: 'distance-label',
                    className: "text-sm text-gray-300"
                  }, 'Distancia Total')
                ]),
                React.createElement('div', {
                  key: 'days',
                  className: "text-center"
                }, [
                  React.createElement('div', {
                    key: 'days-value',
                    className: "text-2xl font-bold text-green-400"
                  }, circuitData.totalDays),
                  React.createElement('div', {
                    key: 'days-label',
                    className: "text-sm text-gray-300"
                  }, 'Días')
                ]),
                React.createElement('div', {
                  key: 'walking',
                  className: "text-center"
                }, [
                  React.createElement('div', {
                    key: 'walking-value',
                    className: "text-2xl font-bold text-yellow-400"
                  }, `${circuitData.walkingHours}h`),
                  React.createElement('div', {
                    key: 'walking-label',
                    className: "text-sm text-gray-300"
                  }, 'Caminata')
                ]),
                React.createElement('div', {
                  key: 'height',
                  className: "text-center"
                }, [
                  React.createElement('div', {
                    key: 'height-value',
                    className: "text-2xl font-bold text-red-400"
                  }, circuitData.highestPoint),
                  React.createElement('div', {
                    key: 'height-label',
                    className: "text-sm text-gray-300"
                  }, 'Punto Máximo')
                ])
              ])
            ]),

            // Weather Widget
            React.createElement('div', {
              key: 'weather-widget',
              className: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30"
            }, React.createElement('div', {
              className: "flex items-center justify-between"
            }, [
              React.createElement('div', { key: 'weather-left' }, [
                React.createElement('div', {
                  key: 'temp-row',
                  className: "flex items-center space-x-2 mb-1"
                }, [
                  React.createElement(Thermometer, {
                    key: 'temp-icon',
                    className: "w-5 h-5 text-blue-300"
                  }),
                  React.createElement('span', {
                    key: 'temp-value',
                    className: "text-xl font-bold text-white"
                  }, `${weather.temp}°C`)
                ]),
                React.createElement('div', {
                  key: 'wind-row',
                  className: "flex items-center space-x-2"
                }, [
                  React.createElement(Wind, {
                    key: 'wind-icon',
                    className: "w-4 h-4 text-gray-300"
                  }),
                  React.createElement('span', {
                    key: 'wind-value',
                    className: "text-sm text-gray-300"
                  }, `${weather.wind} km/h`)
                ])
              ]),
              React.createElement('div', {
                key: 'weather-right',
                className: "text-right"
              }, [
                React.createElement('div', {
                  key: 'weather-emoji',
                  className: "text-2xl mb-1"
                }, '💨'),
                React.createElement('span', {
                  key: 'weather-status',
                  className: "text-xs text-blue-200"
                }, 'Tiempo actual')
              ])
            ])),

            // Current Day Info
            React.createElement(DayDetails, {
              key: 'current-day',
              day: currentDay
            })
          ]);
        
        case 'map':
          return React.createElement('div', {
            className: "space-y-6"
          }, [
            React.createElement('div', {
              key: 'map-container',
              className: "bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10"
            }, [
              React.createElement('h2', {
                key: 'map-title',
                className: "text-xl sm:text-2xl font-bold text-white mb-4"
              }, '🗺️ Mapa Interactivo del Circuito'),
              React.createElement(InteractiveMap, { key: 'interactive-map' }),

              // Day selector
              React.createElement('div', {
                key: 'day-selector',
                className: "grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4 sm:mt-6"
              }, circuitDays.map(day =>
                React.createElement('button', {
                  key: day.day,
                  onClick: () => {
                    setCurrentDay(day.day);
                    if (window.hapticFeedback) window.hapticFeedback('light');
                  },
                  className: `p-2 rounded-lg text-center transition-all duration-300 ${
                    currentDay === day.day
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`
                }, [
                  React.createElement('div', {
                    key: 'day-number',
                    className: "font-bold"
                  }, `D${day.day}`),
                  React.createElement('div', {
                    key: 'day-location',
                    className: "text-xs"
                  }, day.location)
                ])
              ))
            ]),
            
            React.createElement(DayDetails, {
              key: 'map-day-details',
              day: currentDay
            })
          ]);
        
        case 'planning':
          return React.createElement(PlanningPhaseView, { key: 'planning-view' });
        case 'gear':
          return React.createElement(GearListView, { key: 'gear-view' });
        case 'budget':
          return React.createElement(BudgetCalculator, { key: 'budget-view' });
        case 'menu':
          return React.createElement(MenuView, { key: 'menu-view' });
        default:
          return React.createElement('div', {
            key: 'default-view',
            className: "text-white text-center"
          }, 'Vista no encontrada');
      }
    })()),

    // Emergency Button
    React.createElement('button', {
      key: 'emergency-button',
      onClick: () => {
        setEmergencyMode(!emergencyMode);
        if (window.hapticFeedback) window.hapticFeedback('heavy');
      },
      className: "fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-full shadow-lg border-2 border-red-500 hover:bg-red-500 transition-all duration-300 flex items-center justify-center"
    }, React.createElement(AlertTriangle, {
      className: "w-7 h-7 sm:w-8 sm:h-8 text-white"
    }))
  ]);
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TorresPaineCompleteApp));