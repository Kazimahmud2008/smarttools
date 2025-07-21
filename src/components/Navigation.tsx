import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    return location === href || (href !== '/' && location.startsWith(href));
  };

  return (
    <header className="fixed w-full top-0 z-50 glassmorphism border-b border-white/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-tools text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-slate-800">Smarttools</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`font-medium transition-colors cursor-pointer ${
                  isActive(item.href) 
                    ? 'text-indigo-600' 
                    : 'text-slate-700 hover:text-indigo-600'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-700 hover:text-indigo-600">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg">
              Sign Up
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <div className="flex flex-col space-y-1">
                  <div className="hamburger-line w-6 h-0.5 bg-slate-700"></div>
                  <div className="hamburger-line w-6 h-0.5 bg-slate-700"></div>
                  <div className="hamburger-line w-6 h-0.5 bg-slate-700"></div>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-6">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span 
                      className={`block py-2 text-lg transition-colors cursor-pointer ${
                        isActive(item.href) 
                          ? 'text-indigo-600' 
                          : 'text-slate-700 hover:text-indigo-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <hr className="border-slate-300" />
                <Button variant="ghost" className="justify-start text-slate-700 hover:text-indigo-600">
                  Login
                </Button>
                <Button className="justify-start bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  Sign Up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
