import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function TacticalSliderEngine({ data, onUpdateLuno, preferences }) {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(0);
  const [seleccionIndex, setSeleccionIndex] = useState(1);
  const [revelado, setRevelado] = useState(false);
  const [mostrandoResumenBloque, setMostrandoResumenBloque] = useState(false);
  const [completado, setCompletado] = useState(false);

  const pasos = data.steps || [];
  const paso = pasos[pasoActual] || pasos[0];
  const bloques = data.blocks || [];
  const bloqueActualInfo = bloques.find(b => b.blockId === paso.block) || bloques[0];

  // Temas visuales limpios y editoriales
  const getTheme = (blockId) => {
    switch(blockId) {
      case 1: return { bg: 'from-[#141210] via-[#0D0B0A] to-[#080706]', accent: 'text-amber-400', border: 'border-amber-500/50', tagBg: 'bg-amber-950/80 border-amber-500/50 text-amber-300', btn: 'bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold' };
      case 2: return { bg: 'from-[#0D131D] via-[#090D14] to-[#05070B]', accent: 'text-blue-400', border: 'border-blue-500/50', tagBg: 'bg-blue-950/80 border-blue-500/50 text-blue-300', btn: 'bg-blue-500 text-slate-950 hover:bg-blue-400 font-bold' };
      case 3: return { bg: 'from-[#12101D] via-[#0C0A14] to-[#07060B]', accent: 'text-indigo-400', border: 'border-indigo-500/50', tagBg: 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300', btn: 'bg-indigo-500 text-slate-950 hover:bg-indigo-400 font-bold' };
      case 4: return { bg: 'from-[#0D1818] via-[#091010] to-[#050808]', accent: 'text-teal-400', border: 'border-teal-500/50', tagBg: 'bg-teal-950/80 border-teal-500/50 text-teal-300', btn: 'bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold' };
      case 5: return { bg: 'from-[#0D1813] via-[#08100C] to-[#040806]', accent: 'text-emerald-400', border: 'border-emerald-500/50', tagBg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300', btn: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold' };
      default: return { bg: 'from-[#0F172A] via-[#090D16] to-[#04060A]', accent: 'text-cyan-400', border: 'border-cyan-500/50', tagBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300', btn: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold' };
    }
  };

  const theme = getTheme(paso.block);
  const opcionActual = paso.options[seleccionIndex] || paso.options[0];

  const confirmarAccion = () => {
    if (revelado) return;
    setRevelado(true);

    if (opcionActual.correct) {
      onUpdateLuno({ pose: 'contento', text: '¡Maniobra ejecutada con absoluta precisión táctica!' });
    } else {
      onUpdateLuno({ pose: 'alerta', text: 'Respuesta desequilibrada. Analicemos la corrección de Luno.' });
    }
  };

  const siguienteNodo = () => {
    setSeleccionIndex(1);
    setRevelado(false);

    const siguienteIndex = pasoActual + 1;

    if (siguienteIndex < pasos.length) {
      const pasoSiguiente = pasos[siguienteIndex];
      if (pasoSiguiente.block !== paso.block) {
        setMostrandoResumenBloque(true);
      } else {
        setPasoActual(siguienteIndex);
      }
      onUpdateLuno({ pose: 'neutro', text: 'Nuevo nodo de tránsito activo en ruta.' });
    } else {
      setCompletado(true);
      onUpdateLuno({ pose: 'celebrando', text: '¡Simulador táctico completado!' });
    }
  };

  const continuarDespuesDelResumen = () => {
    setMostrandoResumenBloque(false);
    setPasoActual(prev => prev + 1);
  };

  const getShortLabel = (fullLabel) => {
    if (!fullLabel) return 'Opción';
    const words = fullLabel.split(' ');
    return words.slice(0, 3).join(' ') + '...';
  };

  const getFeedbackStyle = (opt, index) => {
    const estaSeleccionado = seleccionIndex === index;

    if (!revelado) {
      if (estaSeleccionado) {
        return 'bg-stone-900 border-2 border-slate-300 text-white shadow-lg font-bold';
      }
      return 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-600 font-medium';
    }

    if (opt.correct) {
      return 'bg-emerald-950/90 border-2 border-emerald-400 text-emerald-100 shadow-lg font-bold';
    } else if (estaSeleccionado) {
      return 'bg-rose-950/90 border-2 border-rose-500 text-rose-200 font-bold';
    } else {
      return 'bg-amber-950/30 border border-amber-800/40 text-amber-200/50 opacity-40';
    }
  };

  // 1. Pantalla de Mentoría Fullscreen
  if (mostrandoResumenBloque) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-40 w-screen h-screen flex flex-col items-center justify-between p-6 md:p-12 bg-black text-center overflow-hidden pt-28 md:pt-32 pb-8"
      >
        <video src="/videos/LunoGalery.mp4" autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover filter brightness-75 contrast-105 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-10 w-full">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold drop-shadow-md">
            [{bloqueActualInfo.blockTitle} Superado]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            Mentoría de Luno
          </h2>
          
          <div className="border-l-2 border-cyan-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-xl text-slate-100 font-light leading-relaxed drop-shadow-md">
              "{bloqueActualInfo.lunoSummary}"
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={continuarDespuesDelResumen} 
              className="px-8 md:px-12 py-4 font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-2xl cursor-pointer"
            >
              Avanzar al Siguiente Bloque ➔
            </button>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Desde el Vínculo · Experiencia Privada
        </div>
      </motion.div>
    );
  }

  // 2. Pantalla Final Fullscreen
  if (completado) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-40 w-screen h-screen flex flex-col items-center justify-between p-6 md:p-12 bg-black text-center overflow-hidden pt-28 md:pt-32 pb-8"
      >
        <video src="/videos/LunoGalery.mp4" autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover filter brightness-75 contrast-105 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-10 w-full">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-teal-400 uppercase font-bold drop-shadow-md">
            [SIMULADOR TÁCTICO CONCLUIDO]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            {data.ending.title}
          </h2>
          
          <div className="border-l-2 border-teal-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-lg text-slate-100 font-light leading-relaxed drop-shadow-md">
              {data.ending.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
            <button 
              onClick={() => { setPasoActual(0); setCompletado(false); setSeleccionIndex(1); setRevelado(false); }} 
              className="w-full sm:w-auto px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer"
            >
              Reiniciar Simulador ↺
            </button>
            <button 
              onClick={() => navigate('/biblioteca')} 
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all border border-slate-700 cursor-pointer"
            >
              Volver a la Biblioteca ⌂
            </button>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Desde el Vínculo · Experiencia Privada
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col justify-between p-3 md:p-6 relative z-20 overflow-hidden">
      
      {/* Background Ambiental Gradiente Fullscreen */}
      <div className={`fixed inset-0 bg-gradient-to-b ${theme.bg} -z-20 pointer-events-none transition-all duration-700`} />

      {/* HUD Superior Limpio y Responsivo */}
      <div className="w-full flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0 pt-1 gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] font-bold px-2.5 py-1 border-l-2 truncate ${theme.tagBg}`}>
            {bloqueActualInfo.blockTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-stone-200 font-bold bg-stone-900/90 px-3 py-1 border border-stone-800 shrink-0">
          <span className={`w-2 h-2 rounded-full ${theme.accent.replace('text-', 'bg-')} animate-pulse`} />
          <span>SITUACIÓN 0{pasoActual + 1} / 0{pasos.length}</span>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="w-full flex-1 overflow-y-auto my-auto py-2 pr-1 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={paso.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-full"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
              
              {/* Visor Multimedia: Ahora preparado para reproducir Videos MP4 en bucle */}
              <div className="lg:col-span-7 space-y-3">
                <span className={`text-[10px] font-mono tracking-widest uppercase font-extrabold ${theme.accent}`}>
                  CONTEXTO DE RUTA URBANA
                </span>
                <p className="text-sm md:text-base text-stone-100 font-light leading-relaxed">
                  {paso.prompt}
                </p>
                <div className="relative bg-black border border-stone-800 aspect-[16/9] max-h-[220px] md:max-h-[300px] shadow-2xl w-full overflow-hidden">
                  <video 
                    key={paso.media}
                    src={paso.media} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover filter brightness-95" 
                  />
                </div>
              </div>

              {/* Panel de Controles y Opciones */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <span className={`text-[10px] md:text-xs font-mono tracking-widest uppercase font-bold ${theme.accent}`}>
                    Manejo Dinámico de Línea
                  </span>
                  <h3 className="text-lg md:text-xl font-serif text-white font-bold">
                    Ajusta la Tensión de la Correa
                  </h3>
                </div>

                <div className="space-y-3 bg-stone-900/90 border-l-2 border-amber-500/60 p-4 md:p-5 backdrop-blur-xl shadow-2xl">
                  <div className="grid grid-cols-3 gap-1.5 text-[9px] md:text-[10px] font-mono text-stone-300 font-bold uppercase text-center">
                    <span className={seleccionIndex === 0 ? theme.accent : ''}>[01] {getShortLabel(paso.options[0]?.label)}</span>
                    <span className={seleccionIndex === 1 ? theme.accent : ''}>[02] {getShortLabel(paso.options[1]?.label)}</span>
                    <span className={seleccionIndex === 2 ? theme.accent : ''}>[03] {getShortLabel(paso.options[2]?.label)}</span>
                  </div>

                  <input 
                    type="range" min="0" max="2" step="1" disabled={revelado}
                    value={seleccionIndex} onChange={(e) => setSeleccionIndex(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-stone-800 appearance-none cursor-pointer accent-amber-400"
                  />

                  <div className={`p-3 border transition-all ${getFeedbackStyle(opcionActual, seleccionIndex)}`}>
                    <span className="text-[9px] md:text-[10px] font-mono uppercase font-bold block mb-1">
                      Acción Táctica Seleccionada:
                    </span>
                    <p className="text-xs text-stone-100 leading-relaxed">
                      {opcionActual.label}
                    </p>
                  </div>
                </div>

                {!revelado ? (
                  <button onClick={confirmarAccion} className={`w-full py-3 md:py-3.5 text-xs font-mono tracking-[0.2em] uppercase transition-all cursor-pointer shadow-xl ${theme.btn}`}>
                    Confirmar Ajuste de Correa ➔
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 bg-stone-900/90 border-l-4 ${theme.border} space-y-2 shadow-2xl`}>
                    <span className={`text-xs font-bold ${theme.accent}`}>Análisis Táctico de Luno</span>
                    <p className="text-xs text-stone-200 font-light leading-relaxed">{paso.feedback.why}</p>
                    <button onClick={siguienteNodo} className={`w-full mt-1 py-3 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer ${theme.btn}`}>
                      {pasoActual < pasos.length - 1 ? 'Siguiente Situación ➔' : 'Ver Cierre del Simulador ➔'}
                    </button>
                  </motion.div>
                )}
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}