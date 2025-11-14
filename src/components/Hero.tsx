import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YSUyMGxhbmRzY2FwZSUyMHNhZmFyaXxlbnwxfHx8fDE3NjMxMDkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Kenya landscape"
          className="w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 inline-block animate-[fadeIn_1s_ease-out]">
          <span className="text-[#DD5536] tracking-wider uppercase text-sm border border-[#DD5536] px-4 py-2 rounded-full bg-[#DD5536]/10 backdrop-blur-sm">
            Real Estate & Safari Experiences
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight animate-[fadeIn_1s_ease-out_0.2s_both]">
          Your Gateway to <span className="text-[#DD5536] inline-block">Premium Properties</span> and <span className="text-[#DD5536] inline-block">Unforgettable Safaris</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-[fadeIn_1s_ease-out_0.4s_both]">
          Experience the best of Kenya with our exceptional real estate services and curated safari adventures
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_1s_ease-out_0.6s_both]">
          <Button
            size="lg"
            onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#DD5536] text-white hover:bg-[#c44a2e] text-base h-12 px-8 group"
          >
            Explore Properties
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('safaris')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/95 backdrop-blur-sm text-black hover:bg-white border-white text-base h-12 px-8 group"
          >
            Discover Safaris
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
