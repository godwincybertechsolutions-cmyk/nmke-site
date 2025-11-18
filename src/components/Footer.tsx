import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1.5">
                <ImageWithFallback
                  src="https://i.imgur.com/30WLHln.png"
                  alt="New Manyatta Kenya Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white leading-tight">NEW MANYATTA</span>
                <span className="text-sm text-[#DD5536]">KENYA</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner for premium real estate and unforgettable safari experiences in Kenya.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#DD5536]" />
                <span>info@newmanyattakenya.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#DD5536]" />
                <span>+254 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#DD5536]" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate?.('/') }} className="text-gray-400 hover:text-[#DD5536] transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#DD5536] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/properties" onClick={(e) => { e.preventDefault(); onNavigate?.('/properties') }} className="text-gray-400 hover:text-[#DD5536] transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#DD5536] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Properties
                </a>
              </li>
              <li>
                <a href="/safaris" onClick={(e) => { e.preventDefault(); onNavigate?.('/safaris') }} className="text-gray-400 hover:text-[#DD5536] transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#DD5536] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Safaris
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate?.('/about') }} className="text-gray-400 hover:text-[#DD5536] transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#DD5536] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate?.('/contact') }} className="text-gray-400 hover:text-[#DD5536] transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#DD5536] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              <li className="text-gray-400 text-sm">Property Sales</li>
              <li className="text-gray-400 text-sm">Property Rentals</li>
              <li className="text-gray-400 text-sm">Commercial Leasing</li>
              <li className="text-gray-400 text-sm">Safari Tours</li>
              <li className="text-gray-400 text-sm">Custom Itineraries</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4">Connect With Us</h4>
            <p className="text-gray-400 text-sm mb-4">Follow us on social media for updates</p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#DD5536] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD5536]/20"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#DD5536] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD5536]/20"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#DD5536] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD5536]/20"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#DD5536] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD5536]/20"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">&copy; 2025 New Manyatta Kenya. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#DD5536] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#DD5536] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
