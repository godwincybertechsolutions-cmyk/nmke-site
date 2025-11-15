import { Calendar, Users, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const safaris = [
  {
    id: 1,
    title: 'Masai Mara Wildlife Safari',
    description: 'Experience the Great Migration and witness the Big Five in their natural habitat. Includes game drives, luxury accommodation, and expert guides.',
    duration: '5 Days / 4 Nights',
    groupSize: 'Up to 8 people',
    price: 'From KSH 120,000',
    highlights: ['Game Drives', 'Luxury Lodge', 'All Meals', 'Park Fees'],
    image: 'https://images.unsplash.com/photo-1703538354069-2d5693331330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YSUyME1hc2FpJTIwTWFyYXxlbnwxfHx8fDE3NjMxMDkyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Amboseli Elephant Safari',
    description: 'Get up close with majestic elephants with Mount Kilimanjaro as your backdrop. Perfect for photography and wildlife enthusiasts.',
    duration: '3 Days / 2 Nights',
    groupSize: 'Up to 10 people',
    price: 'From KSH 75,000',
    highlights: ['Elephant Viewing', 'Kilimanjaro Views', 'Photography', 'Transport'],
    image: 'https://images.unsplash.com/photo-1653293144611-1ff36f8c7c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzYzMTA5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Safaris() {
  return (
    <section id="safaris" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              Safari Adventures
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4">
            Unforgettable <span className="text-[#DD5536]">Safari Adventures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Kenya's wildlife and landscapes with our expertly curated safari experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {safaris.map((safari) => (
            <Card
              key={safari.id}
              className="group overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <ImageWithFallback
                  src={safari.image}
                  alt={safari.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl text-white mb-2">{safari.title}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin size={16} className="mr-2" />
                    <span>Kenya</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">{safari.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Clock size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">{safari.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">{safari.groupSize}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">Year-round</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {safari.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 size={16} className="mr-2 text-[#DD5536] flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl text-[#DD5536]">{safari.price}</div>
                  <Button className="bg-[#DD5536] text-white hover:bg-[#c44a2e] group/btn">
                    Book Now
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-[#DD5536] to-[#c44a2e] border-none text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl mb-4">Custom Safari Packages</h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let us create a personalized safari experience tailored to your preferences, budget, and schedule
            </p>
            <Button size="lg" className="bg-white text-[#DD5536] hover:bg-gray-100 px-8">
              Request Custom Itinerary
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

