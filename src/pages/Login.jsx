import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link}  from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedUsers =  JSON.parse(localStorage.getItem('users'));
    console.log(parsedUsers)

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      if(!parsedUsers.find(user => user.email === email)) {
        toast.error('Invalid email or password');
        navigate('/signup');
      }
      
      toast.success('Login successful');
      navigate('/');
      return setTimeout(() => {
        location.reload();
      }, 900)
      
    } catch (error) {
      toast.error(error.message);
    }
  }; 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto">
          <img 
            src="../../public/assets/images/auth.jpeg" 
            alt="Login" 
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email or Phone Input */}
            <input
              type="text"
              name="email"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none"
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {/* Password Input */}
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Button and Forgot Password */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </button>
              <span className="text-red-500 hover:underline cursor-pointer" onClick={() => handleSubmit(e)}>
                Forgot Password ?
              </span>
            </div>
          </form>
          
          {/* Sign Up Link */}
          <p className="mt-4 text-center">
            Don't have an account ?  {' '}
            <Link to="/signup" className="text-red-500 hover:underline pl-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;