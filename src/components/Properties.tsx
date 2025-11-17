import { MapPin, ArrowRight, Bed, Bath } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useEffect, useMemo, useState } from 'react';

const properties = [
  {
    id: 1,
    title: 'Laurel Hill Apartments',
    location: 'Westlands, Nairobi',
    price: 'KSH 25,000,000',
    type: 'Sale',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMwMjk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    tags: ['New', 'Exclusive'],
  },
  {
    id: 2,
    title: 'Alba Gardens Apartments',
    location: 'Karen, Nairobi',
    price: 'KSH 80,000/month',
    type: 'Rent',
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBwcm9wZXJ0eXxlbnwxfHx8fDE3NjMwNTQ1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    tags: ['Hot', 'Furnished'],
  },
  {
    id: 3,
    title: '108 Riverside Apartments',
    location: 'Riverside Drive, Nairobi',
    price: 'KSH 150,000/month',
    type: 'Lease',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1664181220731-06219378d8c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YSUyME5haXJvYmklMjBjaXR5fGVufDF8fHx8MTc2MzEwOTI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    tags: ['Reduced'],
  },
];

export function Properties() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const areas = ['Westlands', 'Karen', 'Riverside'];
  const featured = useMemo(() => properties.filter((p) => p.featured), []);
  const filtered = useMemo(() => {
    if (!selectedArea) return properties;
    return properties.filter((p) => p.location.toLowerCase().includes(selectedArea.toLowerCase()));
  }, [selectedArea]);
  useEffect(() => {
    const section = document.getElementById('properties')
    if (!section) return
    const items = Array.from(section.querySelectorAll('[data-reveal="true"]')) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-[textUp_0.6s_ease-out_forwards]')
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section id="properties" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4 animate-[fadeLong_0.6s_ease-out]">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              Our Properties
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4 animate-[textUp_0.6s_ease-out]">
            Premium <span className="text-[#DD5536]">Properties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-[fadeLong_0.8s_ease-out]">
            Find your perfect property for sale, rent, or lease in prime Nairobi locations
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {areas.map((area) => (
              <Button
                key={area}
                variant={selectedArea === area ? 'secondary' : 'outline'}
                size="sm"
                className={selectedArea === area ? 'border-[#DD5536] bg-[#DD5536] text-white' : ''}
                onClick={() => setSelectedArea(selectedArea === area ? null : area)}
              >
                {area}
              </Button>
            ))}
          </div>
          <div className="mb-6 text-center">
            <Badge className="bg-[#DD5536] text-white">Featured</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <Card
                key={`featured-${property.id}`}
                className="group overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white opacity-0 translate-y-3"
                data-reveal="true"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.tags?.map((t, i) => (
                      <Badge key={i} className="bg-black/80 text-white border-none">{t}</Badge>
                    ))}
                  </div>
                  <Badge className="absolute top-4 right-4 bg-[#DD5536] hover:bg-[#DD5536] text-white border-none shadow-lg">
                    {property.type}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg text-black mb-2 group-hover:text-[#DD5536] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2 text-[#DD5536]" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  {(property.bedrooms || property.bathrooms) && (
                    <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
                      {property.bedrooms && (
                        <div className="flex items-center text-gray-600">
                          <Bed size={18} className="mr-1.5 text-[#DD5536]" />
                          <span className="text-sm">{property.bedrooms} Bed</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center text-gray-600">
                          <Bath size={18} className="mr-1.5 text-[#DD5536]" />
                          <span className="text-sm">{property.bathrooms} Bath</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-xl text-[#DD5536]">{property.price}</div>
                    <Button className="bg-black text-white hover:bg-gray-800 group/btn">
                      Schedule Viewing
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white opacity-0 translate-y-3"
              data-reveal="true"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 right-4 bg-[#DD5536] hover:bg-[#DD5536] text-white border-none shadow-lg">
                  {property.type}
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg text-black mb-2 group-hover:text-[#DD5536] transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2 text-[#DD5536]" />
                  <span className="text-sm">{property.location}</span>
                </div>
                {(property.bedrooms || property.bathrooms) && (
                  <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
                    {property.bedrooms && (
                      <div className="flex items-center text-gray-600">
                        <Bed size={18} className="mr-1.5 text-[#DD5536]" />
                        <span className="text-sm">{property.bedrooms} Bed</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center text-gray-600">
                        <Bath size={18} className="mr-1.5 text-[#DD5536]" />
                        <span className="text-sm">{property.bathrooms} Bath</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-xl text-[#DD5536]">{property.price}</div>
                  <Button className="bg-black text-white hover:bg-gray-800 group/btn">
                    Schedule Viewing
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-[#DD5536] text-white hover:bg-[#c44a2e] px-8">
            View All Properties
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
