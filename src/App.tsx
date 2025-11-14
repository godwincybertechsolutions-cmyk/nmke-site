import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Properties } from './components/Properties';
import { Safaris } from './components/Safaris';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Properties />
        <Safaris />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
