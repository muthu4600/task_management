"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { signUp } from '@/APIs/authServices';

const SignupForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const data = await signUp({ userName: formData?.userName, email: formData?.email, password: formData?.password });
            if (data?.error) setError(data.error);
            else router.push('/task');
        } catch (error) {
            setError(error?.message);
        }
    };

    return (
        <>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        minLength={4}
                        maxLength={100}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        minLength={5}
                        maxLength={50}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={5}
                        maxLength={50}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={5}
                        maxLength={50}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    Sign Up
                </button>
                <p className="mt-4 text-center text-black">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </>
    );
};

export default SignupForm;
