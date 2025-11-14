import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-black rounded-lg p-1.5 shadow-md">
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
              className="text-black hover:text-[#DD5536]"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('properties')}
              className="text-black hover:text-[#DD5536]"
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('safaris')}
              className="text-black hover:text-[#DD5536]"
            >
              Safaris
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-black hover:text-[#DD5536]"
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] ml-2"
            >
              Contact
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
              onClick={() => scrollToSection('contact')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] justify-start"
            >
              Contact
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
