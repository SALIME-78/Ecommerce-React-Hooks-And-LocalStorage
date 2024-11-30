import { SendHorizontal, QrCode, Facebook, Twitter, Github, Linkedin  } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-12">
      <div className="flex justify-between relative mb-6 md:w-1/2 lg:w-1/3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border border-white px-4 py-2 rounded-l w-full"
              />
              <SendHorizontal className="w-6 h-6 text-white absolute" style={{top: '24%', right:'5%'}} />
            </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-8">
        {/* Exclusive Section */}
      <div className="space-y-4">
          <h3 className="font-bold text-lg">Exclusive</h3>
          <div className="space-y-2">
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Support</h3>
          <div className="space-y-2">
            <p>111 Bijoy sarani, Dhaka,</p>
            <p>DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>

        {/* Account Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Account</h3>
          <div className="space-y-2">
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>
        </div>

        {/* Quick Link Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Quick Link</h3>
          <div className="space-y-2">
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>

        {/* Download App Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Download App</h3>
          <p className="text-sm">Save $3 with App New User Only</p>
          <div className="flex space-x-4"  style={{maxWidth: '180px', maxHeight: '180px'}}>
            <div className="w-full h-full">
              {/* QR Code Image */}
              {/* <img src="/qr-code.png" alt="QR Code" className="w-full h-full" /> */}
              <QrCode className="w-full h-full" />
            </div>
            <div className="space-y-1 flex flex-col justify-center gap-2">
              {/* Store Buttons */}
              <img src="/assets/images/gplay.svg" alt="Google Play" style={{border: '1px solid white', borderRadius: '4px', padding:'0.5px 0'}} />
              <img src="/assets/images/appstore.svg" alt="App Store" style={{}} />
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400 border border-white p-1 rounded-sm">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 border border-white p-1 rounded-sm">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 border border-white p-1 rounded-sm">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 border border-white p-1 rounded-sm">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;