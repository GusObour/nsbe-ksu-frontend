import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', phoneNumber: '', isLeader: false });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const validateInputs = () => {
    if (validator.isEmpty(user.firstName)) {
      return 'First name is required';
    }
    if (validator.isEmpty(user.lastName)) {
      return 'Last name is required';
    }
    if (!validator.isEmail(user.email)) {
      return 'Invalid email format';
    }
    if (validator.isEmpty(user.username)) {
      return 'Username is required';
    }
    if (!validator.isLength(user.password, { min: 6 })) {
      return 'Password must be at least 6 characters long';
    }
    if (user.phoneNumber && !validator.isMobilePhone(user.phoneNumber)) {
      return 'Invalid phone number';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/auth/register', user);
      toast.success('User registered successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed!');
    }
  };

  return (
    <div className="container mx-auto py-20">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Leader</label>
          <input
            type="checkbox"
            name="isLeader"
            checked={user.isLeader}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span>Yes</span>
        </div>
        <button type="submit" className="bg-purple text-white p-2 w-full rounded">Register</button>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-purple-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
