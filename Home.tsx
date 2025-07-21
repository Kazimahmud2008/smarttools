import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ToolsGrid from '@/components/ToolsGrid';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Smarttools - All-in-One Free Online Tools | 35+ Professional Utilities"
        description="Access 35+ free online tools including QR generators, password generators, calculators, converters, and more. All-in-one productivity toolkit for developers and professionals."
        keywords="free online tools, QR code generator, password generator, text converter, calculator, utility tools, web tools, developer tools, online utilities"
        canonicalUrl="https://smarttools.com"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main>
          <HeroSection />
          
          {/* Featured Tools Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Most Popular Tools
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Get started with our most-used utilities that help thousands of users daily
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* Featured tool cards with stats */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-lg w-fit mb-4">
                    <i className="fas fa-qrcode text-white text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">QR Code Generator</h3>
                  <p className="text-slate-600 text-sm mb-3">Create instant QR codes</p>
                  <div className="text-xs text-indigo-600 font-medium">50K+ uses this month</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg w-fit mb-4">
                    <i className="fas fa-key text-white text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Password Generator</h3>
                  <p className="text-slate-600 text-sm mb-3">Secure random passwords</p>
                  <div className="text-xs text-green-600 font-medium">35K+ uses this month</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg w-fit mb-4">
                    <i className="fas fa-palette text-white text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Color Picker</h3>
                  <p className="text-slate-600 text-sm mb-3">Pick perfect colors</p>
                  <div className="text-xs text-purple-600 font-medium">28K+ uses this month</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg w-fit mb-4">
                    <i className="fas fa-calculator text-white text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">BMI Calculator</h3>
                  <p className="text-slate-600 text-sm mb-3">Health calculations</p>
                  <div className="text-xs text-orange-600 font-medium">22K+ uses this month</div>
                </div>
              </div>
            </div>
          </section>
          
          <ToolsGrid />
          
          {/* Trust Section */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  Trusted by Professionals Worldwide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">500K+</div>
                    <div className="text-slate-600">Monthly Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">10M+</div>
                    <div className="text-slate-600">Tools Used</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                    <div className="text-slate-600">Uptime</div>
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
