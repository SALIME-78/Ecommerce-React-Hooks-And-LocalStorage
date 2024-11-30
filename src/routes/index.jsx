import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Account from '../pages/Account';
import Profile from '../pages/Profile';
import AllProducts from '../pages/AllProducts';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      
      {/* Protected Routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}