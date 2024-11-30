import { Music2, Volume2, Battery, Bluetooth } from 'lucide-react';

function ProductsBanner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 flex items-center justify-center px-12 py-12 md:py-0 mx-[4%] my-8">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col justify-center items-center gap-0 md:gap-12 md:flex-row ">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-emerald-400 text-sm uppercase tracking-wider">
                Categories 
              </span> 
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 leading-tight">
                Enhance Your
                <br />
                Music Experience
              </h1>
            </div>

            <div className="flex gap-6">
              <StatCard icon={<Music2 className="w-6 h-6" />} value="23" label="Hours" />
              <StatCard icon={<Volume2 className="w-6 h-6" />} value="05" label="Days" />
              <StatCard icon={<Battery className="w-6 h-6" />} value="59" label="Minutes" />
              <StatCard icon={<Bluetooth className="w-6 h-6" />} value="35" label="Seconds" />
            </div>

            <button className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-8 py-3 rounded-full transition-colors">
              Buy Now!
            </button>
          </div>

          {/* Right Content - Speaker Image */}
          <div className="relative order-first md:order-last">
            <div className="relative z-10">
              <img
                src="../../public/assets/images/products/2.png"
                alt="JBL Boombox Speaker"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent rounded-full filter blur-3xl">
              <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center bg-white/5 rounded-lg p-3 backdrop-blur-sm">
      <div className="text-emerald-400 mb-1">{icon}</div>
      <div className="text-white font-bold text-xl">{value}</div>
      <div className="text-neutral-400 text-sm">{label}</div>
    </div>
  );
}

export default ProductsBanner;