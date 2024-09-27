"use client"
import Tasks from '@/components/Tasks'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) router.push('/login');
        else setIsAuthenticated(true);
    }, []);

    return (
        isAuthenticated ? <Tasks /> : <></>
    )
}

export default page