import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEO
        title="Contact Smarttools - Get Support & Suggest New Tools"
        description="Contact our team for support, feature requests, or suggestions. We're here to help improve your experience with our free online tools."
        keywords="contact smarttools, support, help, feature request, tool suggestion, customer service"
        canonicalUrl="https://smarttools.com/contact"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                  Get in <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Touch</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Have questions, suggestions, or need help? We'd love to hear from you!
                </p>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center p-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Email Support</h3>
                    <p className="text-slate-600 mb-3">Get help with any questions or issues</p>
                    <p className="text-indigo-600 font-medium">support@smarttools.com</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <i className="fas fa-lightbulb text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Feature Requests</h3>
                    <p className="text-slate-600 mb-3">Suggest new tools or improvements</p>
                    <p className="text-green-600 font-medium">features@smarttools.com</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <i className="fas fa-handshake text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Partnerships</h3>
                    <p className="text-slate-600 mb-3">Explore collaboration opportunities</p>
                    <p className="text-orange-600 font-medium">partners@smarttools.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 block">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="category" className="text-sm font-medium text-slate-700 mb-2 block">
                          Category
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feedback">General Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-2 block">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="Brief description of your message"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Are all tools completely free to use?
                    </h3>
                    <p className="text-slate-600">
                      Yes! All 35+ tools on Smarttools are completely free to use with no registration required. 
                      We believe essential utilities should be accessible to everyone.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Is my data safe when using your tools?
                    </h3>
                    <p className="text-slate-600">
                      Absolutely. All processing happens locally in your browser. Your data never leaves your device 
                      or gets sent to our servers, ensuring complete privacy and security.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      How often do you add new tools?
                    </h3>
                    <p className="text-slate-600">
                      We regularly add new tools based on user feedback and emerging needs. 
                      Follow us on social media or subscribe to our newsletter to stay updated on new releases.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Can I suggest a new tool?
                    </h3>
                    <p className="text-slate-600">
                      We'd love to hear your suggestions! Use the contact form above with the "Feature Request" category, 
                      or email us directly at features@smarttools.com.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
