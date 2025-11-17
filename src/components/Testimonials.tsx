import { Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

const testimonials = [
  {
    id: 1,
    name: 'Wanjiru K.',
    type: 'Property Buyer',
    quote: 'Professional team helped me find the perfect apartment in Westlands.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'David M.',
    type: 'Safari Guest',
    quote: 'Our Masai Mara safari was unforgettable. Seamless planning and great guides.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Aisha R.',
    type: 'Renter',
    quote: 'Quick process and honest service. Highly recommended for rentals.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Peter O.',
    type: 'Safari Guest',
    quote: 'Amboseli views were stunning. Loved the attention to detail.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1547425260-3b567e93ae58?q=80&w=640&auto=format&fit=crop',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4 animate-[fadeLong_0.6s_ease-out]">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">Testimonials</Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4 animate-[textUp_0.6s_ease-out]">
            What <span className="text-[#DD5536]">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-[fadeLong_0.8s_ease-out]">Real stories from property buyers, renters, and safari guests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t) => (
            <Card key={t.id} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="h-40 overflow-hidden">
                <ImageWithFallback src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#DD5536]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">“{t.quote}”</p>
                <div className="flex items-center justify-between">
                  <div className="text-black text-sm">{t.name}</div>
                  <Badge variant="outline" className="text-gray-700 border-gray-200">{t.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-[#DD5536]">See more stories</a>
        </div>
      </div>
    </section>
  )
}
