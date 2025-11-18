import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

export function Header({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [loggedIn, setLoggedIn] = useState(false)

  const go = (path: string) => {
    if (onNavigate) onNavigate(path)
    setMobileMenuOpen(false)
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

  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
      }
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-black rounded-lg p-2 shadow-md">
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
              onClick={() => go('/')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                window.location.pathname === '/' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/properties')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                window.location.pathname === '/properties' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/safaris')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                window.location.pathname === '/safaris' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Safaris
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/about')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                window.location.pathname === '/about' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/contact')}
              className={`relative text-black hover:text-[#DD5536] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#DD5536] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                window.location.pathname === '/contact' ? 'text-[#DD5536] after:scale-x-100' : ''
              }`}
            >
              Contact
            </Button>
            <Button
              onClick={() => go('/properties')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] ml-2"
            >
              Schedule Viewing
            </Button>
            <Button
              variant="outline"
              onClick={() => go('/safaris')}
              className="ml-2"
            >
              Request Itinerary
            </Button>
            {loggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => go('/profile')}
                  className="ml-2"
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => { await supabase.auth.signOut(); go('/') }}
                  className="ml-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => go('/auth')}
                className="ml-2"
              >
                Login
              </Button>
            )}
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
              onClick={() => go('/')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/properties')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Properties
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/safaris')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Safaris
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/about')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => go('/contact')}
              className="text-black hover:text-[#DD5536] justify-start"
            >
              Contact
            </Button>
            <Button
              onClick={() => go('/properties')}
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e] justify-start"
            >
              Schedule Viewing
            </Button>
            <Button
              variant="outline"
              onClick={() => go('/safaris')}
              className="justify-start"
            >
              Request Itinerary
            </Button>
            {loggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => go('/profile')}
                  className="justify-start"
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => { await supabase.auth.signOut(); go('/') }}
                  className="justify-start"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => go('/auth')}
                className="justify-start"
              >
                Login
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
