import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import nokia_logo from "../../../public/nokia-logo.png";
import axios from 'axios';
import AuthService from '../../api/authService';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [message, setMessage] = useState('');

  const { name, email, password, confirm_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/register', {
        username: name,
        email,
        password,
        confirm_password
      });
      console.log(res.data);
      // Handle success, redirect, show a message, etc.
    } catch (err) {
      console.error(err.response.data);
      // Handle error, show error message, etc.
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await AuthService.register(name, email, password);
        props.history.push('/login');
    } catch (error) {
        setMessage('Failed to register');
    }
  };

  return (
    <div className='flex justify-center items-center flex-row w-full'>
      <div className="flex justify-center items-center h-screen w-screen" style={{ backgroundImage: `url(${nokia_logo})`, backgroundSize: '100%100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="w-full max-w-md items-center flex justify-center flex-col bg-white bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4">
          <h1 className='mb-4 ml-5 font-bold text-gray-700 text-2xl'>Sign Up</h1>
          <form className='w-3/4' onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={onChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirm_password}
                  onChange={onChange}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className='flex object-left'>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
              <div className='flex text-right'>
                <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Already have an account?<br/> Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
