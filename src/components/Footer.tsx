import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-tools text-white"></i>
                </div>
                <span className="text-xl font-bold">Smarttools</span>
              </div>
            </Link>
            <p className="text-slate-400">
              The ultimate collection of free online tools for developers, marketers, and professionals.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">QR Code Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Password Generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">JSON Formatter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Color Picker</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Generators</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Calculators</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Converters</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
            <div className="space-y-2 text-slate-400">
              <Link href="/about">
                <span className="hover:text-white transition-colors cursor-pointer block">About</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-white transition-colors cursor-pointer block">Contact</span>
              </Link>
            </div>
          </div>
        </div>
        
        <hr className="border-slate-700 my-8" />
        
        <div className="text-center text-slate-400">
          <p>&copy; 2024 Smarttools. All rights reserved. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}