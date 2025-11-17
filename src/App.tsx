import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Properties } from './components/Properties';
import { Safaris } from './components/Safaris';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { TrustSignals } from './components/TrustSignals';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="space-y-24">
        <Hero />
        <Properties />
        <Safaris />
        <Testimonials />
        <About />
        <Contact />
        <TrustSignals />
      </main>
      <Footer />
    </div>
  );
}
