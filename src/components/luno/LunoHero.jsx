import { Sparkles, Activity, ShieldCheck, ArrowDown, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LunoHero({ 
  onStartDiagnosis, 
  videoDesktopUrl = "/videos/LunoHeroDesktop.mp4",
  videoMobileUrl = "/videos/LunoHeroMobile.mp4" 
}) {

  const handleStartDiagnosis = () => {
    // Si pasaste una función por props la ejecuta
    if (onStartDiagnosis) {
      onStartDiagnosis();
    }
    // Hace scroll suave hacia el wizard
    const section = document.getElementById('diagnostico');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex flex-col justify-start md:justify-center overflow-hidden pt-12 md:pt-24 pb-12 md:pb-16 px-4 md:px-12 border-b border-[#2A2D2B]">
      
      {/* 1. VIDEO DE FONDO COMPLETO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Video Desktop */}
        <video
          src={videoDesktopUrl}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover object-right opacity-100"
        />

        {/* Video Mobile */}
        <video
          src={videoMobileUrl}
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover object-center opacity-100"
        />

        {/* Gradiente sutil para acoplar la parte inferior */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/60 to-transparent pointer-events-none" />
      </div>

      {/* Glow verde ambiental */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#4A6758]/20 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 2. CONTENIDO */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-center pt-[440px] md:pt-0">
        
        {/* COLUMNA IZQUIERDA: Textos */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left">
          
          {/* Badge de Estado Luno AI */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121413]/90 backdrop-blur-md border border-[#4A6758]/50 text-xs font-mono text-[#82A993] shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
            </span>
            <span className="tracking-wide">LUNO ONLINE • Evaluación Canina</span>
          </div>

          {/* Bloque de Textos */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#E8E6E1] tracking-tight leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Comprendé la mente y las emociones de tu perro con <br className="hidden sm:inline" />
              <span className="italic text-[#82A993] drop-shadow-[0_0_25px_rgba(130,169,147,0.4)]">
                Luno
              </span>
            </h1>

            <p className="text-sm md:text-lg text-[#E3E0DA] md:text-[#A3A099] leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Un método guiado de evaluación neurobiológica. Identificá la etapa vital de tu compañero, evaluá sus indicadores de estrés y recibí un diagnóstico claro con la recomendación exacta para su bienestar.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="pt-1 md:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 max-w-lg">
            <button
              onClick={handleStartDiagnosis}
              className="px-8 py-4 rounded-xl bg-[#82A993] hover:bg-[#6C927D] text-[#0C0D0D] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_25px_rgba(130,169,147,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Comenzar Diagnóstico</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <Link
              to="/#programas"
              className="px-8 py-4 rounded-xl bg-[#121413]/85 backdrop-blur-md border border-[#2A2D2B] hover:border-[#4A6758] text-[#E8E6E1] font-medium text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#82A993]" />
              <span>Conocer Programas</span>
            </Link>
          </div>

          {/* Highlights Inferiores */}
          <div className="pt-3 md:pt-6 border-t border-[#2A2D2B]/60 grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-4 text-xs text-[#A3A099] max-w-xl">
            <div className="flex items-center gap-2 bg-[#121413]/70 backdrop-blur-sm p-2.5 rounded-lg border border-[#2A2D2B]/50">
              <ShieldCheck className="w-4 h-4 text-[#82A993] shrink-0" />
              <span>Bases Neurobiológicas</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121413]/70 backdrop-blur-sm p-2.5 rounded-lg border border-[#2A2D2B]/50">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Segmentación Vital</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121413]/70 backdrop-blur-sm p-2.5 rounded-lg border border-[#2A2D2B]/50 col-span-2 sm:col-span-1">
              <Activity className="w-4 h-4 text-[#82A993] shrink-0" />
              <span>100% Interactivo</span>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="hidden lg:block lg:col-span-5 h-full min-h-[400px] pointer-events-none" />

      </div>
    </section>
  );
}