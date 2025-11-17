import { Button } from './ui/button'
import { useEffect, useState } from 'react'

export function MobileCTA() {
  const [section, setSection] = useState<string>('home')

  useEffect(() => {
    const sectionIds = ['properties', 'safaris']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.2 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg p-3 flex items-center justify-between">
          {section === 'properties' ? (
            <>
              <div className="text-sm">Ready to view a property?</div>
              <Button className="bg-[#DD5536] text-white hover:bg-[#c44a2e]" onClick={() => scrollTo('contact')}>
                Schedule Viewing
              </Button>
            </>
          ) : section === 'safaris' ? (
            <>
              <div className="text-sm">Plan your safari now</div>
              <div className="flex gap-2">
                <Button className="bg-[#DD5536] text-white hover:bg-[#c44a2e]" onClick={() => scrollTo('safaris')}>
                  Book Safari
                </Button>
                <Button variant="outline" onClick={() => scrollTo('contact')}>Request Itinerary</Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm">Explore properties and safaris</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => scrollTo('properties')}>Properties</Button>
                <Button variant="outline" onClick={() => scrollTo('safaris')}>Safaris</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
