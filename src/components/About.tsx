import { Award, Users, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const features = [
  {
    icon: Award,
    title: 'Expert Team',
    description: 'Our experienced professionals guide you through every step of your property journey',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'We prioritize your needs and deliver personalized solutions',
  },
  {
    icon: TrendingUp,
    title: 'Market Leaders',
    description: 'Proven track record in Kenya\'s real estate and tourism sectors',
  },
  {
    icon: Shield,
    title: 'Trusted Service',
    description: 'Transparent transactions and reliable safari experiences',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4 animate-[fadeLong_0.6s_ease-out]">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              About Us
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-6 animate-[textUp_0.6s_ease-out]">
            About <span className="text-[#DD5536]">New Manyatta Kenya</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-[fadeLong_0.8s_ease-out]">
            We are your trusted partner for premium real estate services and authentic safari experiences in Kenya. 
            With years of expertise in both property management and tourism, we bring you the best of what Kenya has to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#DD5536] to-[#c44a2e] rounded-xl mb-4 shadow-lg">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-white border-gray-200 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-5xl md:text-6xl text-[#DD5536] mb-3 transition-transform group-hover:scale-110 duration-300">500+</div>
                <div className="text-lg text-gray-600">Properties Sold</div>
              </div>
              <div className="group border-x-0 md:border-x border-gray-200">
                <div className="text-5xl md:text-6xl text-[#DD5536] mb-3 transition-transform group-hover:scale-110 duration-300">1000+</div>
                <div className="text-lg text-gray-600">Happy Clients</div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl text-[#DD5536] mb-3 transition-transform group-hover:scale-110 duration-300">200+</div>
                <div className="text-lg text-gray-600">Safari Tours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
