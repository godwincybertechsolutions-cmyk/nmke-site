import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Properties } from './components/Properties';
import { Safaris } from './components/Safaris';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { TrustSignals } from './components/TrustSignals';
import { MobileCTA } from './components/MobileCTA';
import { GlobalSearch } from './components/GlobalSearch';
import { useEffect, useState } from 'react';

export default function App() {
  const [route, setRoute] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      setRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={navigate} />
      <MobileCTA />
      <GlobalSearch />
      <main className="space-y-24">
        {route === '/' && (
          <>
            <Hero />
            <TrustSignals />
          </>
        )}
        {route === '/properties' && (
          <>
            <Properties />
          </>
        )}
        {route === '/safaris' && (
          <>
            <Safaris />
          </>
        )}
        {route === '/about' && (
          <>
            <About />
            <Testimonials />
          </>
        )}
        {route === '/contact' && (
          <>
            <Contact />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
