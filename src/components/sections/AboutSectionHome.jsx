import { ArrowRight, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSectionHome() {
  return (
    <section className="py-16 md:py-24 bg-[#EAE6DC] text-[#222523] border-t border-[#D5D0C3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* FOTO EDITORIAL */}
        <div className="md:col-span-5">
          <div className="relative p-2.5 sm:p-3 bg-[#FFFFFF] border border-[#D5D0C3] rounded-2xl shadow-lg">
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#D5D0C3]">
              <img 
                src="/images/home/sobre-miv1.webp" 
                alt="Rodrigo - Educador Canino" 
                className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/400x500/D5D0C3/3F5E4D?text=Rodrigo+y+Compa%C3%B1ero"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white text-xs bg-black/40 backdrop-blur-md p-2.5 sm:p-3 rounded-lg border border-white/10 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">Educador Canino & Fundador</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO TEXTO */}
        <div className="md:col-span-7 space-y-4 sm:space-y-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#3F5E4D] font-bold block">
            Sobre el Fundador
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1C1F1D] leading-tight font-normal">
            Educando desde la empatía emocional y la ciencia etológica.
          </h2>

          <p className="text-sm md:text-base text-[#525754] font-light leading-relaxed">
            Hola, soy Rodrigo. Siempre vi a los perros como lo que son: seres sintientes, cada uno con su propia personalidad. Cuando me capacité, encontré en el enfoque Sistémico-Emocional-Cognitivo, una educación canina de tercera generación, la forma de darle sustento técnico y científico a lo que Luna y Keef ya me habían enseñado. Hoy comparto lo que aprendí para que llegue a la mayor cantidad de tutores y perros posible.
          </p>

          <div className="pt-2 sm:pt-4 flex items-center gap-6">
            <Link 
              to="/sobre-mi" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#1C1F1D] font-semibold border-b-2 border-[#3F5E4D] pb-1 hover:text-[#3F5E4D] transition-colors cursor-pointer"
            >
              <span>Conocer mi historia</span>
              <ArrowRight className="w-4 h-4 text-[#3F5E4D]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}