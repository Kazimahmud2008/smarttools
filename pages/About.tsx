import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About Smarttools - Free Online Utility Platform | Our Story"
        description="Learn about Smarttools, the comprehensive platform providing 35+ free online tools for developers, marketers, and professionals worldwide."
        keywords="about smarttools, online tools platform, free utilities, developer tools, productivity tools"
        canonicalUrl="https://smarttools.com/about"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                  About <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Smarttools</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Empowering millions of users worldwide with free, fast, and reliable online utilities
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Our Mission</h2>
                    <p className="text-lg text-slate-600 mb-6">
                      At Smarttools, we believe that essential online utilities should be accessible to everyone, 
                      everywhere, without barriers. Our mission is to provide a comprehensive suite of professional-grade 
                      tools that enhance productivity and simplify digital workflows.
                    </p>
                    <p className="text-lg text-slate-600">
                      From developers building the next big application to marketers crafting compelling campaigns, 
                      our tools are designed to save time, reduce complexity, and deliver reliable results.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">35+</div>
                        <div className="text-slate-600">Tools Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">500K+</div>
                        <div className="text-slate-600">Monthly Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">10M+</div>
                        <div className="text-slate-600">Tools Used</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                        <div className="text-slate-600">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
                  What Makes Us Different
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl w-fit mb-6">
                      <i className="fas fa-rocket text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Lightning Fast</h3>
                    <p className="text-slate-600">
                      Our tools are optimized for speed and performance. No waiting, no loading screens – 
                      just instant results when you need them.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-xl w-fit mb-6">
                      <i className="fas fa-shield-alt text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">100% Secure</h3>
                    <p className="text-slate-600">
                      Your data never leaves your browser. All processing happens locally, 
                      ensuring complete privacy and security for your sensitive information.
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl w-fit mb-6">
                      <i className="fas fa-mobile-alt text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Mobile Optimized</h3>
                    <p className="text-slate-600">
                      Perfect experience across all devices. Whether you're on desktop, tablet, 
                      or mobile – our tools work seamlessly everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
                  Our Story
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full flex-shrink-0">
                      <i className="fas fa-lightbulb text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">The Beginning</h3>
                      <p className="text-slate-600">
                        Smarttools was born out of frustration with scattered, unreliable online utilities. 
                        As developers and marketers ourselves, we found ourselves constantly switching between 
                        different websites for basic tasks like generating QR codes, formatting JSON, or calculating percentages.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full flex-shrink-0">
                      <i className="fas fa-users text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">Growing Community</h3>
                      <p className="text-slate-600">
                        What started as a personal project quickly grew into a platform serving hundreds of thousands 
                        of users monthly. Our community drives our development, suggesting new tools and improvements 
                        that make Smarttools better for everyone.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full flex-shrink-0">
                      <i className="fas fa-chart-line text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">Continuous Innovation</h3>
                      <p className="text-slate-600">
                        Today, we continue to expand our toolkit based on user feedback and emerging needs. 
                        Our commitment remains the same: providing free, reliable, and secure online tools 
                        that help people accomplish their goals more efficiently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="text-xl text-indigo-100 mb-8">
                  Join hundreds of thousands of users who trust Smarttools for their daily tasks
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a
                    href="/tools"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
                  >
                    <i className="fas fa-tools mr-2"></i>
                    Explore All Tools
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-flex items-center"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Get in Touch
                  </a>
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
