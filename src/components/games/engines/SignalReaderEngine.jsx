import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SignalReaderEngine({ data, onUpdateLuno, preferences }) {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(0);
  const [velocidad, setVelocidad] = useState('1x');
  const [capaSeleccionada, setCapaSeleccionada] = useState(null);
  const [revelado, setRevelado] = useState(false);
  const [mostrandoResumenBloque, setMostrandoResumenBloque] = useState(false);
  const [completado, setCompletado] = useState(false);
  const videoRef = useRef(null);

  const pasos = data.steps || [];
  const paso = pasos[pasoActual] || pasos[0];
  const bloques = data.blocks || [];

  const bloqueActualInfo = bloques.find(b => b.blockId === paso.block) || bloques[0];

  // Configuración de los 5 Bloques con colores vivos, fuertes y de gran presencia
  const getBlockTheme = (blockId) => {
    switch(blockId) {
      case 1: // Bloque I: Terracota / Naranja Vivo
        return { 
          accent: 'text-orange-700 font-bold', 
          border: 'border-orange-500', 
          bgBtn: 'bg-orange-600 hover:bg-orange-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(234,88,12,0.3)]', 
          gradientBg: 'from-[#FFF4ED] via-[#FFE5D6] to-[#FFD4BD]',
          glow1: 'bg-orange-500/20', glow2: 'bg-amber-500/15', dotColor: 'bg-orange-600'
        };
      case 2: // Bloque II: Esmeralda / Menta Fresca
        return { 
          accent: 'text-emerald-800 font-bold', 
          border: 'border-emerald-600', 
          bgBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(5,150,105,0.3)]', 
          gradientBg: 'from-[#EDFDF5] via-[#D1FAE5] to-[#A7F3D0]',
          glow1: 'bg-emerald-500/20', glow2: 'bg-teal-500/15', dotColor: 'bg-emerald-600'
        };
      case 3: // Bloque III: Púrpura / Lavanda Elegante
        return { 
          accent: 'text-purple-800 font-bold', 
          border: 'border-purple-600', 
          bgBtn: 'bg-purple-600 hover:bg-purple-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(147,51,234,0.3)]', 
          gradientBg: 'from-[#FDF4FF] via-[#F3E8FF] to-[#E9D5FF]',
          glow1: 'bg-purple-500/20', glow2: 'bg-indigo-500/15', dotColor: 'bg-purple-600'
        };
      case 4: // Bloque IV: Cían / Azul Profundo Luminoso
        return { 
          accent: 'text-cyan-800 font-bold', 
          border: 'border-cyan-600', 
          bgBtn: 'bg-cyan-600 hover:bg-cyan-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(8,145,178,0.3)]', 
          gradientBg: 'from-[#ECFEFF] via-[#CFFAFE] to-[#A5F3FC]',
          glow1: 'bg-cyan-500/20', glow2: 'bg-sky-500/15', dotColor: 'bg-cyan-600'
        };
      case 5: // Bloque V: Ámbar Dorado / Sol Maestría
        return { 
          accent: 'text-amber-800 font-bold', 
          border: 'border-amber-600', 
          bgBtn: 'bg-amber-600 hover:bg-amber-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(217,119,6,0.3)]', 
          gradientBg: 'from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
          glow1: 'bg-amber-500/20', glow2: 'bg-yellow-500/15', dotColor: 'bg-amber-600'
        };
      default: 
        return { 
          accent: 'text-orange-700 font-bold', 
          border: 'border-orange-500', 
          bgBtn: 'bg-orange-600 hover:bg-orange-700 text-white font-bold', 
          shadow: 'shadow-[0_10px_30px_rgba(234,88,12,0.3)]', 
          gradientBg: 'from-[#FFF4ED] via-[#FFE5D6] to-[#FFD4BD]',
          glow1: 'bg-orange-500/20', glow2: 'bg-amber-500/15', dotColor: 'bg-orange-600'
        };
    }
  };

  const theme = getBlockTheme(paso.block);

  const handleVelocidadChange = (vel) => {
    setVelocidad(vel);
    if (videoRef.current) {
      videoRef.current.playbackRate = vel === '0.5x' ? 0.5 : 1.0;
    }
  };

  const handleSeleccionCapa = (index) => {
    if (revelado) return;
    setCapaSeleccionada(index);
  };

  const confirmarLectura = () => {
    if (capaSeleccionada === null || revelado) return;
    setRevelado(true);

    const esCorrecto = paso.options[capaSeleccionada].correct;
    if (esCorrecto) {
      onUpdateLuno({ pose: 'contento', text: '¡Lectura precisa! Has identificado correctamente el estado.' });
    } else {
      onUpdateLuno({ pose: 'alerta', text: 'Atención a los detalles. Analicemos el desglose de Luno.' });
    }
  };

  const siguienteEstacion = () => {
    setCapaSeleccionada(null);
    setRevelado(false);
    setVelocidad('1x');

    const siguienteIndex = pasoActual + 1;

    if (siguienteIndex < pasos.length) {
      const pasoSiguiente = pasos[siguienteIndex];
      if (pasoSiguiente.block !== paso.block) {
        setMostrandoResumenBloque(true);
      } else {
        setPasoActual(siguienteIndex);
      }
      onUpdateLuno({ pose: 'neutro', text: 'Nuevo caso en el visor. Observa el contexto.' });
    } else {
      setCompletado(true);
      onUpdateLuno({ pose: 'celebrando', text: '¡Entrenamiento etológico concluido con éxito!' });
    }
  };

  const continuarDespuesDelResumen = () => {
    setMostrandoResumenBloque(false);
    setPasoActual(prev => prev + 1);
  };

  // 1. Pantalla de Mentoría de Luno
  if (mostrandoResumenBloque) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-between p-6 md:p-16 overflow-hidden bg-black text-center"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
          <video 
            src="/videos/LunoGalery.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80 pointer-events-none" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 w-full max-w-2xl mx-auto pt-8"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-orange-400 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-bold">
            ✦ {bloqueActualInfo.blockTitle} Superado
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-xl w-full mx-auto flex flex-col items-center space-y-8 pb-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-md">
              Mentoría de Luno
            </h2>
            <p className="text-sm md:text-lg text-slate-100 font-light max-w-lg mx-auto leading-relaxed bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-r-2xl border-l-4 border-orange-500 shadow-2xl text-left">
              "{bloqueActualInfo.lunoSummary}"
            </p>
          </div>

          <button 
            onClick={continuarDespuesDelResumen}
            className="px-10 py-4 font-medium text-xs font-mono tracking-[0.2em] uppercase transition-all rounded-lg cursor-pointer bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 font-bold"
          >
            Avanzar al Siguiente Bloque ➔
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // 2. Pantalla Final del Juego
  if (completado) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-between p-6 md:p-16 overflow-hidden bg-black text-center"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
          <video 
            src="/videos/LunoGalery.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80 pointer-events-none" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 w-full max-w-2xl mx-auto pt-8"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-bold">
            ✦ ENTRENAMIENTO CONCLUIDO CON ÉXITO
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-xl w-full mx-auto flex flex-col items-center space-y-8 pb-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-md">
              {data.ending.title}
            </h2>
            <p className="text-sm md:text-lg text-slate-100 font-light max-w-lg mx-auto leading-relaxed bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-r-2xl border-l-4 border-emerald-400 shadow-2xl text-left">
              {data.ending.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button 
              onClick={() => { setPasoActual(0); setCompletado(false); setCapaSeleccionada(null); setRevelado(false); }}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 rounded-lg cursor-pointer"
            >
              Reiniciar Experiencia ↺
            </button>
            <button 
              onClick={() => navigate('/biblioteca')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all border border-slate-600 rounded-lg cursor-pointer hover:scale-105"
            >
              Volver a la Biblioteca ⌂
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // 3. Pantalla Interactiva con Fondos Claros y Dinámicos para 5 Bloques
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-between py-2 px-4 md:px-8 relative z-20 overflow-y-auto">
      
      {/* Fondo Ambiental Dinámico de Alta Presencia */}
      <div className={`fixed inset-0 bg-gradient-to-br ${theme.gradientBg} -z-20 pointer-events-none transition-all duration-700`} />
      <div className={`fixed top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] -z-10 pointer-events-none transition-all duration-700 ${theme.glow1}`} />
      <div className={`fixed bottom-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[140px] -z-10 pointer-events-none transition-all duration-700 ${theme.glow2}`} />

      {/* HUD Superior Limpio (Sin píldoras, puro texto tipográfico) */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-400/50 shrink-0 pt-3">
        <div className="flex items-center gap-3">
          <span className={`text-xs md:text-sm font-mono uppercase tracking-[0.25em] ${theme.accent}`}>
            {paso.tag}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-slate-900 font-bold">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${theme.dotColor}`} />
          <span>CASO 0{pasoActual + 1} / 0{pasos.length}</span>
        </div>
      </div>

      {/* Contenedor Interactivo con Transiciones Suaves */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={paso.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center flex-1 py-4 my-auto"
        >
          
          {/* Columna Izquierda: Visor Multimedia */}
          <div className="lg:col-span-7 flex flex-col space-y-3 justify-center">
            <div className={`bg-white/95 border-l-4 px-4 md:px-5 py-3 shadow-lg backdrop-blur-md rounded-r-xl ${theme.border}`}>
              <span className={`text-[11px] font-mono tracking-widest uppercase block mb-1 font-extrabold ${theme.accent}`}>Contexto del Entorno</span>
              <p className="text-xs md:text-sm text-slate-950 font-medium leading-relaxed">
                {paso.prompt}
              </p>
            </div>

            <div className="relative bg-slate-950 overflow-hidden border border-slate-400 aspect-[16/10] shadow-2xl flex items-center group w-full rounded-xl">
              {paso.type === 'video' && !preferences.reducedMotion ? (
                <video
                  ref={videoRef}
                  src={paso.media}
                  poster={paso.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover filter brightness-95"
                />
              ) : (
                <img 
                  src={paso.media} 
                  alt={paso.alt} 
                  className="w-full h-full object-cover filter brightness-95"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {paso.type === 'video' && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 border border-slate-700 text-[10px] font-mono text-slate-100 z-10 shadow-xl rounded-md font-semibold">
                  <span className="text-slate-300 mr-1">VEL:</span>
                  {['0.5x', '1x'].map((vel) => (
                    <button
                      key={vel}
                      onClick={() => handleVelocidadChange(vel)}
                      className={`px-1.5 py-0.5 transition-all cursor-pointer rounded ${velocidad === vel ? 'bg-white text-slate-950 font-bold' : 'hover:text-white'}`}
                    >
                      {vel}
                    </button>
                  ))}
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] md:text-xs font-mono text-white/90 bg-slate-900/90 px-3 py-2 border border-slate-700 pointer-events-none shadow-xl rounded-md font-semibold">
                <span className="text-cyan-300">🔍 VISOR HD</span>
                <span className="text-amber-300">{paso.type === 'video' ? 'LOOP ACTIVO' : 'ESTÁTICO'}</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Panel de Decisión Táctica */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 md:space-y-6">
            <div className="space-y-3">
              <span className={`text-xs md:text-sm font-mono tracking-[0.2em] uppercase block font-extrabold ${theme.accent}`}>
                Panel de Decisión Táctica
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-slate-950 font-bold leading-snug">
                ¿Qué categoría de comunicación predomina en este micro-gesto?
              </h3>

              <div className="space-y-3 pt-1">
                {paso.options.map((opt, index) => {
                  const estaSeleccionado = capaSeleccionada === index;

                  let estiloBloque = "bg-white/95 border-slate-300 text-slate-950 hover:border-slate-500 hover:bg-white shadow-md font-medium";
                  
                  if (revelado) {
                    if (opt.correct) {
                      estiloBloque = "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[0_4px_20px_rgba(16,185,129,0.2)] font-bold";
                    } else if (estaSeleccionado && !opt.correct) {
                      estiloBloque = "bg-rose-100 border-rose-500 text-rose-950 font-bold";
                    } else {
                      estiloBloque = "bg-white/40 border-slate-200 text-slate-400 opacity-40";
                    }
                  } else if (estaSeleccionado) {
                    estiloBloque = `bg-white border-2 ${theme.border} text-slate-950 shadow-lg ring-2 ring-slate-300 font-bold`;
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={revelado}
                      onClick={() => handleSeleccionCapa(index)}
                      className={`w-full text-left p-4 md:p-4.5 border transition-all duration-300 flex items-center justify-between group cursor-pointer backdrop-blur-md rounded-xl ${estiloBloque}`}
                    >
                      <span className="text-xs md:text-sm leading-snug pr-3">{opt.label}</span>
                      <span className={`w-6 h-6 bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] font-mono shrink-0 rounded-md text-slate-900 font-extrabold`}>
                        0{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {!revelado ? (
                <button
                  disabled={capaSeleccionada === null}
                  onClick={confirmarLectura}
                  className={`w-full py-4 text-xs md:text-sm font-mono font-bold tracking-[0.2em] uppercase transition-all shadow-xl rounded-xl ${capaSeleccionada !== null ? `${theme.bgBtn} scale-[1.01] cursor-pointer${theme.shadow}` : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'}`}
                >
                  Confirmar Análisis Táctico ➔
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 md:p-5 bg-white/95 border-l-4 space-y-3 shadow-xl backdrop-blur-md rounded-r-xl ${theme.border}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs md:text-sm font-bold ${theme.accent}`}>✦ Desglose Etológico de Luno</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-900 font-medium leading-relaxed">
                    {paso.feedback.why}
                  </p>
                  <button
                    onClick={siguienteEstacion}
                    className={`w-full mt-2 py-3.5 font-bold text-xs md:text-sm font-mono tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer rounded-xl ${theme.bgBtn}`}
                  >
                    {pasoActual < pasos.length - 1 ? 'Siguiente Estación ➔' : 'Ver Cierre del Módulo ➔'}
                  </button>
                </motion.div>
              )}
            </div>

          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}