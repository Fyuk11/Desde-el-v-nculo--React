
import { Brain, HeartHandshake, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LunoMethodologySection() {
  const pillars = [
    {
      id: 'sistemico',
      num: '01',
      title: 'Enfoque Sistémico',
      subtitle: 'ENTORNO & DINÁMICA FAMILIAR',
      icon: Layers,
      desc: 'El comportamiento no ocurre de forma aislada. Evaluamos la rutina, el espacio y las interacciones diarias para construir un entorno predecible y seguro.',
      highlights: [
        'Análisis de la rutina y espacios',
        'Hábitos de previsibilidad',
        'Involucramiento de toda la familia'
      ]
    },
    {
      id: 'emocional',
      num: '02',
      title: 'Gestión Emocional',
      subtitle: 'BIENESTAR & AUTORREGULACIÓN',
      icon: HeartHandshake,
      desc: 'Priorizamos el estado interno del perro antes de pedir cualquier conducta. Un sistema nervioso saturado no puede procesar ni aprender.',
      highlights: [
        'Lectura fina del lenguaje canino',
        'Reducción y gestión del estrés',
        'Fomento del descanso profundo'
      ]
    },
    {
      id: 'cognitivo',
      num: '03',
      title: 'Desarrollo Cognitivo',
      subtitle: 'APRENDIZAJE & COMUNICACIÓN',
      icon: Brain,
      desc: 'Promovemos la resolución autónoma de problemas y la toma de decisiones consciente, dejando atrás la obediencia ciega y los castigos.',
      highlights: [
        'Estimulación mental adaptada',
        'Comunicación clara y bilateral',
        'Sin métodos coercitivos ni aversivos'
      ]
    }
  ];

  return (
    /* Fondo Crema Cálido/Ahumado que suaviza la transición desde el fondo oscuro */
    <section className="relative w-full bg-[#f2ebd9] text-stone-800 py-20 px-4 overflow-hidden border-t border-amber-400/20">
      
      {/* Sutil resplandor cálido de fondo para afianzar la calidez */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#02120d]/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-5xl font-serif text-emerald-950 tracking-tight font-medium">
            Nuestra Metodología
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-light leading-relaxed">
            Un abordaje integral pensado para entender las causas de la conducta y trabajar desde la raíz, respetando la naturaleza de cada perro.
          </p>
        </div>

        {/* Tarjetas elevadas sobre el fondo crema para destacar el contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className="bg-[#fdfbf7] border border-[#e2d8c3] hover:border-amber-500/80 transition-all duration-300 p-6 md:p-7 rounded-tr-3xl flex flex-col justify-between shadow-md hover:shadow-xl relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <span className="text-2xl font-mono font-bold text-amber-700">
                      {pillar.num}
                    </span>
                    <div className="p-2.5 bg-[#082b20] text-amber-300 rounded-sm shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-900 font-bold uppercase">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-xl font-serif text-emerald-950 font-semibold">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>

                {/* Puntos destacados */}
                <ul className="mt-6 pt-4 border-t border-stone-200 space-y-2">
                  {pillar.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-[11px] text-stone-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bloque Destacado de Cierre en Verde para retomar el hilo conductor */}
        <div className="bg-[#041d16] text-stone-100 p-6 md:p-8 rounded-tr-3xl border-l-4 border-amber-400 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> COMPROMISO DE BIENESTAR
            </span>
            <h4 className="text-xl md:text-2xl font-serif text-white font-normal">
              Educación basada en la confianza, no en el temor.
            </h4>
            <p className="text-emerald-100/80 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
              Construimos hábitos duraderos enseñándole a tu perro a autorregularse en la vida real, fortaleciendo el vínculo afectivo sin necesidad de castigos ni herramientas aversivas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}