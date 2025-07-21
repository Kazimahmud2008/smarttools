import Navigation from '@/components/Navigation';
import ToolsGrid from '@/components/ToolsGrid';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Tools() {
  return (
    <>
      <SEO
        title="Free Online Tools Directory | 35+ Utility Tools - Smarttools"
        description="Browse our complete directory of 35+ free online tools including QR generators, calculators, converters, and developer utilities. All tools are free and secure."
        keywords="online tools directory, free tools, QR generator, password generator, calculators, converters, developer tools, utility tools"
        canonicalUrl="https://smarttools.com/tools"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
                  All <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Tools</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Discover our complete collection of 35+ professional-grade online utilities
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-shield-alt text-blue-500"></i>
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-mobile-alt text-purple-500"></i>
                    <span>Mobile Friendly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-bolt text-yellow-500"></i>
                    <span>Lightning Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <ToolsGrid />

          {/* CTA Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  We're always adding new tools based on user feedback. Let us know what you need!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
                  >
                    <i className="fas fa-lightbulb mr-2"></i>
                    Suggest a Tool
                  </a>
                  <a
                    href="/about"
                    className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-300 inline-flex items-center"
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    Learn More
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
