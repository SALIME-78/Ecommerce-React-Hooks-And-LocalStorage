import setIsOpen from '../components/Navbar';
import { useAuth }  from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { 
  UserCircle2, 
  Package, 
  XCircle, 
  Star, 
  LogOut,
  UserCheck,
  UserPlus
} from 'lucide-react';

const Account = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async() => {
    return navigate('/login');
  };

  const handleSignup = async() => {
    return navigate('/signup');
  }

  const menuItems = [
    { title: 'Manage My Account', icon: UserCircle2 },
    { title: 'My Order', icon: Package },
    { title: 'My Cancellations', icon: XCircle },
    { title: 'My Reviews', icon: Star },
    { title: 'Logout', icon: LogOut }
  ];

  const handleLogout = async () => {
    try {
      alert('Logout successful');
      await logout();
      
      
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    return (
    <div className="relative">
        <div className='absolute mt-4 right-0 top-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 px-6'>
        <div 
          className="flex items-center gap-1 mt-2 w-64"
        >
          <UserCheck className='w-5 h-5 text-gray-600'/>
          <span className='px-2 py-2.5 flex items-center hover: text-gray-700 text-md hover: cursor-pointer' onClick={() => handleLogin()}>Login</span>
        </div>
        <div 
          className="flex items-center gap-1 mt-0 w-64"
        >
          <UserPlus className='w-5 h-5 text-gray-600'/>
          <span className='px-2 py-2.5 flex items-center hover: text-gray-700 text-md hover: cursor-pointer' onClick={() => handleSignup()}>Sign Up</span>
        </div>
        </div>
    </div>
    )
  }

  else {
    return (
      <div className="relative">
          <div 
            className="absolute mt-4 right-0 top-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
                  onClick={() => {
                    // Handling click action here
                    if (item.title === 'Logout') {
                      handleLogout();
                    } else if (item.title === 'Manage My Account') {
                      return navigate('/profile');
                    }  else if (item.title === 'Manage My Orders') {
                      return alert('Not yet implemented');
                    }  else if (item.title === 'Manage My Products') {
                      return navigate('/wishlist');
                    } else {
                      alert('Not yet implemented');
                    }
                    
                  }}
                >
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
      </div>
    );
  }
};

export default Account;