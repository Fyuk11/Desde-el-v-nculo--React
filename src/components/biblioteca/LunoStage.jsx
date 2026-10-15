import { useState } from 'react';

const IMAGEN_DIAGNOSTICO_FINAL = '/images/biblioteca/luno/Paso04.webp';

const PASOS_LUNO = [
  {
    paso: 1,
    fase: '01',
    tituloEntorno: 'Observación Visual y Foco',
    pregunta: '¿Cómo reacciona tu perro cuando divisa un estímulo a la distancia?',
    accent: '#78B092',
    accentRgb: '120, 176, 146',
    bgImage: '/images/biblioteca/luno/Paso01.webp',
    opciones: [
      { id: 'p1_1', texto: 'Fija la mirada inmóvil y tensiona toda su musculatura.' },
      { id: 'p1_2', texto: 'Lame sus labios, bosteza o gira la cabeza buscando desviar la mirada.' },
      { id: 'p1_3', texto: 'Reacciona de inmediato: ladra o busca abalanzarse sin señales previas.' }
    ]
  },
  {
    paso: 2,
    fase: '02',
    tituloEntorno: 'Dinámica Urbana',
    pregunta: '¿Cuál es la tensión predominante durante el recorrido en la calle?',
    accent: '#8BA1B5',
    accentRgb: '139, 161, 181',
    bgImage: '/images/biblioteca/luno/Paso02.webp',
    opciones: [
      { id: 'p2_1', texto: 'Tironeo constante de correa buscando avanzar a ritmo acelerado.' },
      { id: 'p2_2', texto: 'Hipervigilancia: explora el entorno con alerta continua a ruidos o movimientos.' },
      { id: 'p2_3', texto: 'Inseguridad o bloqueo: se frena o busca refugio cerca de tus piernas.' }
    ]
  },
  {
    paso: 3,
    fase: '03',
    tituloEntorno: 'Estado en la Convivencia',
    pregunta: '¿Cómo se manifiesta su estado emocional en los momentos de transición en el hogar?',
    accent: '#C49A6C',
    accentRgb: '196, 154, 108',
    bgImage: '/images/biblioteca/luno/Paso03.webp',
    opciones: [
      { id: 'p3_1', texto: 'Excitación elevada y dificultad para pausarse antes de salir o al volver.' },
      { id: 'p3_2', texto: 'Inquietud constante: le cuesta encontrar un lugar de descanso profundo.' },
      { id: 'p3_3', texto: 'Logra calma dentro de casa, pero el espacio exterior transforma su estado.' }
    ]
  }
];

export default function LunoStage({ onSelectJuego }) {
  const [pasoIndice, setPasoIndice] = useState(0);
  const [animando, setAnimando] = useState(false);

  const pasoActual = PASOS_LUNO[pasoIndice];
  const esFinal = pasoIndice >= PASOS_LUNO.length;

  const seleccionarOpcion = () => {
    setAnimando(true);
    setTimeout(() => {
      setPasoIndice((prev) => prev + 1);
      setAnimando(false);
    }, 280);
  };

  const reiniciar = () => {
    setAnimando(true);
    setTimeout(() => {
      setPasoIndice(0);
      setAnimando(false);
    }, 280);
  };

  const currentRgb = !esFinal ? pasoActual.accentRgb : '120, 176, 146';
  const currentAccent = !esFinal ? pasoActual.accent : '#78B092';
  const currentBgImage = !esFinal ? pasoActual.bgImage : IMAGEN_DIAGNOSTICO_FINAL;

  return (
    <section className="w-full relative my-8 border-y border-[#1F2421] overflow-hidden bg-[#0A0B0A] min-h-[640px] flex items-center transition-colors duration-700">
      
      {/* 1. FOTOGRAFÍA HD ALINEADA DESDE ARRIBA (object-top) Y CON MÁS ESPACIO */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-out">
        <img 
          src={currentBgImage} 
          alt="Escenario Luno" 
          className="w-full h-full object-cover object-top md:object-right-top opacity-90 transition-all duration-1000"
        />
        
        {/* Degradado lateral izquierdo exclusivo para la lectura del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0A] via-[#0A0B0A]/80 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0A] via-transparent to-[#0A0B0A]/20 pointer-events-none" />
      </div>

      {/* 2. LUZ AMBIENTAL DE FONDO */}
      <div 
        className="absolute top-1/2 -left-32 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 blur-[130px] transition-all duration-1000 opacity-50"
        style={{
          background: `radial-gradient(circle, rgba(${currentRgb}, 0.6) 0%, transparent 70%)`
        }}
      />

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2 h-2 rounded-none transition-all duration-700"
              style={{ 
                backgroundColor: currentAccent,
                boxShadow: `0 0 10px ${currentAccent}` 
              }}
            />
            <span className="text-xs font-mono tracking-widest text-stone-300 uppercase">
              Luno <span className="text-stone-500 font-sans tracking-normal ml-1">// Observación Etológica</span>
            </span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {!esFinal ? (
              <span className="text-xs font-mono tracking-widest text-stone-300">
                PASO <strong className="text-white">{pasoActual.fase}</strong> <span className="text-stone-600">/ 03</span>
              </span>
            ) : (
              <span className="text-xs font-mono tracking-widest text-[#78B092] font-semibold">
                DIAGNÓSTICO FINAL
              </span>
            )}

            {(pasoIndice > 0 || esFinal) && (
              <button
                onClick={reiniciar}
                className="text-xs font-mono text-stone-400 hover:text-white bg-black/40 border border-stone-800 hover:border-stone-500 px-3 py-1 transition-all flex items-center gap-1.5 backdrop-blur-sm"
              >
                <span>↺</span>
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>

        {/* CUBIERTA TRANSICIONABLE */}
        <div className={`transition-all duration-300 ${animando ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          
          {!esFinal ? (
            /* PREGUNTAS (PASOS 1, 2 Y 3) */
            <div className="max-w-xl space-y-6">
              
              <div className="space-y-1.5">
                <span 
                  className="text-[11px] font-mono tracking-widest uppercase block transition-colors duration-500 font-semibold"
                  style={{ color: pasoActual.accent }}
                >
                  {pasoActual.tituloEntorno}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-100 leading-snug">
                  "{pasoActual.pregunta}"
                </h3>
              </div>

              {/* Opciones con Glassmorphism */}
              <div className="space-y-2.5 pt-1">
                {pasoActual.opciones.map((opcion, index) => (
                  <button
                    key={opcion.id}
                    onClick={seleccionarOpcion}
                    className="w-full text-left p-4 bg-[#0A0B0A]/80 hover:bg-[#121614] border border-white/10 hover:border-white/35 transition-all duration-250 flex items-start gap-4 group backdrop-blur-md rounded-none"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 18px rgba(${pasoActual.accentRgb}, 0.2)`;
                      e.currentTarget.style.borderColor = pasoActual.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <span className="text-xs font-mono text-stone-500 group-hover:text-stone-300 transition-colors pt-0.5">
                      0{index + 1}
                    </span>
                    <span className="text-xs md:text-sm text-stone-300 font-light group-hover:text-stone-100 leading-relaxed transition-colors flex-1">
                      {opcion.texto}
                    </span>
                    <span className="text-stone-500 group-hover:text-stone-200 transition-colors text-xs pt-0.5">
                      →
                    </span>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* DIAGNÓSTICO FINAL */
            <div className="max-w-5xl space-y-10 py-2">
              
              <div className="space-y-2.5 max-w-2xl">
                <span className="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-[#78B092] bg-[#78B092]/10 border border-[#78B092]/30">
                  ✓ Lectura Completada
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-stone-100">
                  Plan Sugerido de Abordaje Vincular
                </h2>
                <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed">
                  Con base en tus observaciones, recomendamos comenzar entrenando la lectura fina de micro-tensiones en un entorno controlado antes de aumentar la exigencia en la vía pública.
                </p>
              </div>

              {/* Grid de las 2 Recomendaciones Flotantes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Recomendación Práctica */}
                <div className="bg-[#0A0B0A]/85 border border-[#78B092]/40 p-6 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-[#78B092] transition-colors">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#78B092] tracking-wider uppercase font-semibold">
                      01. Recomendación Práctica
                    </span>
                    <h3 className="text-lg font-serif text-stone-100">
                      ¿Qué me está diciendo?
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      Ejercicio interactivo en simulador para aprender a identificar el segundo exacto donde inicia la tensión corporal.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectJuego('juego-1', 'arcade')}
                    className="w-full py-3 bg-[#78B092] hover:bg-[#649A7E] text-[#0A0B0A] text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    Ir al ejercicio interactivo →
                  </button>
                </div>

                {/* Recomendación Teórica */}
                <div className="bg-[#0A0B0A]/85 border border-amber-500/40 p-6 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-amber-500/80 transition-colors">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-amber-400 tracking-wider uppercase font-semibold">
                      02. Material Teórico
                    </span>
                    <h3 className="text-lg font-serif text-stone-100">
                      Guía de Señales & Comunicación
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      Manual de campo detallado en PDF para comprender en profundidad el lenguaje corporal no verbal.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectJuego('pdf-1', 'guias')}
                    className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    Consultar Guía PDF →
                  </button>
                </div>

              </div>

              {/* Pie con botón de reinicio */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-stone-400">
                  ¿Quieres evaluar otro escenario o cambiar tus respuestas?
                </span>
                <button
                  onClick={reiniciar}
                  className="px-5 py-2 bg-[#1A1E1C] hover:bg-[#242A27] text-stone-200 border border-stone-700 hover:border-stone-400 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <span>↺</span>
                  <span>Realizar nueva consulta</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}