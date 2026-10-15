import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Desactiva la restauración por defecto del navegador para controlarla mediante React Router
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      // Busca el elemento ancla (#programas, #diagnostico, etc.)
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // En caso de que la página requiera un instante para montar el nodo
        const timeoutId = setTimeout(() => {
          const delayedElement = document.querySelector(hash);
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);

        return () => clearTimeout(timeoutId);
      }
    } else {
      // Si cambia de ruta sin ancla, sube al inicio inmediatamente
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}