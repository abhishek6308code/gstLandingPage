
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Logo.svg';
// import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, profile, signOut, isAdmin } = useAuth();

  const navItems = [
    { label: 'Home', value: 'courseHome' },
    // { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'ServicePricing', value: 'pricing' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },

    { label: 'Course Enquiry', value: 'courseEnquiry' },
  ];

  // const handleNavigate = (value: string) => {
  //   onNavigate(value);
  //   setIsMenuOpen(false); // close mobile menu after navigation
  // };
  const handleNavigate = (value: string) => {
    onNavigate(value);
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const phone = "919721682580"; // your WhatsApp number (no +)
    const message = "Hello! I want to know more about your services.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20">
          {/* Brand */}

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >

            <img
              src={logo}
              alt="The Finance Show By AK"
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain"
            />


            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-2xl font-bold text-blue-600">
                TheFinanceShowBy
                <span className="text-gray-700"> AK</span>
              </span>
            </div>
          </div>



          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavigate(item.value)}
                className={`text-1xl font-medium transition-colors ${currentPage === item.value
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg shadow transition-all"
            >
              {/* WhatsApp SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.256.592 4.448 1.712 6.384L3.2 28.8l6.608-1.696c1.856.992 3.952 1.504 6.192 1.504 7.064 0 12.8-5.736 12.8-12.8s-5.736-12.8-12.8-12.8zm0 23.2c-1.92 0-3.776-.512-5.408-1.472l-.384-.224-3.92 1.008 1.04-3.808-.256-.4a10.49 10.49 0 01-1.632-5.6c0-5.824 4.736-10.56 10.56-10.56S26.56 10.88 26.56 16.704 21.824 26.4 16.001 26.4zm5.616-7.728c-.304-.16-1.792-.88-2.064-.976-.272-.096-.464-.144-.656.16-.192.304-.752.976-.928 1.168-.176.192-.352.208-.656.048-.304-.16-1.28-.472-2.432-1.504-.896-.8-1.504-1.776-1.68-2.08-.176-.304-.02-.464.132-.624.136-.136.304-.352.456-.528.152-.176.2-.304.304-.512.104-.208.056-.384-.024-.544-.08-.16-.656-1.584-.896-2.176-.24-.592-.48-.512-.656-.512-.176 0-.376-.032-.576-.032s-.544.08-.832.384c-.288.304-1.088 1.056-1.088 2.576 0 1.52 1.12 2.992 1.28 3.2.16.208 2.192 3.344 5.312 4.672.744.32 1.328.512 1.78.656.744.24 1.424.208 1.952.128.592-.088 1.792-.736 2.048-1.456.256-.72.256-1.344.176-1.456-.08-.112-.272-.176-.576-.336z" />
              </svg>
              WhatsApp
            </button>

            <button
              onClick={() => handleNavigate('contact')}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          {/* <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div> */}

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4">
            {/* <div className="space-y-2 bg-white rounded-lg shadow-lg p-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavigate(item.value)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.value
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              ))} */}

              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg"
                >
                  {/* small whatsapp icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.256.592 4.448 1.712 6.384L3.2 28.8l6.608-1.696c1.856.992 3.952 1.504 6.192 1.504 7.064 0 12.8-5.736 12.8-12.8s-5.736-12.8-12.8-12.8zm0 23.2c-1.92 0-3.776-.512-5.408-1.472l-.384-.224-3.92 1.008 1.04-3.808-.256-.4a10.49 10.49 0 01-1.632-5.6c0-5.824 4.736-10.56 10.56-10.56S26.56 10.88 26.56 16.704 21.824 26.4 16.001 26.4zm5.616-7.728c-.304-.16-1.792-.88-2.064-.976-.272-.096-.464-.144-.656.16-.192.304-.752.976-.928 1.168-.176.192-.352.208-.656.048-.304-.16-1.28-.472-2.432-1.504-.896-.8-1.504-1.776-1.68-2.08-.176-.304-.02-.464.132-.624.136-.136.304-.352.456-.528.152-.176.2-.304.304-.512.104-.208.056-.384-.024-.544-.08-.16-.656-1.584-.896-2.176-.24-.592-.48-.512-.656-.512-.176 0-.376-.032-.576-.032s-.544.08-.832.384c-.288.304-1.088 1.056-1.088 2.576 0 1.52 1.12 2.992 1.28 3.2.16.208 2.192 3.344 5.312 4.672.744.32 1.328.512 1.78.656.744.24 1.424.208 1.952.128.592-.088 1.792-.736 2.048-1.456.256-.72.256-1.344.176-1.456-.08-.112-.272-.176-.576-.336z" />
                  </svg>
                  WhatsApp
                </button>

                <button
                  onClick={() => handleNavigate('contact')}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
