import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link }  from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import ProductCard from "./ProductCard";
import products from "../data/products";

const FlashSales = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [currentTime, setCurrentTime] = useState({
    days: 3,
    hours: 14,
    minutes: 35,
    seconds: 29,
  });
  
  const scrollContainerRef = useRef(null);

  // Check scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Check if we can scroll left
      setCanScrollLeft(scrollLeft > 0);
      
      // Check if we can scroll right
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    checkScrollPosition();
  };

  useEffect(() => {
    // Initial check
    checkScrollPosition();
  }, []);

  // Add resize observer to handle window/container size changes
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });

    if (scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }

    return () => {
      if (scrollContainer) {
        resizeObserver.unobserve(scrollContainer);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex mb-4 gap-4">
        <div className="w-4 h-8 bg-red-600"></div>
        <h2 className="inline text-2xl font-bold text-red-500">Today's</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
        {/* Flash Sales and Timer Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-8 lg:gap-16 w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Flash Sales
          </h2>
          <div className="w-full sm:w-auto">
            <CountDownTimer {...currentTime} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-end sm:justify-center gap-4 sm:gap-8 w-full sm:w-auto">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                canScrollLeft
                  ? "bg-gray-100 hover:bg-gray-200 cursor-pointer shadow-sm hover:shadow"
                  : "bg-gray-50 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                canScrollRight
                  ? "bg-gray-100 hover:bg-gray-200 cursor-pointer shadow-sm hover:shadow"
                  : "bg-gray-50 cursor-not-allowed opacity-50"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px]">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      <button className="px-12 my-3 py-4 text-white rounded bg-red-500">
        <Link  to="/allproducts">View All Products</Link>
      </button>
      </div>
    </div>
  );
};

export default FlashSales;
