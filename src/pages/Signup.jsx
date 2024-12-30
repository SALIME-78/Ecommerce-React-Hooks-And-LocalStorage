import { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please  fill in all fields !');
      return;
    }
    try {
      const success = await register(username, email, password);
      if (success) {
        toast.success(`Signup successful !`);
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
      return toast.error('Registration failed !');
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[600px] md:h-auto">
          <img 
            src="../../public/assets/images/auth.jpeg" 
            alt="Sign Up" 
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an account</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <input
              type="text"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            {/* Email or Phone Number Input */}
            <input
              type="text"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none"
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {/* Password Input */}
            <input
              type="password"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={(e) => handleSubmit(e)}
            >
              Create Account
            </button>
          </form>
          
          {/* Google Sign Up Button */}
          <div className="mt-4 flex justify-center">
            <button className="flex items-center bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
              <img src="google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
          </div>
          
          {/* Login Link */}
          <p className="mt-4 text-center">
            Already have an account ?  {' '}
            <Link to="/login" className="text-red-500 hover:underline pl-2">
               Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;