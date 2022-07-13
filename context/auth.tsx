import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';


interface IContext {
  token: string
  isAuthenticated: Boolean
  user: string
  registerUser: (body: any) => Promise<void>
  login: (body: any) => Promise<void>
  isLoading: Boolean
  // logout: () => void
}

const API_URL = process.env.API_URL || 'http://192.168.0.6:3000';

// {
//   // token: '',
//   isAuthenticated: false,
//     user: '',
//       registerUser: async (body) => { },
//         login: async (body) => { },
//           loading: false,
//   // logout: () => { }
// }


const AuthContext = createContext({} as IContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  async function loadUserFromCookies() {
    const token = Cookie.get('token');
    if (token) {
      const { data: { data: { user } } } = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (user) setUser(user);

    }
    setIsLoading(false);
  }

  const login = async (body: any) => {
    //prevent function from being ran on the server
    if (typeof window === 'undefined') {
      return;
    }

    // return new Promise((resolve, reject) => {

    const { data: { access_token: token, user } } = await axios.post(`${API_URL}/api/auth/login`, JSON.stringify(body), {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      },
    })

    if (token) {
      Cookie.set('token', token)
      setUser(user)
    }

    // axios
    //   .post(`${API_URL}/api/auth/login`, JSON.stringify(body), {
    //     headers: {
    //       // Overwrite Axios's automatically set Content-Type
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //   .then((res) => {

    //     //set token response from Strapi for server validation
    //     Cookie.set('token', res.data.access_token);
    //     //resolve the promise to set loading to false in SignUp form
    //     resolve(res);
    //     //redirect back to home page for restaurance selection
    //   })
    //   .catch((error) => {
    //     //reject the promise and pass the error object back to the form
    //     reject(error);
    //   });
    // });
  };

  const registerUser = (body: any) => {
    //prevent function from being ran on the server
    if (typeof window === 'undefined') {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/api/auth/register`, JSON.stringify(body), {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
          },
        })
        .then((res) => {
          resolve(res);
          // //redirect back to home page for restaurance selection
          // router.push('/dashboard');
        })
        .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
        });
    });
  };

  // const logout = ({ redirectLocation }) => {
  //   //remove token and user cookie
  //   Cookie.remove('token');
  //   delete window.__user;
  //   // sync logout between multiple windows
  //   window.localStorage.setItem('logout', Date.now());
  //   //redirect to the home page
  //   setUser(null);
  //   router.push(redirectLocation || '/');
  // };

  return (
    <AuthContext.Provider
      value={{
        // token: Cookie.get('token'),
        isAuthenticated: !!user,
        user,
        registerUser,
        login,
        isLoading
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );


}

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter()
  if (isLoading || (!isAuthenticated && router.pathname !== '/login')) {
    return <div className='center-loader'><span className="loader-mixin"></span></div>
  }
  return children;
};

export const useAuth = () => useContext(AuthContext);