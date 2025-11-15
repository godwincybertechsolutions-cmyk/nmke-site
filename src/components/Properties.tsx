import { Home, Building2, MapPin, ArrowRight, Bed, Bath } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
  },
];

export function Properties() {
  return (
    <section id="properties" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              Our Properties
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4">
            Premium <span className="text-[#DD5536]">Properties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect property for sale, rent, or lease in prime Nairobi locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-gray-200 bg-white"
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
              <CardContent className="p-6">
                <h3 className="text-xl text-black mb-3 group-hover:text-[#DD5536] transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-2 text-[#DD5536]" />
                  <span className="text-sm">{property.location}</span>
                </div>
                {(property.bedrooms || property.bathrooms) && (
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
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
                <div className="text-2xl text-[#DD5536] mb-4">{property.price}</div>
                <Button className="w-full bg-black text-white hover:bg-gray-800 group/btn">
                  View Details
                  <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
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
