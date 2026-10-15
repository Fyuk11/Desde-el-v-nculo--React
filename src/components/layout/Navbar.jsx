import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejo inteligente de navegación a anclas (#) dentro de la Home
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMobileMenuOpen(false); 

    if (hash === '#top' || hash === '') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Manejo especial para ir al diagnóstico en la página /luno
  const handleCtaClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/luno') {
      navigate('/luno');
      setTimeout(() => {
        const element = document.getElementById('diagnostico');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById('diagnostico');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 pt-4 md:pt-5 pointer-events-none">
      <div 
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? 'max-w-5xl bg-[#121413]/85 backdrop-blur-md border border-[#2A2D2B] py-3 px-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
            : 'max-w-7xl bg-transparent py-3 px-4 rounded-none border-transparent'
        }`}
      >
        {/* Logo (Dirige a Home) */}
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '#top')} 
          className="flex items-center gap-2 group"
        >
          <span className={`font-serif text-lg md:text-xl font-normal tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-[#E8E6E1]' : 'text-brand-dark'
          }`}>
            Desde el <span className={`italic transition-colors ${
              scrolled 
                ? 'text-[#6B8E7B] group-hover:text-[#88ab98]' 
                : 'text-brand-sage group-hover:text-brand-sage-dark'
            }`}>Vínculo</span>
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '#top')}
            className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer ${
              scrolled ? 'text-[#A3A099] hover:text-[#E8E6E1]' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Inicio
          </a>

          {/* Link destacado a Luno */}
          <Link
            to="/luno"
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 ${
              scrolled 
                ? 'text-[#82A993] hover:text-white' 
                : 'text-brand-sage hover:text-brand-dark'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Luno</span>
          </Link>

          <a
            href="#programas"
            onClick={(e) => handleNavClick(e, '#programas')}
            className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer ${
              scrolled ? 'text-[#A3A099] hover:text-[#E8E6E1]' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Programas
          </a>

          <a
            href="#metodologia"
            onClick={(e) => handleNavClick(e, '#metodologia')}
            className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer ${
              scrolled ? 'text-[#A3A099] hover:text-[#E8E6E1]' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Metodología
          </a>

          {/* Nueva Sección: Biblioteca Privada */}
          <Link
            to="/biblioteca"
            className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
              scrolled ? 'text-[#A3A099] hover:text-[#E8E6E1]' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Biblioteca
          </Link>
        </nav>

        {/* CTA Navbar: Diagnóstico de la página Luno */}
        <div className="hidden md:flex items-center">
          <a
            href="/luno#diagnostico"
            onClick={handleCtaClick}
            className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] rounded-lg transition-all duration-300 group ${
              scrolled
                ? 'bg-[#1A231E] border border-[#4A6758]/60 text-[#E8E6E1] hover:bg-[#4A6758] hover:text-white'
                : 'bg-brand-sage text-white border border-brand-sage/20 hover:bg-brand-sage-dark shadow-xs'
            }`}
          >
            <span>Evaluar Vínculo</span>
            <ArrowUpRight className={`w-3.5 h-3.5 transition-colors ${
              scrolled 
                ? 'text-[#6B8E7B] group-hover:text-white' 
                : 'text-white/80 group-hover:text-white'
            }`} />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-1.5 focus:outline-none transition-colors ${
            scrolled ? 'text-[#E8E6E1]' : 'text-brand-dark'
          }`}
          aria-label="Abrir Menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden max-w-md mx-auto mt-2 bg-[#121413]/95 backdrop-blur-xl border border-[#2A2D2B] rounded-xl px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '#top')}
            className="text-xs uppercase tracking-widest text-[#A3A099] hover:text-[#E8E6E1]"
          >
            Inicio
          </a>

          <Link
            to="/luno"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest text-[#82A993] font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Luno
          </Link>

          <a
            href="#programas"
            onClick={(e) => handleNavClick(e, '#programas')}
            className="text-xs uppercase tracking-widest text-[#A3A099] hover:text-[#E8E6E1]"
          >
            Programas
          </a>

          <a
            href="#metodologia"
            onClick={(e) => handleNavClick(e, '#metodologia')}
            className="text-xs uppercase tracking-widest text-[#A3A099] hover:text-[#E8E6E1]"
          >
            Metodología
          </a>

          <Link
            to="/biblioteca"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest text-[#A3A099] hover:text-[#E8E6E1]"
          >
            Biblioteca
          </Link>

          <a
            href="/luno#diagnostico"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4A6758] text-white text-xs uppercase tracking-widest rounded-lg mt-2"
          >
            <span>Evaluar Vínculo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}