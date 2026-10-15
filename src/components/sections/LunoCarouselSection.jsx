import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Layers, X, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lunoStages } from '../../data/lunoStages';

export default function LunoCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev + 1) % lunoStages.length);
  };

  const handlePrev = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev - 1 + lunoStages.length) % lunoStages.length);
  };

  const activeStage = lunoStages[activeIndex];

  return (
    <section id="luno" className="relative py-24 bg-[#121413] text-[#E8E6E1] overflow-hidden border-t border-[#2A2D2B]/60">
      {/* Fondo de brillo ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4A6758]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F3F2EF] mb-4">
            Conocé a Luno:{' '}
            <span className="italic font-normal text-[#88ab98] block sm:inline mt-1 sm:mt-0">
              ¿En qué momento están hoy?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A3A099] font-normal leading-relaxed">
            Hacé clic en cualquier tarjeta activa para expandir el diagnóstico detallado sin perder el flujo del carrusel.
          </p>
        </div>

        {/* ÁREA DEL SLIDER EXPANDIBLE */}
        <div className="relative my-6 min-h-[460px] flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-[460px] flex items-center justify-center">
            {lunoStages.map((stage, index) => {
              let offset = index - activeIndex;

              if (offset < -2) offset += lunoStages.length;
              if (offset > 2) offset -= lunoStages.length;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const baseSpacing = isExpanded ? 420 : 320;
              const translateX = offset * baseSpacing;
              const scale = isActive ? 1 : 0.85;
              const opacity = isActive ? 1 : Math.abs(offset) === 1 ? (isExpanded ? 0.15 : 0.4) : 0.05;
              const zIndex = isActive ? 30 : 20 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={stage.id}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                      setIsExpanded(false);
                    } else {
                      setIsExpanded(!isExpanded);
                    }
                  }}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale: scale,
                    opacity: opacity,
                  }}
                  style={{ zIndex }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8
                  }}
                  className={`absolute rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer ${
                    isActive
                      ? isExpanded
                        ? 'w-[90%] sm:w-[680px] md:w-[820px] h-[450px] bg-[#222624] border-[#88ab98] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8'
                        : 'w-[320px] sm:w-[350px] md:w-[380px] h-[420px] bg-[#222624] border-[#6B8E7B] shadow-xl shadow-[#4A6758]/20 p-6 hover:border-[#88ab98]'
                      : 'w-[320px] sm:w-[350px] md:w-[380px] h-[420px] bg-[#141615] border-[#2A2D2B] p-6 hover:border-[#3D423F]'
                  }`}
                >
                  {/* Fondo sutil */}
                  {stage.image && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#222624] via-[#222624]/80 to-transparent" />
                    </div>
                  )}

                  {/* CONTENIDO INTERNO: EXPANDIDO */}
                  {isActive && isExpanded ? (
                    <div className="relative z-10 h-full flex flex-col justify-between transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(false);
                        }}
                        className="absolute -top-2 -right-2 p-2 bg-[#171A18] border border-[#3D423F] text-[#A3A099] hover:text-white rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[#171A18] border border-[#3D423F] text-[#E0B84C] rounded-full font-semibold">
                          {stage.tag}
                        </span>
                        <span className="text-xs text-[#C5C3BD]">
                          {stage.subtitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto items-center">
                        <div className="md:col-span-5 space-y-3">
                          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#FFFFFF] leading-tight">
                            {stage.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#D1CFCA] leading-relaxed font-light">
                            {stage.description}
                          </p>
                        </div>

                        <div className="md:col-span-7 bg-[#171A18]/90 border border-[#3D423F] p-5 rounded-xl space-y-3 shadow-inner">
                          <div className="flex items-center gap-2 text-[#88ab98]">
                            <Activity className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Análisis Sistémico Luno AI</span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#E8E6E1] leading-relaxed">
                            En esta fase, la prioridad es reestructurar la rutina y la predictibilidad del ambiente. Luno sugiere un abordaje directo sobre la regulación emocional antes de exigir conductas formales.
                          </p>
                          <div className="pt-2 border-t border-[#2A2D2B] flex items-center gap-2 text-xs text-[#E8E6E1]">
                            <ShieldCheck className="w-4 h-4 text-[#E0B84C]" />
                            <span>Enfoque sugerido: <strong className="font-serif italic text-[#88ab98] font-normal">{stage.recommendation}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#3D423F] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs text-[#C5C3BD]">
                          Toca en cualquier parte para contraer la vista.
                        </span>
                        <Link
                          to={`/productos/${stage.productId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A6758] text-white text-xs uppercase tracking-[0.15em] font-medium rounded-xl hover:bg-[#5C7F6D] transition-all shadow-md"
                        >
                          <span>Ver Programa Completo</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    /* CONTENIDO INTERNO: COMPACTO */
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full font-semibold border ${
                            isActive 
                              ? 'bg-[#171A18] border-[#3D423F] text-[#E0B84C]' 
                              : 'bg-[#121413] border border-[#2A2D2B] text-[#A3A099]'
                          }`}>
                            {stage.tag}
                          </span>
                          <span className="text-xs text-[#A3A099]">
                            {stage.subtitle}
                          </span>
                        </div>

                        <h3 className={`font-serif text-2xl sm:text-3xl font-normal mb-3 leading-tight ${
                          isActive ? 'text-[#FFFFFF]' : 'text-[#E8E6E1]'
                        }`}>
                          {stage.title}
                        </h3>

                        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                          isActive ? 'text-[#D1CFCA]' : 'text-[#A3A099]'
                        }`}>
                          {stage.description}
                        </p>
                      </div>

                      <div className={`pt-4 border-t ${isActive ? 'border-[#3D423F]' : 'border-[#2A2D2B]'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#88ab98] mb-0.5 font-semibold">
                              Sugerencia Luno:
                            </p>
                            <p className="text-xs text-[#E8E6E1] font-serif italic truncate max-w-[220px]">
                              {stage.recommendation}
                            </p>
                          </div>
                          {isActive && (
                            <span className="text-[10px] text-[#88ab98] bg-[#4A6758]/20 border border-[#4A6758]/50 px-2.5 py-1 rounded-md font-medium">
                              Toca para expandir
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Botones de Navegación del Carrusel */}
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-[#1A1C1B]/90 border border-[#2A2D2B] text-[#E8E6E1] hover:border-[#4A6758] hover:text-white transition-all rounded-full backdrop-blur-md shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-[#1A1C1B]/90 border border-[#2A2D2B] text-[#E8E6E1] hover:border-[#4A6758] hover:text-white transition-all rounded-full backdrop-blur-md shadow-lg"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* BARRA INFERIOR DE ACCIONES */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-8 p-6 sm:p-7 bg-[#1A1C1B]/90 border border-[#2A2D2B] rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#4A6758]/20 border border-[#4A6758]/40 rounded-xl text-[#88ab98] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#E0B84C] font-semibold mb-1">
                  Diagnóstico Seleccionado: {activeStage.title}
                </p>
                <p className="text-xs sm:text-sm text-[#E8E6E1] font-light">
                  Plan de acción sugerido: <strong className="font-serif font-normal italic text-[#88ab98]">{activeStage.recommendation}</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2A2D2B] border border-[#3D423F] text-[#E8E6E1] text-xs uppercase tracking-[0.15em] font-medium rounded-xl hover:bg-[#3D423F] transition-all"
              >
                <Layers className="w-4 h-4 text-[#88ab98]" />
                <span>{isExpanded ? 'Contraer' : 'Detalles'}</span>
              </button>

              <Link
                to={`/productos/${activeStage.productId}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A6758] text-white text-xs uppercase tracking-[0.15em] font-medium rounded-xl hover:bg-[#5C7F6D] transition-all whitespace-nowrap shadow-md"
              >
                <span>Ver Programa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}