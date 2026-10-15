import { motion } from 'framer-motion';
import { Brain, Eye, HeartPulse, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Brain,
    number: '01',
    title: 'Neurobiología y Estrés',
    description: 'Comprendemos cómo el cortisol, la serotonina y el sistema nervioso autónomo determinan el comportamiento. No corregimos síntomas; abordamos la causa biológica.',
  },
  {
    icon: Eye,
    number: '02',
    title: 'Lenguaje Sutil y Lectura',
    description: 'Aprendemos a interpretar micro-señales de calma, mirada, tensión muscular y postura. Tu perro se comunica constantemente antes de llegar al ladrido.',
  },
  {
    icon: HeartPulse,
    number: '03',
    title: 'Co-Regulación Emocional',
    description: 'Tu estado emocional impacta directamente en tu compañero. Desarrollamos herramientas de autorregulación del tutor para transmitir seguridad real y constante.',
  },
];

export default function MethodologySection() {
  return (
    <section id="metodologia" className="relative min-h-screen py-32 flex items-center overflow-hidden bg-[#121413]">
      
      {/* Video de Fondo con tratamiento cinemático */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
        >
          <source
            src="/videos/3.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlays de transición suave */}
        <div className="absolute inset-0 bg-[#121413]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121413] via-transparent to-[#121413]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* ENCABEZADO */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#E2DFD7]/40 bg-[#F4F1EA] rounded-full mb-6 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#3F5E4D]" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#3F5E4D] font-bold">
              Bases del Modelo Cognitivo
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F4F1EA] leading-[1.1] mb-6 drop-shadow-md">
            Una metodología basada en la{' '}
            <span className="italic font-normal text-[#C2D6C8] block sm:inline mt-1 sm:mt-0">
              ciencia y el respeto.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#E2DFD7] font-light leading-relaxed drop-shadow-sm max-w-2xl">
            Alejados del adiestramiento tradicional de premios y castigos. Nos enfocamos en la neurobiología del aprendizaje y en la salud emocional de la familia interespecie.
          </p>
        </div>

        {/* 3 PILARES CON GLASSMORPHISM CREMA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative bg-[#F4F1EA]/90 backdrop-blur-md border border-[#FFFFFF]/60 hover:border-[#3F5E4D]/40 rounded-2xl p-8 sm:p-10 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              >
                {/* Micro Glow Verde Suave en Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3F5E4D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div>
                  {/* Icono y Número */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="p-3 bg-[#EAE6DC] border border-[#D5D0C3] rounded-xl text-[#3F5E4D] group-hover:bg-[#3F5E4D] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-4xl font-normal text-[#3F5E4D]/30 group-hover:text-[#3F5E4D] transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="font-serif text-2xl font-normal text-[#1C1F1D] mb-4 group-hover:text-[#3F5E4D] transition-colors relative z-10">
                    {pillar.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-[#4A4F4C] font-light leading-relaxed relative z-10">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer del Pilar */}
                <div className="mt-8 pt-6 border-t border-[#D5D0C3]/60 flex items-center gap-2 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[#3F5E4D]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#636865] font-semibold">
                    Pilar Fundamental
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}