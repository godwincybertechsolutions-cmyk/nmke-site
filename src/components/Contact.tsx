import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'property',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'property',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              Contact Us
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4">
            Get in <span className="text-[#DD5536]">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to find your dream property or plan your safari adventure? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl text-black mb-6">Contact Information</h3>
            
            <div className="space-y-4 mb-8">
              <Card className="hover:shadow-md transition-shadow bg-gray-50 border-gray-200">
                <CardContent className="p-5 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#DD5536] to-[#c44a2e] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-black mb-1">Our Office</h4>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow bg-gray-50 border-gray-200">
                <CardContent className="p-5 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#DD5536] to-[#c44a2e] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-black mb-1">Phone</h4>
                    <p className="text-gray-600">+254 XXX XXX XXX</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow bg-gray-50 border-gray-200">
                <CardContent className="p-5 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#DD5536] to-[#c44a2e] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-black mb-1">Email</h4>
                    <p className="text-gray-600">info@newmanyattakenya.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-[#DD5536] to-[#c44a2e] text-white border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl mb-4">Office Hours</h4>
                <div className="space-y-2 text-white/90">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg border-gray-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="mb-2">
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="mb-2">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 XXX XXX XXX"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest" className="mb-2">
                      I'm Interested In *
                    </Label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-input-background"
                    >
                      <option value="property">Buying/Renting Property</option>
                      <option value="lease">Leasing Commercial Space</option>
                      <option value="safari">Safari Tours</option>
                      <option value="both">Both Property and Safari</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#DD5536] text-white hover:bg-[#c44a2e] h-12"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
