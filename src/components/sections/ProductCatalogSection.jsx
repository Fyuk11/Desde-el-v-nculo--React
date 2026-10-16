import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Star, Award, CheckCircle2 } from 'lucide-react';
import { products } from '../../data/products'; 

export default function ProductCatalogSection() {
  return (
    <section id="programas" className="relative py-28 bg-[#F4F1EA] text-[#222523] border-t border-[#E2DFD7] overflow-hidden">
      
      {/* Detalle decorativo de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8E3D5]/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#E2DFD7] pb-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C1F1D] leading-tight">
              Programas de transformación{' '}
              <span className="italic font-normal text-[#3F5E4D] block sm:inline mt-1 sm:mt-0">
                guiada y honesta.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#525754] font-light max-w-md leading-relaxed">
            Formaciones diseñadas para aplicar desde el primer día, con material audiovisual en alta definición y metodologías respetuosas.
          </p>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product, idx) => {
            const isFeatured = product.featured || idx === 0;
            const isPack = product.id === 'pack-completo' || product.isPack;

            // PRECIO CORRECTO
            const priceDisplay = isPack
              ? (product.bundles?.pack?.price || 24)
              : (product.price || product.bundles?.single?.price || 18);

            // LINK DE HOTMART CORRECTO
            const hotmartLink = isPack
              ? (product.bundles?.pack?.hotmartUrl || product.buyUrl || "#")
              : (product.bundles?.single?.hotmartUrl || product.buyUrl || "#");

            const descriptionText = product.subtitle || product.description;

            return (
              <motion.article
                key={product.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`bg-[#FFFFFF] border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  isFeatured 
                    ? 'md:col-span-2 border-[#3F5E4D]/40 ring-1 ring-[#3F5E4D]/20' 
                    : 'border-[#E2DFD7] hover:border-[#3F5E4D]/40'
                }`}
              >
                {/* 1. PRODUCTO DESTACADO (ANCHO COMPLETO - 2 COLUMNAS) */}
                {isFeatured ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                    
                    {/* Imagen del producto destacado */}
                    <div className="lg:col-span-5 relative bg-[#EAE6DC] overflow-hidden flex items-center justify-center p-8">
                      <div className="relative w-full aspect-square max-w-[380px] overflow-hidden rounded-xl shadow-md">
                        <img
                          src={product.image || "/images/ebook-mockup.png"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x600/EAE6DC/3F5E4D?text=Educando+Desde+el+V%C3%ADnculo";
                          }}
                        />
                      </div>

                      {/* Tag Flotante */}
                      <div className="absolute top-5 left-5 z-10 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full bg-[#1C1F1D] text-[#D4AF37] shadow-md inline-flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {product.badge || "Programa Estrella · Más Vendido"}
                        </span>
                      </div>
                    </div>

                    {/* Contenido Informativo */}
                    <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFFFF]">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="text-[11px] uppercase tracking-[0.2em] text-[#3F5E4D] font-bold">
                            {isPack ? "Pack de Formación Completo" : "Curso Digital Completo"}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium bg-[#FFFDF5] px-2.5 py-1 rounded-md border border-[#F3E5AB]">
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                            <span>4.9 / 5 (+500 familias)</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#1C1F1D] mb-4 group-hover:text-[#3F5E4D] transition-colors leading-tight">
                          {product.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#525754] font-light leading-relaxed mb-6">
                          {descriptionText}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mb-8 pt-2">
                          <div className="flex items-center gap-2 text-xs text-[#2A2E2C]">
                            <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0" />
                            <span>Acceso de por vida</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#2A2E2C]">
                            <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0" />
                            <span>Ebook digital</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#2A2E2C]">
                            <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0" />
                            <span>Ejercicios prácticos</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#2A2E2C]">
                            <CheckCircle2 className="w-4 h-4 text-[#3F5E4D] shrink-0" />
                            <span>Sistémico Emocional Cognitivo</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="w-full h-[1px] bg-[#E2DFD7] mb-6" />

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#757A77] block mb-0.5 font-medium">
                              Inversión Única
                            </span>
                            <p className="font-serif text-3xl font-normal text-[#1C1F1D]">
                              ${priceDisplay}{' '}
                              <span className="text-xs font-sans text-[#757A77] font-light">
                                USD
                              </span>
                            </p>
                          </div>

                          {/* Botonera Destacada Optimizada para Móvil */}
                          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                            <Link
                              to={`/productos/${product.id}`}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 bg-[#F4F1EA] border border-[#D5D0C3] text-[#1C1F1D] text-xs uppercase tracking-[0.1em] font-medium rounded-xl hover:bg-[#EAE6DC] transition-all text-center cursor-pointer"
                            >
                              <Eye className="w-4 h-4 text-[#525754] shrink-0" />
                              <span>Detalles</span>
                            </Link>

                            <a
                              href={hotmartLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 bg-[#3F5E4D] text-white text-xs uppercase tracking-[0.1em] font-medium rounded-xl hover:bg-[#2F473A] transition-all shadow-md text-center cursor-pointer"
                            >
                              <span>Comprar</span>
                              <ExternalLink className="w-4 h-4 shrink-0" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  
                  /* 2. CARD ESTÁNDAR (DISPOSICIÓN GRID 2x2) */
                  <>
                    <div>
                      <div className="relative aspect-square overflow-hidden bg-[#EAE6DC] p-6 flex items-center justify-center">
                        <img
                          src={product.image || "/images/ebook-mockup.png"}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x600/EAE6DC/3F5E4D?text=Gu%C3%ADa+Ebook";
                          }}
                        />

                        {product.badge && (
                          <div className="absolute top-5 left-5 z-10">
                            <span className="text-[10px] uppercase tracking-[0.15em] font-medium px-3 py-1.5 rounded-full bg-[#1C1F1D]/80 backdrop-blur-md text-[#F4F1EA] border border-white/20">
                              {product.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 sm:p-8">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#3F5E4D] font-bold block mb-2">
                          {isPack ? "Pack de Guías & Ebooks" : "Guía Práctica & Ebook"}
                        </span>

                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1F1D] mb-3 group-hover:text-[#3F5E4D] transition-colors leading-snug">
                          {product.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#525754] font-light leading-relaxed mb-4 line-clamp-3">
                          {descriptionText}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                      <div className="w-full h-[1px] bg-[#E2DFD7] mb-5" />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#757A77] block mb-0.5">
                            Inversión
                          </span>
                          <p className="font-serif text-2xl font-normal text-[#1C1F1D]">
                            ${priceDisplay}{' '}
                            <span className="text-xs font-sans text-[#757A77] font-light">
                              USD
                            </span>
                          </p>
                        </div>

                        {/* Botonera Estándar Optimizada para Móvil */}
                        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                          <Link
                            to={`/productos/${product.id}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-3 bg-[#F4F1EA] border border-[#D5D0C3] text-[#1C1F1D] text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium rounded-xl hover:bg-[#EAE6DC] transition-all text-center cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#525754] shrink-0" />
                            <span>Detalles</span>
                          </Link>

                          <a
                            href={hotmartLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-3 bg-[#3F5E4D] text-white text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium rounded-xl hover:bg-[#2F473A] transition-all text-center cursor-pointer"
                          >
                            <span>Comprar</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}