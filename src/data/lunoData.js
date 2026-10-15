// Base de datos integrada para Luno AI: Diagnóstico + Mini-juegos

export const ETAPAS_CANINAS = [
  {
    id: 'cachorro',
    title: 'Cachorro (0 a 6 meses)',
    subtitle: 'Impronta, hábitos de descanso, apego seguro y socialización temprana.',
    icon: '🐶',
    productoRecomendado: {
      nombre: 'Curso Educando Desde el Vínculo',
      subtitulo: 'Especial Bases y Prevención en Cachorros',
      descripcion: 'Aprenderás a construir un apego seguro, estructurar la rutina de descanso y prevenir problemas de reactividad o mordida.',
      link: '/#programas',
      badge: 'Recomendado para Cachorros',
      ctaText: 'Ver Programa de Cachorros'
    }
  },
  {
    id: 'adolescente',
    title: 'Adolescente (6 a 24 meses)',
    subtitle: 'Exploración, cambios hormonales, gestión de límites e impulsividad.',
    icon: '🐕',
    productoRecomendado: {
      nombre: 'Guía Integral de Adolescencia Canina',
      descripcion: 'Estrategias neurobiológicas para acompañar el pico de exploración, paseos sin tirones y autorregulación emocional.',
      link: '/#programas',
      badge: 'Especializado en Adolescencia',
      ctaText: 'Ver Guía de Adolescencia'
    }
  },
  {
    id: 'adulto_senior',
    title: 'Adulto o Senior (2+ años)',
    subtitle: 'Convivencia consolidada, gestión de estrés acumulado y bienestar integral.',
    icon: '🐩',
    productoRecomendado: {
      nombre: 'Consultoría Individual o Formación Sistémica',
      descripcion: 'Abordaje personalizado para reestructurar dinámicas de estrés, reactividad o cambios de conducta en la madurez.',
      link: '/#programas',
      badge: 'Atención Individual / Sistémica',
      ctaText: 'Ver Opciones de Consultoría'
    }
  }
];

// Preguntas específicas para el DIAGNÓSTICO según la etapa elegida
export const DIAGNOSTICO_PREGUNTAS = {
  cachorro: [
    {
      id: 'descanso',
      pregunta: "¿Cuántas horas duerme o descansa profundamente al día?",
      opciones: [
        { label: "Menos de 14 horas (Parece no apagarse nunca)", valor: 'alto_estres' },
        { label: "Entre 14 y 18 horas (Le cuesta conciliar en ruidos)", valor: 'medio_estres' },
        { label: "Más de 18 horas (Descansa tranquilo en su espacio)", valor: 'optimo' }
      ]
    },
    {
      id: 'mordida',
      pregunta: "Durante el juego o interacción, ¿cómo gestiona la mordida?",
      opciones: [
        { label: "Muerde fuerte tobillos/manos y se sobreexcita rápido", valor: 'alto_estres' },
        { label: "Muerde suave pero le cuesta parar cuando se entusiasma", valor: 'medio_estres' },
        { label: "Suele redirigir a juguetes o frena si se le indica", valor: 'optimo' }
      ]
    }
  ],
  adolescente: [
    {
      id: 'paseo',
      pregunta: "¿Cómo experimenta la correa y los paseos en la calle?",
      opciones: [
        { label: "Tira constantemente con fuerza y se frena jadeando", valor: 'alto_estres' },
        { label: "Tira a ratos cuando ve estímulos de interés", valor: 'medio_estres' },
        { label: "Camina con correa floja y explora oliendo tranquilamente", valor: 'optimo' }
      ]
    },
    {
      id: 'reactividad',
      pregunta: "Al ver a otros perros o personas a lo lejos, ¿cuál es su reacción?",
      opciones: [
        { label: "Se abalanza, ladra o se bloquea de forma intensa", valor: 'alto_estres' },
        { label: "Se fija intensamente pero se le puede redirigir", valor: 'medio_estres' },
        { label: "Observa con calma y continúa su camino", valor: 'optimo' }
      ]
    }
  ],
  adulto_senior: [
    {
      id: 'rutina',
      pregunta: "¿Cómo responde ante cambios en la rutina diaria del hogar?",
      opciones: [
        { label: "Muestra ansiedad, jadeo o deambula continuamente", valor: 'alto_estres' },
        { label: "Le toma un rato acomodarse pero luego se calma", valor: 'medio_estres' },
        { label: "Se adapta con tranquilidad a los cambios", valor: 'optimo' }
      ]
    },
    {
      id: 'convivencia',
      pregunta: "¿Cómo gestiona sus espacios de descanso o comida ante las visitas?",
      opciones: [
        { label: "Protege recursos (gruñe o se pone rígido)", valor: 'alto_estres' },
        { label: "Se muestra inquieto y vigila el entorno", valor: 'medio_estres' },
        { label: "Se retira calmadamente a su zona segura", valor: 'optimo' }
      ]
    }
  ]
};

// MINI-JUEGOS INDEPENDIENTES (Para la sección Arcade inferior)

// Mini-Juego 1: Lectura Corporal y Señales
export const GAME_SENALES = [
  {
    id: 1,
    titulo: "Lamiendo el Hocico (Lip Lick)",
    mediaUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
    situacion: "Tu perro se lame el hocico de forma rápida y repetida sin que haya comida cerca mientras lo abrazas.",
    pregunta: "¿Qué está intentando comunicar?",
    opciones: [
      { texto: "Tiene hambre o ganas de un premio", correcta: false, explicacion: "En contextos sociales sin comida, rara vez es hambre." },
      { texto: "Señal de apaciguamiento / Pide un poco de espacio", correcta: true, explicacion: "¡Correcto! El lamiéndose el hocico es una señal sutil para autorregularse y pedir reducir la presión." },
      { texto: "Está demostrando que le encanta el abrazo", correcta: false, explicacion: "La mayoría de los perros se sienten restringidos con abrazos estrechos." }
    ]
  },
  {
    id: 2,
    titulo: "Mirada de Reojo (Whale Eye)",
    mediaUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    situacion: "Al acercarte a su cama, notas que el perro mantiene la cabeza fija y deja ver la parte blanca de su ojo.",
    pregunta: "¿Cuál es la interpretación adecuada?",
    opciones: [
      { texto: "Incomodidad / Advertencia de espacio", correcta: true, explicacion: "¡Excelente lectura! La 'ojo de ballena' muestra tensión e incomodidad ante la cercanía." },
      { texto: "Juego o curiosidad", correcta: false, explicacion: "La mirada de reojo con cuerpo rígido no es una invitación al juego." },
      { texto: "Cansancio o sueño", correcta: false, explicacion: "El cuerpo suele estar rígido, no relajado." }
    ]
  }
];

// Mini-Juego 2: Verdadero o Falso sobre Mitos Caninos
export const GAME_MITOS = [
  {
    id: 1,
    afirmacion: "Si un perro destruye cosas cuando se queda solo, lo hace por venganza o despecho.",
    respuestaCorrecta: false,
    explicacion: "Falso. Los perros no operan desde el despecho. La destrucción suele ser una vía de descarga por ansiedad, aburrimiento o falta de masticación adecuada."
  },
  {
    id: 2,
    afirmacion: "Dejar que tu perro huela todo lo que quiera en el paseo ayuda a reducir sus niveles de estrés.",
    respuestaCorrecta: true,
    explicacion: "Verdadero. El olfato activa el sistema parasimpático, ralentiza el ritmo cardíaco y libera dopamina, siendo la mejor herramienta de estimulación cognitiva."
  },
  {
    id: 3,
    afirmacion: "Un perro feliz es aquel que siempre está saltando y con la energía al 100%.",
    respuestaCorrecta: false,
    explicacion: "Falso. La hiperactividad constante suele ser síntoma de sobreestimulación o falta de descanso. El verdadero bienestar se refleja en un perro con capacidad de calma."
  }
];