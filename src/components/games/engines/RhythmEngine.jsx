import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RhythmEngine({ data, onUpdateLuno }) {
  const navigate = useNavigate();
  const [faseActual, setFaseActual] = useState(0);
  const [ciclo, setCiclo] = useState(1);
  const [estadoRespiracion, setEstadoRespiracion] = useState('inhala'); // 'inhala' | 'sosten' | 'exhala'
  const [contador, setContador] = useState(4);
  const [completado, setCompletado] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const fases = data?.phases || [];
  const fase = fases[faseActual] || fases[0] || {};
  const maxCiclosFase = fase.cyclesRequired || 2;

  const faseRef = useRef(faseActual);
  const cicloRef = useRef(ciclo);
  const estadoRef = useRef(estadoRespiracion);

  useEffect(() => { faseRef.current = faseActual; }, [faseActual]);
  useEffect(() => { cicloRef.current = ciclo; }, [ciclo]);
  useEffect(() => { estadoRef.current = estadoRespiracion; }, [estadoRespiracion]);

  const TIEMPOS = { inhala: 4, sosten: 4, exhala: 6 };

  const getPhaseTheme = (index) => {
    switch (index) {
      case 0:
        return {
          accent: 'text-emerald-400',
          border: 'border-emerald-500',
          glow: 'rgba(16, 185, 129, 0.35)',
          core: 'from-emerald-400 via-teal-500 to-emerald-950',
          ring: 'border-emerald-400/40',
          bgTag: 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
        };
      case 1:
        return {
          accent: 'text-cyan-400',
          border: 'border-cyan-500',
          glow: 'rgba(6, 182, 212, 0.35)',
          core: 'from-cyan-400 via-blue-500 to-slate-950',
          ring: 'border-cyan-400/40',
          bgTag: 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
        };
      case 2:
        return {
          accent: 'text-amber-400',
          border: 'border-amber-500',
          glow: 'rgba(245, 158, 11, 0.35)',
          core: 'from-amber-400 via-orange-500 to-amber-950',
          ring: 'border-amber-400/40',
          bgTag: 'bg-amber-950/80 border-amber-500 text-amber-300'
        };
      default:
        return {
          accent: 'text-emerald-400',
          border: 'border-emerald-500',
          glow: 'rgba(16, 185, 129, 0.35)',
          core: 'from-emerald-400 via-teal-500 to-emerald-950',
          ring: 'border-emerald-400/40',
          bgTag: 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
        };
    }
  };

  const theme = getPhaseTheme(faseActual);

  useEffect(() => {
    if (completado) return;

    const timer = setInterval(() => {
      setContador((prev) => {
        if (prev > 1) return prev - 1;

        const actualEstado = estadoRef.current;
        const actualCiclo = cicloRef.current;
        const actualFaseIdx = faseRef.current;

        if (actualEstado === 'inhala') {
          setEstadoRespiracion('sosten');
          return TIEMPOS.sosten;
        } else if (actualEstado === 'sosten') {
          setEstadoRespiracion('exhala');
          return TIEMPOS.exhala;
        } else {
          setEstadoRespiracion('inhala');

          if (actualCiclo < 2) {
            setCiclo(actualCiclo + 1);
          } else {
            if (actualFaseIdx < fases.length - 1) {
              const siguienteFase = actualFaseIdx + 1;
              setFaseActual(siguienteFase);
              setCiclo(1);
              onUpdateLuno({ pose: 'contento', text: `Sintonización de Fase 0${siguienteFase + 1} iniciada.` });
            } else {
              setCompletado(true);
              onUpdateLuno({ pose: 'celebrando', text: 'Co-regulación completada.' });
            }
          }
          return TIEMPOS.inhala;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completado, fases.length]);

  const getDuracionActual = () => TIEMPOS[estadoRespiracion] || 4;

  const getEscalaOrbe = () => {
    if (estadoRespiracion === 'inhala') return 1.55;
    if (estadoRespiracion === 'sosten') return 1.6;
    return 0.85;
  };

  // Pantalla Final de Cierre
  if (completado) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="fixed inset-0 z-40 w-screen h-screen flex flex-col items-center justify-between p-6 md:p-12 bg-black text-center overflow-hidden pt-24 pb-8"
      >
        <div className="relative z-10 max-w-2xl w-full mx-auto space-y-4 my-auto px-4">
          <span className="text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase font-bold">
            [SISTEMA NERVIOSO REGULADO]
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white tracking-wide">
            {data?.ending?.title}
          </h2>

          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-emerald-500/40 shadow-2xl bg-gradient-to-br from-emerald-950 via-slate-950 to-black flex items-center justify-center">
            {!videoError && (data?.ending?.video || data?.videoBackground) ? (
              <video 
                src={data?.ending?.video || data?.videoBackground} 
                autoPlay 
                muted 
                loop 
                playsInline 
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 animate-pulse flex items-center justify-center text-2xl">
                  🧘‍♂️
                </div>
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest">
                  Frecuencia Cardíaca y Respiratoria Sincronizadas
                </span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-stone-200 font-light leading-relaxed">
            {data?.ending?.message}
          </p>

          <div className="flex items-center gap-4 justify-center pt-2">
            <button 
              onClick={() => { 
                setFaseActual(0); 
                setCiclo(1); 
                setCompletado(false); 
                setEstadoRespiracion('inhala'); 
                setContador(4); 
              }} 
              className="px-6 py-3 bg-emerald-400 text-stone-950 font-bold text-xs font-mono uppercase cursor-pointer hover:bg-emerald-300 transition-all shadow-xl"
            >
              Repetir ↺
            </button>
            <button 
              onClick={() => navigate('/biblioteca')} 
              className="px-6 py-3 bg-stone-900 text-white font-bold text-xs font-mono uppercase border border-stone-700 hover:bg-stone-800 transition-all cursor-pointer"
            >
              Biblioteca ⌂
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-between p-3 md:p-6 relative z-20 overflow-hidden bg-[#04060A] select-none">
      
      {/* 📹 VIDEO DE FONDO CINEMÁTICO DURANTE LAS FASES */}
      {!videoError && data?.videoBackground && (
        <video 
          src={data.videoBackground} 
          autoPlay 
          muted 
          loop 
          playsInline 
          onError={() => setVideoError(true)}
          className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 transition-all duration-1000 opacity-25 filter brightness-75 contrast-110"
        />
      )}

      {/* 🌊 RESPLANDOR PERIFÉRICO QUE RESPIRA CON LA PANTALLA COMPLETA */}
      <motion.div 
        animate={{ 
          opacity: estadoRespiracion === 'inhala' || estadoRespiracion === 'sosten' ? 0.6 : 0.15,
          scale: estadoRespiracion === 'inhala' || estadoRespiracion === 'sosten' ? 1.1 : 0.95
        }}
        transition={{ duration: getDuracionActual(), ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at center, transparent 20%, ${theme.glow} 100%)`
        }}
      />

      {/* HUD Superior */}
      <div className="relative z-30 w-full flex items-center justify-between pb-3 border-b border-stone-800 shrink-0 gap-2">
        <AnimatePresence mode="wait">
          <motion.span 
            key={fase.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] font-bold px-3 py-1 border-l-2 ${theme.bgTag}`}
          >
            {fase.title}
          </motion.span>
        </AnimatePresence>

        <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-stone-200 font-bold bg-black/80 px-3 py-1 border border-stone-800">
          <span className={`w-2 h-2 rounded-full ${theme.accent} animate-pulse`} />
          <span>CICLO 0{ciclo} / 0{maxCiclosFase}</span>
        </div>
      </div>

      {/* 🔮 ÁREA CENTRAL: NÚCLEO BIORÍTMICO TÁCTICO */}
      <div className="relative z-30 w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        
        <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
          
          <motion.div 
            animate={{ 
              scale: [1, 1.8, 2.2], 
              opacity: [0.6, 0.2, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            className={`absolute inset-0 rounded-full border ${theme.ring} pointer-events-none`}
          />

          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1.8], 
              opacity: [0.4, 0.1, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: 0.8,
              ease: "easeOut" 
            }}
            className={`absolute inset-0 rounded-full border ${theme.ring} pointer-events-none`}
          />

          <motion.div 
            animate={{ scale: getEscalaOrbe() * 1.15 }}
            transition={{ duration: getDuracionActual(), ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.ring} opacity-60 pointer-events-none`}
          />

          <motion.div 
            animate={{ scale: getEscalaOrbe() }}
            transition={{ duration: getDuracionActual(), ease: "easeInOut" }}
            className={`w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-br ${theme.core} shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center relative z-10`}
          >
            <span className="text-5xl md:text-6xl font-mono font-bold text-white drop-shadow-2xl tracking-tighter">
              {contador}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-stone-200 mt-1 font-extrabold drop-shadow">
              {estadoRespiracion === 'inhala' ? 'INHALA' : estadoRespiracion === 'sosten' ? 'SOSTÉN' : 'EXHALA'}
            </span>
          </motion.div>

        </div>

        <div className="max-w-xl text-center space-y-2 mt-4 px-4 h-20 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={fase.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <p className="text-base md:text-lg font-serif text-white font-light italic leading-relaxed">
                "{fase.guide}"
              </p>
              <p className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${theme.accent}`}>
                {fase.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* FOOTER CON INSIGHT DE LUNO */}
      <div className={`relative z-30 w-full max-w-4xl mx-auto bg-stone-950/90 border-l-2 ${theme.border} p-4 rounded-r-lg shadow-2xl transition-colors duration-500`}>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${theme.accent}`}>
            Sintonía Biológica con Luno
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            Fase {faseActual + 1} de {fases.length}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={fase.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-stone-200 font-light leading-relaxed"
          >
            {fase.lunoInsight}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
}