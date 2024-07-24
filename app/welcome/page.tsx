'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const WelcomePage = () =>{
    const [user, setUser] = useState(null);
    const router = useRouter();

    //Get user info from local storage, and if there's no data from local storage, redirect to login page.
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        } else{
            router.push('/');
        }
    }, [router])
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/'); // Redirect to login page.
    };

    if(user){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
                <p className="text-black text-2xl">Welcome {user.data.name}</p>
                <div>
                    <button
                    type="button"
                    onClick={handleLogout}
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                    >
                    Log out
                    </button>
                </div>
            </div>
        )
    }
}

export default WelcomePage;