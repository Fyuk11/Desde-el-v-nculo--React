import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Camera} from 'lucide-react';

export default function LunoExperienceSection() {
  const slides = [
    {
      id: 1,
      tag: 'PRACTICA Y VÍNCULO',
      title: 'Aprender a leer sus señales en la vida real',
      desc: 'El primer paso para resolver cualquier problema de conducta es entender el estado emocional. Observamos el lenguaje fino en parques y calles.',
      img: '/images/luno/exp1.webp',
      caption: 'Sesión de observación en entorno real'
    },
    {
      id: 2,
      tag: 'RUTINA & ESPACIOS',
      title: 'Hábitos orgánicos para hogares reales',
      desc: 'Adaptamos los ejercicios a tu estilo de vida. Sin estructuras rígidas, buscando el equilibrio entre descanso y estimulación.',
      img: '/images/luno/exp2.webp',
      caption: 'Gestión de espacios y calma en casa'
    },
    {
      id: 3,
      tag: 'DESARROLLO & AUTONOMÍA',
      title: 'Decisiones conscientes y seguridad',
      desc: 'Buscamos que tu perro elija autorregularse de forma voluntaria, construyendo una relación basada en la confianza y el respeto.',
      img: '/images/luno/exp3.webp',
      caption: 'Paseos y estimulación mental adaptada'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentIndex];

  return (
    <section className="relative w-full min-h-[650px] md:min-h-[720px] bg-[#020d09] text-stone-100 flex items-center py-20 px-4 md:px-12 overflow-hidden">
      
      {/* 1. VIDEO DE FONDO COMPLETO EN PROFUNDIDAD (MÁS VISIBLE) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-65 scale-100"
        >
          {/* Reemplazá por tu ruta de video */}
          <source src="/videos/LunoGalery.mp4" type="video/mp4" />
        </video>

        {/* Viñeta sutil en los bordes para encuadrar, pero dejando el centro amplio para ver el video */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d09]/90 via-transparent to-[#020d09]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d09] via-transparent to-[#020d09]/50" />
      </div>

      {/* 2. CAPA CONTENEDORA SOBREPUESTA (EN PROFUNDIDAD / CAPA SUPERIOR) */}
      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Titular Flotante superior */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#041e15]/80 border border-amber-400/40 backdrop-blur-md text-amber-300 font-mono text-[11px] font-bold uppercase tracking-widest mb-8 shadow-xl">
          <Play className="w-3 h-3 fill-amber-300" /> EXPERIENCIA & VIDA REAL
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* TEXTO IZQUIERDO: Flota sobre el video sin caja gigante que tape */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase drop-shadow">
                {current.tag}
              </span>

              <h2 className="text-3xl md:text-5xl font-serif text-white font-medium leading-tight drop-shadow-md">
                {current.title}
              </h2>

              <p className="text-stone-200 text-sm md:text-base font-light leading-relaxed max-w-lg drop-shadow">
                {current.desc}
              </p>
            </div>

            {/* Navegación y Controles */}
            <div className="pt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-3 bg-[#041e15] hover:bg-amber-400 hover:text-stone-950 border border-emerald-600/80 text-stone-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 bg-[#041e15] hover:bg-amber-400 hover:text-stone-950 border border-emerald-600/80 text-stone-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicador de pasos */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-400 font-bold">
                  0{currentIndex + 1}
                </span>
                <div className="w-20 h-[2px] bg-stone-700 relative overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-stone-400">
                  0{slides.length}
                </span>
              </div>
            </div>
          </div>

          {/* TARJETA FOTO DERECHA: Flota en 3D con bordes bien definidos y sombra flotante */}
          <div className="lg:col-span-6 flex justify-end">
            <div className="w-full max-w-md bg-[#051c14] border-2 border-emerald-600/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-3 relative group transition-transform duration-500 hover:-translate-y-1">
              
              {/* Esquina decorativa dorada para resaltar que está en primer plano */}
             

              {/* Contenedor de la foto */}
              <div className="relative w-full h-72 md:h-80 overflow-hidden bg-black">
                <img 
                  src={current.img} 
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95"
                />
                
                {/* Capa inferior de la foto con epígrafe */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 text-[11px] font-mono text-stone-300 flex items-center justify-between">
                  <span className="truncate pr-2">{current.caption}</span>
                  <Camera className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}