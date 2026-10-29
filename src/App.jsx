import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import AnalyticsTracker from './components/layout/AnalyticsTracker'; // <-- 1. Importás acá

// Carga directa de las páginas principales
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import LunoPage from './pages/LunoPage';
import AboutPage from './pages/AboutPage';

// Carga diferida (Lazy Loading) de secciones secundarias
const BibliotecaPage = lazy(() => import('./pages/BibliotecaPage'));
// Importamos el GameShell para los juegos del Arcade
const GameShell = lazy(() => import('./components/games/GameShell'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-[#A3B18A] text-sm font-medium">
      Cargando experiencia...
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker /> {/* <-- 2. Lo agregás acá */}
      <div className="min-h-screen bg-[#121413] text-[#E8E6E1] selection:bg-[#4A6758] selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/luno" element={<LunoPage />} />
              <Route path="/sobre-mi" element={<AboutPage />} />
              
              {/* Ruta de Biblioteca activa */}
              <Route path="/biblioteca" element={<BibliotecaPage />} />

              {/* RUTA DINÁMICA PARA LOS JUEGOS DEL ARCADE */}
              <Route path="/juego/:gameId" element={<GameShell />} />

            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}