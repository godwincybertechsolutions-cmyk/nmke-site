import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

type Partner = { id: number; name: string; acronym?: string; logo?: string }

const partners: Partner[] = [
  { id: 1, name: 'Kenya Tourism Board', acronym: 'KTB' },
  { id: 2, name: 'Kenya Assoc. of Tour Operators', acronym: 'KATO' },
  { id: 3, name: 'Kenya Realtors Association', acronym: 'KRA' },
  { id: 4, name: 'Amboseli Lodge Partners', acronym: 'ALP' },
  { id: 5, name: 'Masai Mara Lodge Partners', acronym: 'MML' },
  { id: 6, name: 'Visa', acronym: 'VISA', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_2021.svg' },
  { id: 7, name: 'Mastercard', acronym: 'MC', logo: 'MC' },
]

function Monogram({ text }: { text: string }) {
  return (
    <div className="w-40 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DD5536] to-[#c44a2e] flex items-center justify-center text-white font-semibold">
        {text}
      </div>
    </div>
  )
}

export function TrustSignals() {
  const trackItems = [...partners, ...partners]
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">Trusted by Partners</Badge>
          <h3 className="text-2xl md:text-3xl text-black mt-3">Certified and Partnered for Your Peace of Mind</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-sm text-gray-600">Tourism & Operators</div>
            <div className="mt-2 text-[#DD5536] text-sm">KTB • KATO</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-sm text-gray-600">Real Estate & Licensing</div>
            <div className="mt-2 text-[#DD5536] text-sm">Local Regulatory Bodies</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-sm text-gray-600">Secure Payments</div>
            <div className="mt-2 text-[#DD5536] text-sm">Visa • Mastercard</div>
          </div>
        </div>

        <div className="group overflow-hidden">
          <div className="flex gap-8 items-center w-[200%] animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
            {trackItems.map((p, i) => (
              <div key={`${p.id}-${i}`} className="shrink-0">
                {p.logo ? (
                  <div className="w-52 h-24 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-[1.03] p-3">
                    <ImageWithFallback
                      src={p.logo}
                      alt={p.name}
                      className={`mx-auto filter grayscale hover:grayscale-0 transition-transform duration-300 object-contain ${p.name === 'Mastercard' ? 'max-h-10' : 'max-h-12'} w-auto`}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-52 h-24 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-[1.03] p-3">
                    <Monogram text={p.acronym ?? p.name.slice(0, 3).toUpperCase()} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
