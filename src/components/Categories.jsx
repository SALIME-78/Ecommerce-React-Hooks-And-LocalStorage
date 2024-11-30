import { useRef, useState, useEffect } from "react";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad,
  ChevronLeft,
  ChevronRight,
  Sofa,
  Apple,
  Shirt,
  Stethoscope
} from "lucide-react";

const categories = [
  { name: "Phones", icon: Smartphone },
  { name: "Computers", icon: Monitor },
  { name: "SmartWatch", icon: Watch },
  { name: "Camera", icon: Camera },
  { name: "HeadPhones", icon: Headphones },
  { name: "Gaming", icon: Gamepad },
  { name: "Furniture", icon: Sofa },
  { name: "Food", icon: Apple },
  { name: "Clothing", icon: Shirt },
  {name: "Medical", icon: Stethoscope}
];

const Categories = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      checkScrollability();
      window.addEventListener('resize', checkScrollability);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scrollContainer = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white shadow-sm py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4">
          <div className="w-4 h-8 bg-red-500"></div>
          <h2 className="inline text-2xl font-bold text-red-500">Categories</h2>
        </div>
        <div className="flex items-center justify-between my-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Browse By Category
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scrollContainer("left")}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-100 ${
                !canScrollLeft ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className={`w-6 h-6 ${!canScrollLeft ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => scrollContainer("right")}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-100 ${
                !canScrollRight ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <ChevronRight className={`w-6 h-6 ${!canScrollRight ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex justify-evenly gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-32 group cursor-pointer"
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-gray-200 flex flex-col items-center justify-center gap-3 transition-all duration-300 bg-white hover:bg-red-500 hover:text-white hover:shadow-md"
                >
                  <Icon className="w-8 h-8"/>
                  <span className="text-sm font-medium">
                    {category.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories