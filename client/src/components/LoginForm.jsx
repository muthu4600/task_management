"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { login } from '@/APIs/authServices';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            if (data?.token) {
                Cookies.set('token', data?.token, { expires: 1000 * 60 * 60 * 24 * 7 });
                router.push('/task');
            }
        } catch (err) {
            setError(err?.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value?.trim())}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e?.target?.value?.trim())}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-black">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                </a>
            </p>
        </>
    );
};

export default LoginForm;
