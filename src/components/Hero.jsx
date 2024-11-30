import { ChevronRight, AppleIcon, Menu } from 'lucide-react';
import { useState } from 'react';

function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: "Woman's Fashion", hasSubmenu: true },
    { title: "Men's Fashion", hasSubmenu: true },
    { title: "Electronics", hasSubmenu: false },
    { title: "Home & Lifestyle", hasSubmenu: false },
    { title: "Medicine", hasSubmenu: false },
    { title: "Sports & Outdoor", hasSubmenu: false },
    { title: "Baby's & Toys", hasSubmenu: false },
    { title: "Groceries & Pets", hasSubmenu: false },
    { title: "Health & Beauty", hasSubmenu: false },
  ];

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Menu */}
        <div className={`
          fixed lg:relative top-0 left-0 h-full z-40
          w-64 bg-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          <nav className="py-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between pl-6 py-2.5 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-700 text-sm">{item.title}</span>
                {item.hasSubmenu && (
                  <div className='pr-8'>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content with Banner */}
        <div className="flex-1 p-4 lg:p-10 mt-16 lg:mt-0">
          <div className="relative w-full h-[250px] md:h-[330px] bg-black overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
              <div className="text-white space-y-4 text-center md:text-left mt-8 md:mt-0">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <AppleIcon className="w-6 md:w-8 h-6 md:h-8" />
                  <span className="text-base md:text-lg">iPhone 14 Series</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold">
                  Up to 10%<br />off Voucher
                </h2>
                <button className="flex items-center space-x-2 text-sm border-b border-white pb-1 mx-auto md:mx-0">
                  <span>Shop Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=500"
                alt="iPhone 14"
                className="w-[200px] md:w-[400px] object-contain transform rotate-12 mt-4 md:mt-0"
              />
            </div>
            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[0, 1, 2, 3, 4].map((dot) => (
                <button
                  key={dot}
                  className={`w-2 h-2 rounded-full ${
                    dot === 0 ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Hero;
