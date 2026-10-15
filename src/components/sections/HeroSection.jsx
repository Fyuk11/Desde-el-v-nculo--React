import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ThreadsBackground from '../backgrounds/ThreadsBackground'; 


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-brand-bg text-brand-dark">
      {/* Fondo Interactivo (color sage suavizado para el fondo crema) */}
      <ThreadsBackground color="#4A6454" amplitude={1.2} distance={2} />

      {/* Overlay de degradado cálido para integración de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/40 to-brand-bg pointer-events-none z-10" />

      {/* Halo orgánico sutil en esquina superior derecha */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#E2EBE5]/60 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Mensaje y CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Tag / Badge superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-brand-border bg-brand-card/90 backdrop-blur-sm rounded-full mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-sage font-semibold">
                Educación Canina Sistémico-Emocional-Cognitivo
              </span>
            </div>

            {/* Titular Principal */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal leading-[1.08] text-brand-dark mb-8">
              Tu perro no necesita ser dominado.{' '}
              <span className="italic font-normal text-brand-sage block mt-2">
                Necesita ser comprendido.
              </span>
            </h1>

            {/* Bajada del Titular */}
            <p className="text-base sm:text-lg text-brand-muted font-normal max-w-2xl leading-relaxed mb-10">
              Transformamos la convivencia desde las bases neurobiológicas y emocionales. Sin violencia, sin sometimiento y respetando la naturaleza única de tu compañero.
            </p>

            {/* Botones de CTA (Priorizando la exploración de programas) */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#programas"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-sage text-white text-xs uppercase tracking-[0.2em] font-medium rounded-xl hover:bg-brand-sage-dark transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span>Explorar Cursos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#luno"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-card border border-brand-border text-brand-dark text-xs uppercase tracking-[0.2em] font-medium rounded-xl hover:border-brand-sage/50 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <span>Evaluar a mi Perro con Luno AI</span>
              </a>
            </div>

            {/* Métricas con textos refinados */}
            <div className="mt-14 pt-8 border-t border-brand-border grid grid-cols-3 gap-6 sm:gap-12 w-full">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-brand-dark font-semibold">100%</p>
                <p className="text-xs text-brand-muted uppercase tracking-wider mt-1 font-medium">Sin violencia</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-brand-sage font-semibold">+1.2k</p>
                <p className="text-xs text-brand-muted uppercase tracking-wider mt-1 font-medium">Familias guiadas</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-brand-dark font-semibold">3.0</p>
                <p className="text-xs text-brand-muted uppercase tracking-wider mt-1 font-medium">Modelo Cognitivo</p>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Imagen de Arco Asimétrica */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Marco decorativo de borde fino */}
              <div className="absolute -inset-3 border border-brand-sage/30 rounded-t-[12rem] rounded-b-xl pointer-events-none translate-x-3 translate-y-3" />

              {/* Contenedor principal de la Imagen en forma de Arco */}
              <div className="relative z-10 w-full aspect-[4/5] bg-[#E8E4D9] rounded-t-[12rem] rounded-b-xl overflow-hidden border border-brand-border shadow-xl">
                <img
                  src="/images/home/hero-img1.webp"
                  alt="Perro mirando a su humano con calma"
                  className="w-full h-full object-cover contrast-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                
                {/* Micro-badge sobre la imagen */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-brand-card/90 backdrop-blur-md border border-brand-border rounded-xl shadow-md">
                  <p className="font-serif text-sm italic text-brand-dark text-center">
                    "El vínculo no se exige, se construye día a día."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}