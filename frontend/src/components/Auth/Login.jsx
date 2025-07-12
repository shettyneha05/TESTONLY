//Auth/Login.jsx
import React, { useState } from 'react';
import { login as loginUser, register as signupUser } from '../../utils/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!isLogin && password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (isLogin) {
        const { data } = await loginUser({ email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        const { data } = await signupUser({ name, email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLogin(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = password.length > 0 ? (
    <span className={`text-xs ml-2 ${password.length < 6 ? 'text-red-500' : 'text-green-500'}`}>
      {password.length < 6 ? 'Weak' : 'Strong'}
    </span>
  ) : null;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="relative w-[420px] min-h-[340px] perspective-1000">
        <div className={`relative w-full h-full transform-style transition-transform duration-700 ${isLogin ? '' : 'rotate-y-180'}`}>
          
          {/* Login Form */}
          <div className={`absolute w-full h-full backface-hidden ${isLogin ? '' : 'hidden'}`}>
            <div className="border-2 rounded-xl border-emerald-600 p-8 bg-gray-800">
              <form onSubmit={submitHandler} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-white">Login</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="email"
                  placeholder="Email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="password"
                  placeholder="Password"
                />
                <button
                  disabled={isLoading}
                  className={`w-full bg-emerald-600 text-white py-2 rounded-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'}`}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </button>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="w-full text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Don't have an account? Sign up
                </button>
              </form>
            </div>
          </div>

          {/* Signup Form */}
          <div 
            className={`absolute w-full h-full backface-hidden ${isLogin ? 'hidden' : ''}`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="border-2 rounded-xl border-emerald-600 p-8 bg-gray-800">
              <form onSubmit={submitHandler} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="email"
                  placeholder="Email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="password"
                  placeholder="Password"
                />
                {passwordStrength}
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button
                  disabled={isLoading}
                  className={`w-full bg-emerald-600 text-white py-2 rounded-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'}`}
                >
                  {isLoading ? 'Creating account...' : 'Sign up'}
                </button>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="w-full text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Already have an account? Login
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;




