import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Minus, 
  ChevronDown, 
  BookOpen, 
  Award,
  HeartHandshake
} from 'lucide-react';
import { products } from '../data/products';


export default function ProductDetail() {
  const { id } = useParams();

  // Buscar producto activo o fallback
  const product = products.find((item) => item.id === id) || products[0];

  // Galería de imágenes
  const productImages = product?.gallery || [
    product?.image || "https://placehold.co/600x450/181A19/82A993?text=Cover+1",
    "https://placehold.co/600x450/181A19/82A993?text=Vista+Interior",
    "https://placehold.co/600x450/181A19/82A993?text=Material+Extra"
  ];

  // Estados locales
  const [activeImage, setActiveImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState('pack');
  const [openHeroFaq, setOpenHeroFaq] = useState(null);
  
  // Estado para Ejes (Tab activa)
  

  // Estados para Luno Widget Interactivo
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  // Estado para FAQs
  const [openFaq, setOpenFaq] = useState(null);

  // Bundles
  const singleBundle = product?.bundles?.single || {
    name: product?.title || 'Acceso Individual',
    description: 'Ebook en formato digital con acceso de por vida.',
    price: product?.price || '18',
    hotmartUrl: product?.buyUrl || '#'
  };

  const packBundle = product?.bundles?.pack || {
    name: 'Pack Convivencia Completa',
    description: 'Curso Digital + Protocolos Express de Cachorros y Seniors (El mejor precio).',
    price: '24',
    hotmartUrl: product?.buyUrl || '#'
  };

  const currentBundleData = selectedBundle === 'single' ? singleBundle : packBundle;

  const heroFaqs = product?.heroFaqs || [
    { q: "¿Qué formato tiene el curso?", a: "Es un programa 100% digital e interactivo, con lectura guiada y ejercicios prácticos." },
    { q: "¿Cómo accedo al contenido?", a: "El acceso es inmediato a tu correo electrónico vía plataforma Hotmart tras realizar la compra." },
    { q: "¿Tiene garantía?", a: "Sí, cuentas con 7 días de garantía de satisfacción sin preguntas." }
  ];

  

  return (
    <div className="bg-[#0C0D0D] text-[#B5B3AD] min-h-screen font-sans pt-24 pb-16">
      
      {/* RETORNO */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#82A993] hover:text-[#93B8A3] transition-colors"
        >
          ← Volver a programas
        </Link>
      </div>

{/* ========================================== */}
      {/* 1. HERO SECTION EN CREMA CÁLIDO ORGÁNICO   */}
      {/* ========================================== */}
      <section className="relative overflow-hidden pt-10 pb-20 bg-[#F7F5F0] text-[#1C2621]">
        
        {/* Luces orgánicas tenues en tono arena / sage */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3EBE5]/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EAE7DF]/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* GALERÍA DE IMÁGENES */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#EFECE6] border border-[#E0DCD3] rounded-2xl p-6 text-center relative overflow-hidden group shadow-sm">
                {product?.badge && (
                  <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-wider text-[#2E4235] bg-[#D3E0D7] border border-[#B5C9BC] px-3 py-1 rounded-full font-bold">
                    {product.badge}
                  </span>
                )}
                
                <div className="aspect-[4/3] flex items-center justify-center my-2">
                  <img 
                    src={productImages[activeImage]} 
                    alt={product?.title || "Imagen del producto"}
                    className="max-h-full max-w-full object-contain rounded-xl transition-all duration-300 shadow-md"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/600x450/181A19/82A993?text=Ebook+Cover"; 
                    }}
                  />
                </div>
              </div>

              {/* MINIATURAS */}
              <div className="grid grid-cols-3 gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`border rounded-xl p-1.5 bg-[#EFECE6] transition-all overflow-hidden ${
                      activeImage === idx 
                        ? 'border-[#2E4235] ring-2 ring-[#2E4235]/20 scale-[1.02]' 
                        : 'border-[#E0DCD3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-14 w-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>

              {/* FEATURES */}
              <div className="bg-[#EFECE6] border border-[#E0DCD3] rounded-2xl p-5 mt-4 space-y-3 shadow-sm">
                <h4 className="text-xs uppercase tracking-wider text-[#1C2621] font-bold mb-3">
                  ¿Qué incluye este programa?
                </h4>
                {(product?.features || [
                  "Metodología respetuosa basada en etología canina",
                  "Acceso ilimitado de por vida y actualizaciones",
                  "Guías en formato digital descargable (PDF)",
                  "Estrategias de aplicación práctica paso a paso"
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3E4A43] font-medium">
                    <Check className="w-4 h-4 text-[#2E4235] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CHECKOUT & BUNDLES (Tarjeta destacada para dar peso al CTA) */}
            <div className="lg:col-span-6 space-y-6 bg-[#EFECE6]/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#E0DCD3] shadow-md">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#1C2621] mb-3 leading-tight">
                  {product?.title}
                </h1>
                <p className="text-xs md:text-sm text-[#4A554E] leading-relaxed">
                  {product?.subtitle || product?.description}
                </p>
              </div>

              {/* BUNDLES */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#2E4235] block font-bold">
                  Selecciona tu opción de acceso:
                </span>

                <div 
                  onClick={() => setSelectedBundle('pack')}
                  className={`p-4 border rounded-xl cursor-pointer transition-all relative flex items-center justify-between ${
                    selectedBundle === 'pack' 
                      ? 'bg-[#F7F5F0] border-[#2E4235] shadow-md ring-1 ring-[#2E4235]/30' 
                      : 'bg-[#F7F5F0]/60 border-[#D8D4C9] hover:border-[#B5C9BC]'
                  }`}
                >
                  <span className="absolute -top-2.5 right-4 text-[9px] uppercase tracking-wider bg-[#2E4235] text-[#F7F5F0] px-2.5 py-0.5 font-bold rounded-full">
                    Mejor Opción
                  </span>
                  <div className="pr-4">
                    <h4 className="text-xs font-bold text-[#1C2621] mb-0.5">{packBundle.name}</h4>
                    <p className="text-[11px] text-[#5C6860] leading-tight">{packBundle.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-[#2E4235] font-mono block">{packBundle.price} USD</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedBundle('single')}
                  className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                    selectedBundle === 'single' 
                      ? 'bg-[#F7F5F0] border-[#2E4235] shadow-md ring-1 ring-[#2E4235]/30' 
                      : 'bg-[#F7F5F0]/60 border-[#D8D4C9] hover:border-[#B5C9BC]'
                  }`}
                >
                  <div className="pr-4">
                    <h4 className="text-xs font-bold text-[#1C2621] mb-0.5">{singleBundle.name}</h4>
                    <p className="text-[11px] text-[#5C6860] leading-tight">{singleBundle.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-[#1C2621] font-mono block">{singleBundle.price} USD</span>
                  </div>
                </div>
              </div>

              {/* CTA (Verde Bosque Profundo para alto impacto de clic) */}
              <div className="pt-2">
                <a
                  href={currentBundleData.hotmartUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#2E4235] hover:bg-[#233328] text-[#F7F5F0] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <span>Comprar ahora — {currentBundleData.price} USD</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-center text-[#2E4235] mt-2 font-bold">
                  ⏳ Accedé al precio promocional por tiempo limitado
                </p>
              </div>

              {/* AUTHOR BIO */}
              <div className="flex items-center gap-3 p-3 bg-[#F7F5F0] border border-[#D8D4C9] rounded-xl">
                <img 
                  src="/images/productos/instructor.webp" 
                  alt="Rodrigo - Educador Canino" 
                  className="w-10 h-10 rounded-full object-cover border border-[#2E4235]/30"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h5 className="text-xs font-bold text-[#1C2621]">Rodrigo</h5>
                  <p className="text-[11px] text-[#5C6860]">Educador Canino · Enfoque Sistémico-Emocional-Cognitivo</p>
                </div>
              </div>

              {/* SEALS */}
              <div className="pt-2 border-t border-[#D8D4C9] flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#4A554E] font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E4235]" />
                  <span>100% digital e interactivo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#2E4235]" />
                  <span>Descargable de por vida</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#2E4235]" />
                  <span>Garantía de satisfacción</span>
                </div>
              </div>

              {/* HERO FAQS */}
              <div className="space-y-2 pt-2">
                {heroFaqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#F7F5F0] border border-[#D8D4C9] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenHeroFaq(openHeroFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left flex justify-between items-center text-xs font-bold text-[#1C2621] hover:bg-[#EFECE6] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#2E4235] transition-transform ${openHeroFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openHeroFaq === idx && (
                      <div className="p-3.5 pt-0 text-[11px] text-[#5C6860] border-t border-[#E0DCD3] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. PROCESO DE TRANSFORMACIÓN (RENOVADO)    */}
      {/* ========================================== */}
      <section className="py-20 bg-[#131815] border-y border-[#212D26] relative overflow-hidden">
        {/* Adorno de fondo verde muy sutil */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#82A993]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-widest text-[#82A993] font-semibold bg-[#1D2923] px-3 py-1 rounded-full border border-[#2B3E35] mb-3 inline-block">
              Metodología Paso a Paso
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#F3F2EF] mb-3">
              Tu proceso de transformación mutua
            </h2>
            <p className="text-xs md:text-sm text-[#A3A099]">
              Estructura cronológica para evolucionar de la tensión a la colaboración genuina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Línea conectora horizontal (sólo pantallas grandes) */}
            <div className="hidden md:block absolute top-28 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#82A993]/40 to-transparent z-0" />

            {(product?.phases || [
              {
                number: "01",
                title: "Comprensión del Lenguaje",
                description: "Aprende a identificar las señales sutiles de estrés, calma y comunicación que tu perro emite diariamente.",
                img: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&auto=format&fit=crop&q=80"
              },
              {
                number: "02",
                title: "Ajuste del Entorno",
                description: "Optimiza las rutinas de descanso, paseos y estimulación mental para reducir los niveles de cortisol.",
                img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80"
              },
              {
                number: "03",
                title: "Vínculo y Confianza",
                description: "Consolida hábitos saludables donde tu perro no obedezca por miedo sino por cooperación espontánea.",
                img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&auto=format&fit=crop&q=80"
              }
            ]).map((phase, idx) => (
              <div 
                key={idx} 
                className="bg-[#18201C] border border-[#2A3B32] rounded-2xl p-6 relative z-10 flex flex-col justify-between hover:border-[#82A993] transition-all group shadow-xl"
              >
                <div>
                  {/* Número Gigante de Fondo */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-serif font-bold text-[#82A993]/30 group-hover:text-[#82A993] transition-colors">
                      {phase.number}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#82A993] bg-[#111613] px-2.5 py-1 rounded-md border border-[#212D26]">
                      Fase {idx + 1}
                    </span>
                  </div>

                  <div className="h-40 rounded-xl overflow-hidden mb-5 border border-[#212D26]">
                  <img 
                      src={phase.img || phase.image || "https://placehold.co/600x400/181A19/82A993?text=Fase"} 
                      alt={phase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  </div>

                  <h3 className="text-base font-semibold text-[#F3F2EF] mb-2">{phase.title}</h3>
                  <p className="text-xs text-[#A3A099] leading-relaxed mb-4">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ========================================== */}
{/* 3. CONTENIDO / EJES / CONTENIDO DEL PACK   */}
{/* ========================================== */}
{product?.ejes && product.ejes.length > 0 && (
  <section className="py-20 bg-[#F7F5F0] text-[#1C2621] relative">
    <div className="max-w-6xl mx-auto px-6">
      
      {/* Encabezado Dinámico */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1C2621] mb-3">
          {product.ejesTitle || "Lo que vas a aprender paso a paso"}
        </h2>
        <p className="text-sm md:text-base text-[#5A635E] leading-relaxed">
          {product.ejesSubtitle || "Un recorrido estructurado y respetuoso para comprender la mente y emociones de tu perro."}
        </p>
      </div>

      {/* Grid Dinámico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {product.ejes.map((eje, idx) => {
          const isFeatured = idx === 0;

          // Etiqueta dinámica: si el producto define ejeType ("Ebook", "Tema", "Módulo"), la usa; si no, decide segun la data.
          const badgeLabel = eje.label || `${product.ejeType || 'Módulo'} 0${idx + 1}`;

          return (
            <div 
              key={eje.id || idx}
              className={`bg-white rounded-3xl p-6 border border-[#E5E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between ${
                isFeatured ? 'md:col-span-2 md:flex-row md:items-center gap-6' : ''
              }`}
            >
              <div className={`${isFeatured ? 'md:w-1/2' : 'w-full'}`}>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 md:mb-0 bg-[#EFECE3]">
                  <img 
                    src={eje.image || "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&auto=format&fit=crop&q=80"} 
                    alt={eje.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1C2621] font-mono text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {badgeLabel}
                  </span>
                </div>
              </div>

              <div className={`flex flex-col justify-between ${isFeatured ? 'md:w-1/2' : 'w-full'}`}>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-[#1C2621] mb-2">
                    {eje.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#5A635E] leading-relaxed">
                    {eje.desc || eje.description || "Herramientas teóricas y ejercicios prácticos adaptados a la rutina real con tu compañero."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </section>
)}

      {/* ========================================== */}
      {/* 4. LUNO ASISTENTE                            */}
      {/* ========================================== */}
      {product?.interactiveQuiz && product.interactiveQuiz.length > 0 && (
        <section className="py-24 animate-mesh-bg text-[#F7F5F0] relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            
            {/* Cabezal */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#F7F5F0] mb-3">
                ¿Cómo respondería Luno en tu caso?
              </h2>
              <p className="text-xs md:text-sm text-[#B8C4B5] max-w-lg mx-auto leading-relaxed">
                Elegí la situación que más te identifique para ver cómo abordamos el comportamiento desde el vínculo.
              </p>
            </div>

            {/* Tarjeta Principal Flotante */}
            <div className="bg-[#FAF9F5] text-[#1C2621] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#EAE7DC] relative">
              
              {/* Perfil de Luno Header */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#EDEADF]">
                <img 
                  src="/images/luno-avatar.png" 
                  alt="Luno" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#4A6454] shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#1C2621]">Luno AI</h4>
                  <p className="text-xs text-[#4A6454]">Asistente de Consulta Etológica</p>
                </div>
                <span className="ml-auto text-[11px] font-mono font-medium text-[#7A857F] bg-[#EFECE3] px-3 py-1 rounded-full">
                  Caso {activeQuestion + 1} de {product.interactiveQuiz.length}
                </span>
              </div>

              {/* Pregunta Activa */}
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-medium text-[#1C2621] leading-snug">
                  {product.interactiveQuiz[activeQuestion]?.question}
                </h3>
              </div>

              {/* Opciones de Selección */}
              <div className="space-y-3 mb-6">
                {product.interactiveQuiz[activeQuestion]?.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt.answer;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(opt.answer)}
                      className={`w-full p-4 text-left text-xs md:text-sm rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#4A6454] text-white border-[#4A6454] shadow-md'
                          : 'bg-white text-[#3A4540] border-[#E2DFD5] hover:border-[#4A6454]/60 hover:bg-[#F7F5F0]'
                      }`}
                    >
                      <span className="font-medium pr-4">{opt.text}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-white bg-white' : 'border-[#C2BEB0]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#4A6454]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Respuesta Etológica */}
              {selectedAnswer && (
                <div className="p-5 rounded-2xl bg-[#EEFAF1] border border-[#BDE5C8] text-xs md:text-sm text-[#1E422A] leading-relaxed mb-6 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-semibold text-[#2D6A42] mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#2D6A42]" />
                    <span>Mirada Etológica de Luno:</span>
                  </div>
                  <p className="text-[#234A31]">{selectedAnswer}</p>
                </div>
              )}

              {/* Controles de navegación */}
              <div className="pt-4 border-t border-[#EDEADF] flex items-center justify-between">
                <div className="flex gap-2">
                  {product.interactiveQuiz.map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeQuestion ? 'w-6 bg-[#4A6454]' : 'w-2 bg-[#DEDAD0]'
                      }`}
                    />
                  ))}
                </div>

                {activeQuestion < product.interactiveQuiz.length - 1 ? (
                  <button
                    onClick={() => {
                      setActiveQuestion(prev => prev + 1);
                      setSelectedAnswer(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24332A] text-white text-xs font-medium hover:bg-[#324538] transition shadow-sm"
                  >
                    <span>Siguiente situación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setActiveQuestion(0);
                      setSelectedAnswer(null);
                    }}
                    className="text-xs text-[#4A6454] hover:underline font-medium"
                  >
                    ↺ Empezar de nuevo
                  </button>
                )}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* 5. TESTIMONIOS Y PRUEBA SOCIAL             */}
      {/* ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-serif text-[#F3F2EF] mb-3">
            Lo que dicen quienes ya hicieron el cambio
          </h2>
          <p className="text-xs text-[#B5B3AD]">
            Historias reales de tutores que transformaron la relación con sus compañeros caninos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#121413] border border-[#2A2D2B] p-6 rounded-2xl relative shadow-xl">
            <p className="text-xs md:text-sm text-[#E8E6E1] italic leading-relaxed mb-4">
              "Estaba muy frustrada con los métodos de adiestramiento tradicionales que solo me pedían exigirle órdenes vacías a Bruno. Este curso me dio la sensibilidad y el sustento científico para comprenderlo."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-[#2A2D2B]">
              <HeartHandshake className="w-5 h-5 text-[#82A993]" />
              <div>
                <h5 className="text-xs font-semibold text-[#F3F2EF]">Natalia S. y Bruno</h5>
                <span className="text-[10px] text-[#82A993]">Tutoría Canina Guiada</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121413] border border-[#2A2D2B] p-6 rounded-2xl relative shadow-xl">
            <p className="text-xs md:text-sm text-[#E8E6E1] italic leading-relaxed mb-4">
              "Entender los niveles de ansiedad y no tapar los síntomas con premios o castigos cambió la dinámica del hogar por completo. Hoy caminamos flojos de correa y disfrutamos los paseos."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-[#2A2D2B]">
              <HeartHandshake className="w-5 h-5 text-[#82A993]" />
              <div>
                <h5 className="text-xs font-semibold text-[#F3F2EF]">Matías G. y Luna</h5>
                <span className="text-[10px] text-[#82A993]">Programa de Convivencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* ========================================== */}
{/* 6. ¿POR QUÉ ELEGIR ESTE CAMINO?           */}
{/* ========================================== */}
<section className="py-20 bg-[#121413] border-y border-[#2A2D2B]">
  <div className="max-w-6xl mx-auto px-6 md:px-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      
      <div className="lg:col-span-5">
        <div className="rounded-2xl overflow-hidden border border-[#2A2D2B] shadow-2xl relative">
          <img 
            src="/images/productos/por que elegir.webp" 
            alt="Tutora abrazando a su perro"
            className="w-full h-[380px] object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x800/181A19/82A993?text=V%C3%ADnculo+Canino";
            }}
          />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif text-[#F3F2EF] leading-tight">
          ¿Por qué elegir este camino?
        </h2>
        <div className="space-y-3 text-xs md:text-sm text-[#B5B3AD] leading-relaxed">
          <p>
            Porque no buscamos perros autómatas que obedezcan por miedo o sumisión; buscamos perros equilibrados y tutores conscientes.
          </p>
          <p className="italic text-[#E8E6E1]">
            "Educando desde el Vínculo" no es un manual de recetas mágicas, es un cambio de perspectiva definitivo.
          </p>
          <p>
            Este programa fusiona los últimos avances de la ciencia del comportamiento canino con la empatía emocional, brindándote un método sistémico donde tu propia calma y la comprensión del entorno son los pilares fundamentales.
          </p>
        </div>

        <div className="pt-4">
        <a
  href={
    product?.id === 'pack-completo'
      ? (product?.bundles?.pack?.hotmartUrl || product?.bundles?.single?.hotmartUrl)
      : (product?.bundles?.single?.hotmartUrl || product?.hotmartUrl || '#')
  }
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#82A993] hover:bg-[#93B8A3] text-[#0C0D0D] text-xs uppercase tracking-widest font-bold rounded-lg transition-all shadow-lg cursor-pointer"
>
  <span>Comenzar el cambio hoy</span>
  <ArrowRight className="w-4 h-4" />
</a>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ========================================== */}
      {/* 7. FAQS GENERALES                          */}
      {/* ========================================== */}
      {product?.faqs && product.faqs.length > 0 && (
        <section className="py-20 max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-[#F3F2EF] text-center mb-8">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-3">
            {product.faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#121413] border border-[#2A2D2B] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs md:text-sm font-semibold text-[#F3F2EF]"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <Minus className="w-4 h-4 text-[#82A993]" /> : <Plus className="w-4 h-4 text-[#B5B3AD]" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#B5B3AD] border-t border-[#2A2D2B]/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}