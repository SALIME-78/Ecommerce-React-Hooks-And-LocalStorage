import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistProvider } from './contexts/WishlistContext';

const  App = () => {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </CartProvider>
        </WishlistProvider>
      </AuthProvider>
      <ToastContainer autoClose={1700} />
    </Router>
  );
}

export default App;

