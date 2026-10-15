import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ThresholdFinderEngine({ data, onUpdateLuno }) {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(0);
  const [distancia, setDistancia] = useState(20);
  const [avanzando, setAvanzando] = useState(false);
  const [detenido, setDetenido] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const [mostrandoResumenBloque, setMostrandoResumenBloque] = useState(false);
  const [completado, setCompletado] = useState(false);

  const timerRef = useRef(null);

  const pasos = data?.steps || [];
  const paso = pasos[pasoActual] || pasos[0] || {};
  const bloques = data?.blocks || [];
  const bloqueActualInfo = bloques.find(b => b.blockId === paso.block) || bloques[0] || {};

  const getTheme = (blockId) => {
    switch (blockId) {
      case 1: return { accent: 'text-rose-400', border: 'border-rose-500/50', tagBg: 'bg-rose-950/80 border-rose-500/50 text-rose-300', btn: 'bg-rose-500 text-stone-950 hover:bg-rose-400 font-bold', ring: 'ring-rose-500' };
      case 2: return { accent: 'text-amber-400', border: 'border-amber-500/50', tagBg: 'bg-amber-950/80 border-amber-500/50 text-amber-300', btn: 'bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold', ring: 'ring-amber-500' };
      case 3: return { accent: 'text-cyan-400', border: 'border-cyan-500/50', tagBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300', btn: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold', ring: 'ring-cyan-500' };
      default: return { accent: 'text-rose-400', border: 'border-rose-500/50', tagBg: 'bg-rose-950/80 border-rose-500/50 text-rose-300', btn: 'bg-rose-500 text-stone-950 hover:bg-rose-400 font-bold', ring: 'ring-rose-500' };
    }
  };

  const theme = getTheme(paso.block);

  useEffect(() => {
    setDistancia(paso.initialDistance || 20);
    setAvanzando(false);
    setDetenido(false);
    setRevelado(false);
  }, [pasoActual, paso]);

  useEffect(() => {
    if (avanzando && !detenido && !revelado) {
      timerRef.current = setInterval(() => {
        setDistancia((prev) => {
          if (prev <= 2) {
            clearInterval(timerRef.current);
            setAvanzando(false);
            setDetenido(true);
            return 2;
          }
          return Math.max(2, parseFloat((prev - 0.25).toFixed(1)));
        });
      }, 45);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [avanzando, detenido, revelado]);

  const iniciarAvance = () => {
    if (revelado || detenido) return;
    setAvanzando(true);
  };

  const deternerserOpcion = () => {
    if (revelado) return;
    setAvanzando(false);
    setDetenido(true);
  };

  const confirmarRespuesta = () => {
    if (revelado) return;
    setRevelado(true);

    const diferencia = Math.abs(distancia - paso.targetDistance);
    const esCorrecto = diferencia <= (paso.tolerance || 2.0);

    if (esCorrecto) {
      onUpdateLuno({ pose: 'contento', text: '¡Excelente precisión! Lograste detenerte justo en el margen seguro.' });
    } else if (distancia > paso.targetDistance) {
      onUpdateLuno({ pose: 'alerta', text: 'Nos frenamos demasiado lejos. Podíamos acercarnos un poco más.' });
    } else {
      onUpdateLuno({ pose: 'alerta', text: 'Nos acercamos demasiado y cruzamos la zona de tensión.' });
    }
  };

  const siguienteNodo = () => {
    setRevelado(false);
    setDetenido(false);
    setAvanzando(false);

    const siguienteIndex = pasoActual + 1;

    if (siguienteIndex < pasos.length) {
      const pasoSiguiente = pasos[siguienteIndex];
      if (pasoSiguiente.block !== paso.block) {
        setMostrandoResumenBloque(true);
      } else {
        setPasoActual(siguienteIndex);
      }
      onUpdateLuno({ pose: 'neutro', text: 'Iniciando evaluación de nueva distancia.' });
    } else {
      setCompletado(true);
      onUpdateLuno({ pose: 'celebrando', text: '¡Medición de umbrales completada con maestría!' });
    }
  };

  const continuarDespuesDelResumen = () => {
    setMostrandoResumenBloque(false);
    setPasoActual((prev) => prev + 1);
  };

  // 🔥 ZOOM INTENSO Y RECORTE FOCAL (De 1.0x a 2.3x)
  const porcentajeAcercamiento = Math.min(100, Math.max(0, ((paso.initialDistance - distancia) / (paso.initialDistance - 2)) * 100));
  const escalaZoom = 1 + (porcentajeAcercamiento / 100) * 1.35; // Aumentamos fuertemente el Zoom
  const intensidadShake = avanzando && distancia < paso.targetDistance ? Math.sin(Date.now() / 25) * 2.5 : 0;

  const getIndicadorColor = () => {
    const dif = Math.abs(distancia - paso.targetDistance);
    if (!detenido) return 'text-white border-stone-700 bg-black/85';
    if (dif <= paso.tolerance) return 'text-emerald-400 border-emerald-500 bg-emerald-950/90 font-bold';
    if (distancia < paso.targetDistance) return 'text-rose-400 border-rose-500 bg-rose-950/90 font-bold';
    return 'text-amber-400 border-amber-500 bg-amber-950/90 font-bold';
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
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-rose-400 uppercase font-bold drop-shadow-md">
            [{bloqueActualInfo.blockTitle || 'BLOQUE SUPERADO'}]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            Análisis de Luno
          </h2>
          
          <div className="border-l-2 border-rose-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-xl text-slate-100 font-light leading-relaxed drop-shadow-md">
              "{bloqueActualInfo.lunoSummary}"
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={continuarDespuesDelResumen} 
              className="px-8 md:px-12 py-4 font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-2xl cursor-pointer"
            >
              Avanzar al Siguiente Bloque ➔
            </button>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Desde el Vínculo · Laboratorio de Distancia
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
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-rose-400 uppercase font-bold drop-shadow-md">
            [MEDIDOR DE UMBRALES COMPLETADO]
          </span>
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto space-y-6 my-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
            {data?.ending?.title || '¡Especialista en Distancia Crítica!'}
          </h2>
          
          <div className="border-l-2 border-rose-400 pl-6 text-left py-2 bg-black/50 backdrop-blur-md">
            <p className="text-base md:text-lg text-slate-100 font-light leading-relaxed drop-shadow-md">
              {data?.ending?.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
            <button 
              onClick={() => { setPasoActual(0); setCompletado(false); setRevelado(false); setDetenido(false); }} 
              className="w-full sm:w-auto px-8 py-4 bg-rose-400 hover:bg-rose-300 text-slate-950 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer"
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
          Desde el Vínculo · Laboratorio de Distancia
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-between p-3 md:p-6 relative z-20 bg-[#07090E] overflow-x-hidden">
      
      {/* HUD Superior Full Width */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-stone-800/80 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] font-bold px-3 py-1 border-l-2 ${theme.tagBg}`}>
            {bloqueActualInfo.blockTitle || 'MEDICIÓN DE UMBRAL'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-stone-200 font-bold bg-stone-900/90 px-3 py-1 border border-stone-800 shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span>CASO 0{pasoActual + 1} / 0{pasos.length}</span>
        </div>
      </div>

      {/* Contenedor Principal Expandido sin márgenes raros */}
      <div className="w-full flex-1 my-auto py-3">
        <AnimatePresence mode="wait">
          <motion.div 
            key={paso.id || pasoActual}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
              
              {/* Visor Cinematográfico Con Zoom Fuerte */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-extrabold ${theme.accent}`}>
                    SIMULADOR DE APROXIMACIÓN TÁCTICA
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    ESTÍMULO EN MOVIMIENTO
                  </span>
                </div>

                <p className="text-sm md:text-base text-stone-100 font-light leading-relaxed">
                  {paso.prompt}
                </p>

                {/* Contenedor de la Foto táctica con Zoom Directo al Sujeto */}
                <div className="relative bg-black border border-stone-800/90 aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-lg shadow-2xl flex-1 min-h-[340px] md:min-h-[460px]">
                  
                  <img 
                    src={paso.media} 
                    alt={paso.alt} 
                    style={{ 
                      transform: `scale(${escalaZoom}) translate(${intensidadShake}px, ${intensidadShake}px)`,
                      transformOrigin: 'center 40%'
                    }}
                    className="w-full h-full object-cover transition-transform duration-75 ease-out filter brightness-95 contrast-105" 
                  />

                  {/* Retícula Táctica de Escáner */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                  {/* Viñeta Dinámica de Tensión Periférica */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                      background: `radial-gradient(circle, transparent 40%, rgba(244,63,94,${porcentajeAcercamiento / 120}) 100%)`
                    }}
                  />

                  {/* Widget Flotante de Metros */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className={`px-4 py-2 border rounded-md shadow-2xl text-center backdrop-blur-md transition-all ${getIndicadorColor()}`}>
                      <span className="text-[9px] font-mono uppercase block text-stone-400 tracking-wider">Distancia Actual</span>
                      <span className="text-xl md:text-2xl font-mono font-bold">{distancia.toFixed(1)} m</span>
                    </div>
                  </div>

                  {/* Advertencia Visual cuando se cruza el umbral */}
                  {distancia < (paso.targetDistance - 2) && (
                    <div className="absolute inset-0 border-2 border-rose-500/80 pointer-events-none animate-pulse bg-rose-500/15" />
                  )}
                </div>
              </div>

              {/* Panel de Control Lateral */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                
                <div className="space-y-4 bg-stone-900/90 border-l-2 border-rose-500 p-5 md:p-6 shadow-2xl rounded-r-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">
                        Manejo de Distancia
                      </span>
                      <span className={`text-xs font-mono font-bold ${distancia <= paso.targetDistance ? 'text-rose-400' : 'text-stone-300'}`}>
                        {avanzando ? 'Acercándose...' : detenido ? 'Marcha Detenida' : 'Listo para avanzar'}
                      </span>
                    </div>

                    {/* Barra de Progresión de Distancia */}
                    <div className="w-full bg-stone-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-stone-800 mb-4">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full rounded-full transition-all duration-75 ease-out" 
                        style={{ width: `${porcentajeAcercamiento}%` }}
                      />
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  {!detenido ? (
                    <div className="space-y-3 my-auto">
                      <button
                        onMouseDown={iniciarAvance}
                        onMouseUp={deternerserOpcion}
                        onTouchStart={iniciarAvance}
                        onTouchEnd={deternerserOpcion}
                        className={`w-full py-5 text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-2xl cursor-pointer select-none rounded-sm ${
                          avanzando ? 'bg-rose-500 text-stone-950 font-bold scale-[0.98]' : theme.btn
                        }`}
                      >
                        {avanzando ? '🏃 MANTÉN PARA ACERCARTE · SUELTA PARA FRENAR' : '▶ PRESIONA Y MANTÉN PRESIONADO PARA AVANZAR'}
                      </button>
                      <span className="text-[10px] font-mono text-stone-400 block text-center italic">
                        Mantén presionado para reducir metros y suelta exactamente en la distancia límite.
                      </span>
                    </div>
                  ) : !revelado ? (
                    <div className="space-y-4 my-auto">
                      <div className="p-4 bg-black/80 border border-stone-800 text-center rounded-md">
                        <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Distancia de Freno Registrada</span>
                        <span className="text-3xl font-mono text-white font-bold">{distancia.toFixed(1)} metros</span>
                      </div>
                      <button 
                        onClick={confirmarRespuesta} 
                        className={`w-full py-4 text-xs font-mono tracking-[0.2em] uppercase transition-all cursor-pointer shadow-xl rounded-sm ${theme.btn}`}
                      >
                        Confirmar Margen de Seguridad ➔
                      </button>
                    </div>
                  ) : null}

                  {/* Feedback de Luno */}
                  {revelado && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`p-4 bg-black/90 border-l-4 ${theme.border} space-y-3 shadow-2xl rounded-r-lg mt-2`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${theme.accent}`}>Análisis de Distancia por Luno</span>
                        <span className="text-[10px] font-mono text-stone-400">Objetivo: {paso.targetDistance}m</span>
                      </div>
                      <p className="text-xs text-stone-200 font-light leading-relaxed">
                        {paso.feedback?.why}
                      </p>
                      <button 
                        onClick={siguienteNodo} 
                        className={`w-full mt-2 py-3.5 font-bold text-xs font-mono tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer ${theme.btn}`}
                      >
                        {pasoActual < pasos.length - 1 ? 'Siguiente Caso ➔' : 'Ver Cierre del Simulador ➔'}
                      </button>
                    </motion.div>
                  )}

                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}