"use client";
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface SignIn{
    username: string,
    password: string,
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, register } = useForm<SignIn>();
  const router = useRouter();
  const onSubmit = async (input: SignIn) => {
    const userData: SignIn = {
        username: input.username,
        password: input.password
    };
    try{
        const response = await axios.post('https://localhost:7243/api/v1/signin', userData);
        console.log(response.status);
        if (response.status === 200){
            localStorage.setItem('user', JSON.stringify(response));
            router.push('/welcome')
        }
    } catch (error){
        setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Type your username here..."
                value={username}
                {...register('username')}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Type your password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-6">
                {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                    <EyeIcon className="w-5 h-5" aria-hidden="true" />
                )}
            </button>
            </div>
          </div>
          {error && <span className="text-red-600 text-sm">Wrong username or password</span>}
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => router.push('/register')}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
