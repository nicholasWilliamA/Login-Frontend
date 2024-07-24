"use client";
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

interface RegisterForm {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
};
/**
 * This code defines a Joi schema for validating a registration form.
 * Custom error messages are provided for each validation rule.
 */
const schema = Joi.object<RegisterForm>({
    fullname: Joi.string().required().messages({
        'any.required': 'Fullname is required',
        'string.empty': 'Fullname cannot be empty'
    }),
    username: Joi.string().min(6).required().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty',
        'string.min': 'The minimum length of username is 6 characters'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'The minimum length of password is 6 characters'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password does not match',
    })
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState();
  const { handleSubmit, register, watch, formState: { errors } } = useForm<RegisterForm>({
    resolver: joiResolver(schema)
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    const userData = {
      username: data.username,
      name: data.fullname,
      password: data.password,
    };

    try {
      const response = await axios.post('https://localhost:7243/api/v1/signup', userData);
      if (response.status === 200) {
        router.push('/'); // Redirect to login page after successful registration
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
        {error && <span className="text-red-600 text-sm">{error}</span>}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Fullname</label>
              <input
                id="fullname"
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Type your fullname here..."
                {...register('fullname')}
              />
              <span className="text-red-600 text-sm">{errors.fullname?.message}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Type your username here..."
                {...register('username')}
              />
              <span className="text-red-600 text-sm">{errors.username?.message}</span>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black pr-10"
              placeholder="Type your password here..."
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-6"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
            <span className="text-red-600 text-sm">{errors.password?.message}</span>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black pr-10"
              placeholder="Confirm your password here..."
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-6"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
            <span className="text-red-600 text-sm">{errors.confirmPassword?.message}</span>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
