import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RadarDecoderEngine({ data, onUpdateLuno, preferences }) {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(0);
  const [frecuenciaVal, setFrecuenciaVal] = useState(92.0); // Selector de Energía
  const [hotspotVal, setHotspotVal] = useState(null); // Hotspot
  const [matrizVal, setMatrizVal] = useState(null); // Elección de Ubicación
  
  const [revelado, setRevelado] = useState(false);
  const [mostrandoResumenBloque, setMostrandoResumenBloque] = useState(false);
  const [completado, setCompletado] = useState(false);

  const pasos = data?.steps || [];
  const paso = pasos[pasoActual] || pasos[0] || {};
  const bloques = data?.blocks || [];
  const bloqueActualInfo = bloques.find(b => b.blockId === paso.block) || bloques[0] || {};

  const getTheme = (blockId) => {
    switch(blockId) {
      case 1: return { accent: 'text-emerald-400', bgBorder: 'border-emerald-500/50', tagBg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300', btn: 'bg-emerald-500 text-stone-950 hover:bg-emerald-400 font-bold', hex: '#10b981' };
      case 2: return { accent: 'text-cyan-400', bgBorder: 'border-cyan-500/50', tagBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300', btn: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold', hex: '#06b6d4' };
      case 3: return { accent: 'text-indigo-400', bgBorder: 'border-indigo-500/50', tagBg: 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300', btn: 'bg-indigo-500 text-slate-950 hover:bg-indigo-400 font-bold', hex: '#818cf8' };
      default: return { accent: 'text-emerald-400', bgBorder: 'border-emerald-500/50', tagBg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300', btn: 'bg-emerald-500 text-stone-950 hover:bg-emerald-400 font-bold', hex: '#10b981' };
    }
  };

  const theme = getTheme(paso.block);

  const getEnergiaLabel = (val) => {
    if (val <= 85) return "Calma profunda / Descansando";
    if (val <= 100) return "Atento / Expectante";
    return "Alerta / Sobrepasado";
  };

  const confirmarAccion = () => {
    if (revelado) return;
    setRevelado(true);

    let esCorrecto = false;
    if (paso.type === 'frecuencia') {
      esCorrecto = Math.abs(frecuenciaVal - paso.correctFrequency) <= 3.5;
    } else if (paso.type === 'hotspot') {
      esCorrecto = hotspotVal === paso.correctHotspotId;
    } else if (paso.type === 'matriz') {
      esCorrecto = matrizVal === paso.correctZoneId;
    }

    if (esCorrecto) {
      onUpdateLuno({ pose: 'contento', text: '¡Excelente lectura del estado de tu perro!' });
    } else {
      onUpdateLuno({ pose: 'alerta', text: 'Estuvimos cerca. Revisemos juntos la explicación.' });
    }
  };

  const siguienteNodo = () => {
    setHotspotVal(null);
    setMatrizVal(null);
    setFrecuenciaVal(92.0);
    setRevelado(false);

    const siguienteIndex = pasoActual + 1;

    if (siguienteIndex < pasos.length) {
      const pasoSiguiente = pasos[siguienteIndex];
      if (pasoSiguiente.block !== paso.block) {
        setMostrandoResumenBloque(true);
      } else {
        setPasoActual(siguienteIndex);
      }
      onUpdateLuno({ pose: 'neutro', text: 'Pasando a la siguiente situación.' });
    } else {
      setCompletado(true);
      onUpdateLuno({ pose: 'celebrando', text: '¡Bloque de refugio completado con éxito!' });
    }
  };

  const continuarDespuesDelResumen = () => {
    setMostrandoResumenBloque(false);
    setPasoActual(prev => prev + 1);
  };

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
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase font-bold drop-shadow-md">
            [{bloqueActualInfo.blockTitle || 'BLOQUE SUPERADO'}]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            Consejo de Luno
          </h2>
          
          <div className="border-l-2 border-emerald-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-xl text-slate-100 font-light leading-relaxed drop-shadow-md">
              "{bloqueActualInfo.lunoSummary || 'Lectura completada con éxito.'}"
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={continuarDespuesDelResumen} 
              className="px-8 md:px-12 py-4 font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl cursor-pointer"
            >
              Continuar al Siguiente Bloque ➔
            </button>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Desde el Vínculo · Espacio de Bienestar
        </div>
      </motion.div>
    );
  }

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
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold drop-shadow-md">
            [EXPERIENCIA FINALIZADA]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            {data?.ending?.title || '¡Especialista en Bienestar Canino!'}
          </h2>
          
          <div className="border-l-2 border-cyan-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-lg text-slate-100 font-light leading-relaxed drop-shadow-md">
              {data?.ending?.message || 'Has entrenado tu capacidad de lectura y armado de refugio con total sensibilidad.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
            <button 
              onClick={() => { setPasoActual(0); setCompletado(false); setHotspotVal(null); setMatrizVal(null); setRevelado(false); }} 
              className="w-full sm:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer"
            >
              Repasar Experiencia ↺
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
          Desde el Vínculo · Espacio de Bienestar
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col justify-between p-3 md:p-6 relative z-20 overflow-hidden bg-[#07090E]">
      
      <div className="w-full flex items-center justify-between pb-2.5 border-b border-stone-800 shrink-0 pt-1 gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] font-bold px-2.5 py-1 border-l-2 truncate ${theme.tagBg}`}>
            {bloqueActualInfo.blockTitle || 'REFUGIO Y CALMA'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-stone-200 font-bold bg-stone-900/90 px-3 py-1 border border-stone-800 shrink-0">
          <span className={`w-2 h-2 rounded-full bg-emerald-400 animate-pulse`} />
          <span>SITUACIÓN 0{pasoActual + 1} / 0{pasos.length}</span>
        </div>
      </div>

      <div className="w-full flex-1 overflow-y-auto my-auto py-2 pr-1 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={paso.id || pasoActual}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-full"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
              
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-extrabold ${theme.accent}`}>
                    OBSERVACIÓN DE ESCENA
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    MODO: {paso.type === 'frecuencia' ? 'MEDIDOR DE ENERGÍA' : paso.type === 'hotspot' ? 'SEÑAL CORPORAL' : 'UBICACIÓN ESPACIAL'}
                  </span>
                </div>

                <p className="text-sm md:text-base text-stone-100 font-light leading-relaxed">
                  {paso.prompt}
                </p>

                <div className="relative bg-black border border-stone-800 aspect-[16/9] max-h-[260px] md:max-h-[340px] shadow-2xl w-full overflow-hidden group">
                  <img src={paso.media} alt={paso.alt} className="w-full h-full object-cover filter brightness-90 contrast-105" />

                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  {paso.type === 'hotspot' && paso.hotspots?.map((hs) => {
                    const estaSeleccionado = hotspotVal === hs.id;
                    return (
                      <button
                        key={hs.id}
                        disabled={revelado}
                        onClick={() => setHotspotVal(hs.id)}
                        style={{ top: `${hs.top}%`, left: `${hs.left}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          estaSeleccionado 
                            ? 'bg-emerald-500/40 border-emerald-400 ring-4 ring-emerald-400/30 scale-125' 
                            : 'bg-black/60 border-stone-400 hover:border-emerald-400 hover:scale-110'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                
                {paso.type === 'frecuencia' && (
                  <div className="space-y-4 bg-stone-900/90 border-l-2 border-emerald-500 p-4 md:p-5 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">
                        Nivel de Energía Detectado
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {getEnergiaLabel(frecuenciaVal)}
                      </span>
                    </div>

                    <input 
                      type="range" min="80.0" max="110.0" step="0.5" disabled={revelado}
                      value={frecuenciaVal} onChange={(e) => setFrecuenciaVal(parseFloat(e.target.value))}
                      className="w-full h-3 bg-stone-800 appearance-none cursor-pointer accent-emerald-400"
                    />

                    <div className="grid grid-cols-3 gap-1 text-[9px] font-mono text-stone-400 text-center">
                      <span>Tranquilo</span>
                      <span>Atento</span>
                      <span>Alerta</span>
                    </div>
                  </div>
                )}

                {paso.type === 'hotspot' && (
                  <div className="space-y-3 bg-stone-900/90 border-l-2 border-cyan-500 p-4 md:p-5 shadow-2xl">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                      Señal Corporal Seleccionada
                    </span>
                    {hotspotVal ? (
                      <p className="text-xs text-stone-100 font-medium leading-relaxed">
                        {paso.hotspots?.find(h => h.id === hotspotVal)?.label}
                      </p>
                    ) : (
                      <p className="text-xs text-stone-400 font-light italic">
                        Toca un punto de la foto para marcar dónde notas tensión.
                      </p>
                    )}
                  </div>
                )}

                {paso.type === 'matriz' && (
                  <div className="space-y-3 bg-stone-900/90 border-l-2 border-indigo-500 p-4 md:p-5 shadow-2xl">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
                      Selecciona la Mejor Ubicación para su Refugio
                    </span>
                    <div className="grid grid-cols-1 gap-2 text-xs font-sans">
                      {paso.options?.map((opt) => {
                        const estaSeleccionado = matrizVal === opt.id;
                        return (
                          <button 
                            key={opt.id}
                            disabled={revelado}
                            onClick={() => setMatrizVal(opt.id)} 
                            className={`p-3 border text-left cursor-pointer transition-all rounded-lg ${
                              estaSeleccionado 
                                ? 'bg-indigo-950 border-indigo-400 text-white font-bold shadow-lg' 
                                : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-900'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!revelado ? (
                  <button 
                    onClick={confirmarAccion} 
                    disabled={(paso.type === 'hotspot' && !hotspotVal) || (paso.type === 'matriz' && !matrizVal)}
                    className={`w-full py-3.5 text-xs font-mono tracking-[0.2em] uppercase transition-all cursor-pointer shadow-xl ${
                      ((paso.type === 'hotspot' && !hotspotVal) || (paso.type === 'matriz' && !matrizVal))
                        ? 'bg-stone-800 text-stone-500 cursor-not-allowed' 
                        : theme.btn
                    }`}
                  >
                    Confirmar Respuesta ➔
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 bg-stone-900/90 border-l-4 ${theme.bgBorder} space-y-2 shadow-2xl`}>
                    <span className={`text-xs font-bold ${theme.accent}`}>Consejo de Luno</span>
                    <p className="text-xs text-stone-200 font-light leading-relaxed">{paso.feedback?.why || 'Lectura decodificada correctamente.'}</p>
                    <button onClick={siguienteNodo} className={`w-full mt-1 py-3 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer ${theme.btn}`}>
                      {pasoActual < pasos.length - 1 ? 'Siguiente Situación ➔' : 'Ver Cierre de la Experiencia ➔'}
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