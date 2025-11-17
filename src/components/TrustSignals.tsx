import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

const partners = [
  { id: 1, name: 'Kenya Tourism Board', logo: 'https://images.unsplash.com/photo-1564769625905-4e36a1f2e98f?q=80&w=320&auto=format&fit=crop' },
  { id: 2, name: 'Real Estate Association', logo: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=320&auto=format&fit=crop' },
  { id: 3, name: 'Lodge Partner', logo: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=320&auto=format&fit=crop' },
  { id: 4, name: 'Secure Payments', logo: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=320&auto=format&fit=crop' },
]

export function TrustSignals() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">Trusted by Partners</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center justify-center">
              <div className="w-40 h-20 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                <ImageWithFallback src={p.logo} alt={p.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
