import React from 'react';

const NewArrivals = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
      <div className="flex gap-4">
          <div className="w-4 h-8 bg-red-500"></div>
          <h2 className="inline text-2xl font-bold text-red-500">Featured</h2>
        </div>
        <h2 className="text-4xl font-bold mt-6 mb-8">New Arrival</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side - PlayStation 5 (50%) */}
        <div className="md:w-1/2">
          <div className="relative h-[600px] group overflow-hidden rounded-lg bg-black">
            <img
              src="../../public/assets/images/products/playstation.png"
              alt="PlayStation 5"
              className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">PlayStation 5</h3>
              <p className="text-gray-200 mb-3">Black and White version of the PS5 coming out on sale.</p>
              <button className="text-white hover:text-gray-200 font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Three Images Stack (50%) */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Women's Collections - Full Width */}
          <div className="relative h-[300px] group overflow-hidden rounded-lg bg-black">
            <img
              src="../../public/assets/images/products/woman-collection.jpeg"
              alt="Women's Collections"
              className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">Women's Collections</h3>
              <p className="text-gray-200 mb-3">Featured woman collections that give you another vibe.</p>
              <button className="text-white hover:text-gray-200 font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Bottom Two Cards - Split */}
          <div className="flex gap-4">
            {/* Speakers Card */}
            <div className="w-1/2 relative group overflow-hidden rounded-lg bg-black">
              <div className="relative h-[284px]">
                <img
                  src="../../public/assets/images/products/speakers.png"
                  alt="Speakers"
                  className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-2">Speakers</h3>
                  <p className="text-gray-200 mb-3">Amazon wireless speakers</p>
                  <button className="text-white hover:text-gray-200 font-semibold transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Perfume Card */}
            <div className="w-1/2 relative group overflow-hidden rounded-lg bg-black">
              <div className="relative h-[284px]">
                <img
                  src="../../public/assets/images/products/perfume.png"
                  alt="Perfume"
                  className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-2">Perfume</h3>
                  <p className="text-gray-200 mb-3">GUCCI INTENSE OUD EDP</p>
                  <button className="text-white hover:text-gray-200 font-semibold transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;