import { createContext, useContext, useReducer, useEffect } from "react";
import bcrypt from 'bcryptjs'
import { toast } from "react-toastify";

const AuthContext  = createContext();

const  initialState = {
  user: null,
  isLoggedIn: false,
}

const authReducer  = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { ...state, user: action.payload, isLoggedIn: false }
    case 'LOGIN':
      return { ...state, user: action.payload, isLoggedIn: true }
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false }
    default:
      return state;
  }
}

export function  AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser });
    }
    }, []);
  
  const login = async(email, password) =>  {
    const users = JSON.parse(localStorage.getItem('users'))  || [];
    const user = users.find(user => user.email === email);

    if(user  && await bcrypt.compare(password, user.password)) {
      const  storedUser = localStorage.setItem('user',  JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: storedUser });
      return true
    } else {
      return false
    }
  }

  const register  = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users'))  || [];
    const existingUser = users.find(user => user.email === email);

    if(existingUser) {
      toast.error('Email already exists');
      return false
    }

    const  hashedPassword = await bcrypt.hash(password, 8);
    const  newUser = { id:  users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    dispatch({ type: 'REGISTER', payload: newUser });
    return true
    }

    const logout  = () => {
      localStorage.removeItem('user',  null);
      dispatch({ type: 'LOGOUT' });
    }

    return (
      <AuthContext.Provider value={{ ...state, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }

export const  useAuth = () => useContext(AuthContext);  