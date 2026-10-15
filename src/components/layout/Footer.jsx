import { ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const email = 'desdeel.vinculo@gmail.com';
  const whatsappUrl = 'https://wa.me/5491121652703?text=Hola!%20Quiero%20mas%20informacion%20sobre%20Desde%20el%20V%C3%ADnculo.';

  const location = useLocation();
  const navigate = useNavigate();

  // Función de navegación inteligente hacia anclas (#)
  const handleNavClick = (e, hash) => {
    e.preventDefault();

    if (hash === '#top' || hash === '' || hash === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname !== '/') {
      // Si estamos en otra página (/luno, /biblioteca), primero vamos a la Home
      // y esperamos a que cargue el DOM antes de hacer scroll a la sección
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      // Si ya estamos en la Home, hacemos el scroll fluido directamente
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0C0D0D] border-t border-[#2A2D2B] pt-20 pb-12 text-[#B5B3AD]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2A2D2B]/80">
          
          {/* Marca / Misión */}
          <div className="md:col-span-5">
            <Link 
              to="/" 
              onClick={(e) => handleNavClick(e, '#top')}
              className="font-serif text-2xl text-[#F3F2EF] tracking-tight block mb-4"
            >
              Desde el <span className="italic text-[#82A993]">Vínculo</span>
            </Link>
            <p className="text-xs text-[#B5B3AD] font-normal leading-relaxed max-w-sm mb-6">
              Plataforma de formación y consultoría en bienestar canino sistémico. Educación basada en neurobiología, lectura corporal y vínculo seguro.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-[#82A993] bg-[#121413] px-3 py-1.5 border border-[#2A2D2B] rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Metodología 100% Amigable y Científica</span>
            </div>
          </div>

          {/* Enlaces de Navegación con Handler Inteligente */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F3F2EF] font-medium mb-5">
              Navegación
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleNavClick(e, '#top')}
                  className="hover:text-[#82A993] transition-colors cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <Link to="/luno" className="text-[#82A993] hover:underline transition-colors font-medium">
                  Espacio Luno
                </Link>
              </li>
              <li>
                <a 
                  href="#programas" 
                  onClick={(e) => handleNavClick(e, '#programas')}
                  className="hover:text-[#82A993] transition-colors cursor-pointer"
                >
                  Programas Formativos
                </a>
              </li>
              <li>
                <a 
                  href="#metodologia" 
                  onClick={(e) => handleNavClick(e, '#metodologia')}
                  className="hover:text-[#82A993] transition-colors cursor-pointer"
                >
                  Metodología Sistémica
                </a>
              </li>
              <li>
                <Link to="/biblioteca" className="hover:text-[#82A993] transition-colors">
                  Biblioteca de Recursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales, WhatsApp y Email */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F3F2EF] font-medium mb-5">
              Comunidad y Contacto
            </h4>
            <p className="text-xs text-[#B5B3AD] mb-4">
              Sumate a nuestro contenido diario sobre comunicación y bienestar canino.
            </p>

            {/* Íconos de Redes Sociales + WhatsApp */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121413] border border-[#2A2D2B] rounded-sm hover:border-[#25D366] hover:text-[#25D366] transition-all flex items-center justify-center text-[#B5B3AD]"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/desdeel.vinculo/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121413] border border-[#2A2D2B] rounded-sm hover:border-[#4A6758] hover:text-[#82A993] transition-all flex items-center justify-center text-[#B5B3AD]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@desdeelvinculo"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121413] border border-[#2A2D2B] rounded-sm hover:border-[#4A6758] hover:text-[#82A993] transition-all flex items-center justify-center text-[#B5B3AD]"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.87c.29 0 .56.04.82.12v-3.53a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.7 6.34 6.34 0 0 0 9.49 22a6.34 6.34 0 0 0 6.34-6.33V9.28a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.71z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@Desdeel.v%C3%ADnculo"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121413] border border-[#2A2D2B] rounded-sm hover:border-[#4A6758] hover:text-[#82A993] transition-all flex items-center justify-center text-[#B5B3AD]"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Email Texto Plano */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B5B3AD] block mb-1">
                Contacto directo
              </span>
              <p className="text-xs text-[#E8E6E1] font-mono select-all">
                {email}
              </p>
            </div>

          </div>

        </div>

        {/* Footer Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B5B3AD]">
          <p>© {new Date().getFullYear()} Desde el Vínculo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#E8E6E1] transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-[#E8E6E1] transition-colors">Política de Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
}