import heroVideo from '../building.mp4';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';

export function Hero() {
  const [parallax, setParallax] = useState(0)
  const fullText = 'Experience the best of Kenya with our exceptional real estate services and curated safari adventures'
  const [typedText, setTypedText] = useState('')
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('home')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = rect.height || window.innerHeight
      const progress = Math.min(Math.max(-rect.top / h, 0), 1)
      setParallax(progress * 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let i = 0
    let dir = 1
    let t: any
    const tick = () => {
      setTypedText(fullText.slice(0, i))
      if (dir === 1) {
        if (i < fullText.length) {
          i++
          t = setTimeout(tick, 18)
        } else {
          dir = -1
          t = setTimeout(() => {
            i--
            tick()
          }, 1200)
        }
      } else {
        if (i > 0) {
          i--
          t = setTimeout(tick, 12)
        } else {
          dir = 1
          t = setTimeout(tick, 600)
        }
      }
    }
    t = setTimeout(tick, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1669557673726-293309494c20?auto=format&fit=crop&w=1200&q=60"
          onCanPlay={() => setVideoReady(true)}
          className={`w-full h-full object-cover will-change-transform transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateY(${parallax}px)` }}
        >
          <source src="/building.mp4" type="video/mp4" />
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 inline-block animate-[fadeIn_1s_ease-out]">
          <span className="text-[#DD5536] tracking-wider uppercase text-sm border border-[#DD5536] px-4 py-2 rounded-full bg-[#DD5536]/10 backdrop-blur-sm">
            Real Estate & Safari Experiences
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight animate-[textUp_0.6s_ease-out]">
          Your Gateway to <span className="text-[#DD5536] inline-block">Premium Properties</span> and <span className="text-[#DD5536] inline-block">Unforgettable Safaris</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto" aria-live="polite">
          <span>{typedText}</span>
          <span className="inline-block ml-1 align-baseline animate-[blink_1s_steps(1,end)_infinite]">|</span>
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-[textUp_0.6s_ease-out]">
          <Badge className="bg-white/10 text-white border-white/20">Trusted Agents</Badge>
          <Badge className="bg-white/10 text-white border-white/20">Prime Areas</Badge>
          <Badge className="bg-white/10 text-white border-white/20">Tailored Safaris</Badge>
          <Badge className="bg-white/10 text-white border-white/20">Secure Payments</Badge>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[textUp_0.6s_ease-out]">
          <Button
            size="lg"
            onClick={() => { window.history.pushState(null, '', '/properties'); window.dispatchEvent(new PopStateEvent('popstate')); }}
            className="bg-[#DD5536] text-white hover:bg-[#c44a2e] text-base h-12 px-8 group"
          >
            Explore Properties
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => { window.history.pushState(null, '', '/safaris'); window.dispatchEvent(new PopStateEvent('popstate')); }}
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
