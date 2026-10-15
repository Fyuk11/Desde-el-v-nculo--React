import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GUIAS_DATA = [
  {
    id: 'pdf-1',
    tag: 'DIAGNÓSTICO INICIAL',
    tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    accentColor: 'border-l-amber-500',
    meta: 'Documento de Evaluación • Vínculo Actual',
    title: '¿Dónde está parado tu vínculo hoy?',
    description: 'Evaluación fundamental para mapear el estado actual de la relación, la carga de estrés y los puntos de fricción diarios.',
    fileUrl: '/docs/Donde esta parado tu vinculo hoy.pdf',
    coverImage: '/images/biblioteca/pdf1.webp'
  },
  {
    id: 'pdf-2',
    tag: 'LECTURA CORPORAL',
    tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    accentColor: 'border-l-orange-500',
    meta: 'Manual Práctico • Microsentimientos',
    title: '¿Qué te está diciendo tu perro y no estás viendo?',
    description: 'Guía de campo para descodificar las señales sutiles de tensión antes de que se transformen en reactividad.',
    fileUrl: '/docs/Que te esta diciendo tu perro y no estas viendo.pdf',
    coverImage: '/images/biblioteca/pdf2.webp'
  },
  {
    id: 'pdf-3',
    tag: 'PROTOCOLO DE RESPUESTA',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    accentColor: 'border-l-blue-500',
    meta: 'Guía Operativa • Intervención',
    title: 'Cómo responder correctamente a tu compañero canino',
    description: 'Estrategias de co-regulación y pautas de acción consciente ante situaciones de activación y desconcierto.',
    fileUrl: '/docs/Como responder correctamente a tu companero canino.pdf',
    coverImage: '/images/biblioteca/pdf3.webp'
  },
  {
    id: 'pdf-4',
    tag: 'FUNDAMENTOS',
    tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    accentColor: 'border-l-emerald-500',
    meta: 'Consulta Esencial',
    title: '5 Claves para comprender el lenguaje de tu perro',
    description: 'Los pilares etológicos indispensables para entender la comunicación no verbal y el universo emocional canino.',
    fileUrl: '/docs/5 Claves para comprender el lenguaje de tu perro.pdf',
    coverImage: '/images/biblioteca/pdf4.webp'
  },
  {
    id: 'pdf-5',
    tag: 'REGULACIÓN',
    tagColor: 'bg-teal-500/20 text-teal-400 border-teal-500/40',
    accentColor: 'border-l-teal-500',
    meta: 'Protocolo de Paz • Hogar',
    title: 'El Código de la Calma',
    description: 'Diseño de entornos de descompresión y herramientas somáticas para bajar las revoluciones en casa.',
    fileUrl: '/docs/El Código de la Calma.pdf',
    coverImage: '/images/biblioteca/juego3_refugio.webp'
  },
  {
    id: 'pdf-6',
    tag: 'AUTONOMÍA',
    tagColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    accentColor: 'border-l-cyan-500',
    meta: 'Guía de Vínculo • Seguridad',
    title: 'Independencia Saludable',
    description: 'Cómo fomentar la seguridad emocional y prevenir la hiperapego sin descuidar el apego seguro.',
    fileUrl: '/docs/Independencia Saludable.pdf',
    coverImage: '/images/biblioteca/juego4_umbral.webp'
  },
  {
    id: 'pdf-7',
    tag: 'PASEO TÁCTICO',
    tagColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    accentColor: 'border-l-rose-500',
    meta: 'Manual Urbano • Correa',
    title: 'Paseo en Sintonía',
    description: 'Estrategias de gestión de umbrales, manejo consciente de la correa y cruce de estímulos urbanos.',
    fileUrl: '/docs/Paseo en Sintonia.pdf',
    coverImage: '/images/biblioteca/juego2_paseo.webp'
  },
  {
    id: 'pdf-8',
    tag: 'REGISTRO DIARIO',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    accentColor: 'border-l-purple-500',
    meta: 'Kit de Trackers • Imprescriptible',
    title: 'Tu Diario de Sintonía: Kit de Trackers de Convivencia Consciente',
    description: 'Cuaderno de bitácora y planillas de seguimiento diario para evaluar los avances y patrones del vínculo.',
    fileUrl: '/docs/Tu Diario de Sintonia Kit de Trackers de Convivencia Consciente.pdf',
    coverImage: '/images/biblioteca/juego5_respira.webp'
  }
];

export default function GuiasGrid() {
  const [activePdfUrl, setActivePdfUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');

  const abrirVisor = (pdf) => {
    setActivePdfUrl(pdf.fileUrl);
    setActiveTitle(pdf.title);
  };

  const cerrarVisor = () => {
    setActivePdfUrl(null);
    setActiveTitle('');
  };

  return (
    <div className="space-y-8">
      
      {/* Encabezado editorial */}
      <div className="border-l-2 border-amber-500 pl-4 py-1">
        <h2 className="text-xl md:text-2xl font-serif text-stone-100 font-bold tracking-wide">
          Documentación Etológica de Consulta
        </h2>
        <p className="text-xs text-stone-400 font-light mt-1 max-w-2xl leading-relaxed">
          Materiales en formato digital preparados para lectura en tablet, e-reader o impresión de alta calidad.
        </p>
      </div>

      {/* Lista Rectangular de Documentos con Miniaturas */}
      <div className="space-y-4">
        {GUIAS_DATA.map((pdf) => (
          <div 
            key={pdf.id}
            id={pdf.id}
            className={`bg-[#141615] border border-[#26211C] hover:border-amber-500/50 p-5 md:p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group border-l-4 ${pdf.accentColor}`}
          >
            {/* Contenido e Información */}
            <div className="flex items-start md:items-center gap-5 max-w-2xl">
              
              {/* Miniatura / Cover Preview */}
              <div className="w-16 h-20 md:w-20 md:h-24 bg-stone-900 border border-stone-800 shrink-0 overflow-hidden relative rounded-sm shadow-md hidden sm:block">
                <img 
                  src={pdf.coverImage} 
                  alt={pdf.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1 right-1 text-[8px] font-mono text-amber-400 font-bold">PDF</span>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono">
                  <span className={`px-2 py-0.5 border uppercase font-bold tracking-wider ${pdf.tagColor}`}>
                    {pdf.tag}
                  </span>
                  <span className="text-stone-400 font-mono">{pdf.meta}</span>
                </div>

                <h3 className="text-lg md:text-xl font-serif text-stone-100 font-bold group-hover:text-amber-200 transition-colors">
                  {pdf.title}
                </h3>

                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  {pdf.description}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-auto">
              <button 
                onClick={() => abrirVisor(pdf)}
                className="px-5 py-3 bg-[#1A1E1C] hover:bg-amber-950/40 text-stone-200 hover:text-amber-300 border border-[#2E3833] hover:border-amber-500/50 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>📖</span>
                <span>VER EN PANTALLA</span>
              </button>

              <a 
                href={pdf.fileUrl} 
                download 
                className="p-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-colors cursor-pointer shadow-md flex items-center justify-center text-sm"
                title="Descargar PDF"
              >
                ↓
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 📖 MODAL DE LECTURA EN PANTALLA COMPLETA */}
      <AnimatePresence>
        {activePdfUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Header del Lector */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-stone-200">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                  LECTOR DIGITAL
                </span>
                <h3 className="text-sm md:text-base font-serif font-bold text-white truncate max-w-md">
                  {activeTitle}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href={activePdfUrl} 
                  download 
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-mono font-bold uppercase transition-colors"
                >
                  Descargar PDF ↓
                </a>
                <button 
                  onClick={cerrarVisor}
                  className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  ✕ CERRAR
                </button>
              </div>
            </div>

            {/* Visor de PDF */}
            <div className="flex-1 w-full my-4 bg-stone-950 border border-stone-800 rounded-sm overflow-hidden">
              <iframe 
                src={`${activePdfUrl}#toolbar=0`} 
                title={activeTitle}
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer del Lector */}
            <div className="text-center text-[10px] font-mono text-stone-500 uppercase tracking-widest pt-2">
              Desde el Vínculo — Sistema Etológico de Lectura
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}