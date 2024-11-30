import React from 'react';
import { Store, DollarSign, Package, Coins } from 'lucide-react';

const stats = [
  {
    id: 1,
    number: '10.5k',
    label: 'Sellers active our site',
    icon: Store,
    iconClass: 'text-gray-900',
  },
  {
    id: 2,
    number: '33k',
    label: 'Monthly Product Sale',
    icon: DollarSign,
    iconClass: 'text-red-500',
  },
  {
    id: 3,
    number: '45.5k',
    label: 'Customer active in our site',
    icon: Package,
    iconClass: 'text-gray-900',
  },
  {
    id: 4,
    number: '25k',
    label: 'Annual gross sale in our site',
    icon: Coins,
    iconClass: 'text-red-500',
  },
];

const Stats = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform  hover:scale-10 hover:bg-red-500"
            >
              <div className="flex justify-center mb-4 relative">
                <div className="group p-3 rounded-full border-8 border-gray-400 transition-colors bg-black text-white hover:bg-gray-800">
                  <stat.icon className={`w-8 h-8 text-white ${stat.iconClass}`} />
                </div>
              </div>
              <div className='hover: text-white'>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600 ">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;