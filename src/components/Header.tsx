import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const sectionIds = ['home', 'properties', 'safaris', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        // Emphasize the middle of the viewport
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.2,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-white rounded-lg p-2 shadow-md border border-gray-200">
              <ImageWithFallback
                src="https://i.imgur.com/30WLHln.png"
                alt="New Manyatta Kenya Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl text-black leading-tight">NEW MANYATTA</h1>
              <span className="text-sm text-[#DD5536]">KENYA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('home')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                activeSection === 'home' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('properties')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                activeSection === 'properties' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('safaris')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                activeSection === 'safaris' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Safaris
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                activeSection === 'about' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection('properties')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] ml-2"
            >
              Schedule Viewing
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('safaris')}
              className="ml-2"
            >
              Request Itinerary
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col space-y-2 border-t border-gray-100 pt-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('home')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('properties')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('safaris')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Safaris
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection('properties')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] justify-start"
            >
              Schedule Viewing
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('safaris')}
              className="justify-start"
            >
              Request Itinerary
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
