import axios from 'axios';
import React, { useState } from 'react';
import nokia_logo from "../../../public/nokia-logo.png";
import { Link } from 'react-router-dom'; // If you're using React Router

const LogIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      });
      console.log(res.data);
      // Handle success, redirect, show a message, etc.
    } catch (err) {
      console.error(err.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className='flex justify-center items-center flex-row w-full'>
      <div className="flex justify-center items-center h-screen w-screen" style={{ backgroundImage: `url(${nokia_logo})`, backgroundSize: '100%100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="w-full max-w-md items-center flex justify-center flex-col bg-white bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4">
          <h1 className='mb-4 ml-5 font-bold text-gray-700 text-2xl'>Log In</h1>
          <form className='w-3/4' onSubmit={onSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              required
              onChange={onChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LogIn;
