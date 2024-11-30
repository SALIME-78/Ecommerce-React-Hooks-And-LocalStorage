import Hero from '../components/Hero';
import FeaturedProducts from '../components/BestSelling';
import FlashSales from '../components/FlashSales';
import ExploredProducts from '../components/ExploredProducts';
import NewArrivals from '../components/NewArrivals';
import Categories from '../components/Categories';
import ProudctsBanner from '../components/ProductsBanner';
import ServiceFeatures from '../components/ServiceFeatures';
import BestSelling from '../components/BestSelling';


export default function Home() {
  return (
    <div className="px-4 md:px-12 lg:px-20">
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <ProudctsBanner />
      <ExploredProducts />
      <NewArrivals />
      <ServiceFeatures />
    </div>
  );
}