import React, { useEffect, useState } from 'react';
import AuthService from '../../api/authService';
import ApiService from '../../api/apiService';
import GrantAccessForm from '../../components/GrantAccessForm';

const Profile = () => {

    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    useEffect(() => {
        const isAdmin = AuthService.getAdminState();
        setIsAdmin(isAdmin);
    }, []);

    useEffect(() => {
        ApiService.getCurrentUser().then(data => {
            setUser(data);
        }).catch(error => {
            console.error('Error fetching user:', error);
        });
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen font-poppins'>
            <h1 className='text-white pb-9 text-3xl font-bold text-center'>Profile</h1>

            <div className='w-full max-w-md bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4'>
                {user && (
                    <div className="bg-white bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4">
                        <div className='mb-4'>
                            <p className='font-semibold'>Username:</p>
                            <p>{user.username}</p>
                        </div>
                        <div className='mb-4'>
                            <p className='font-semibold'>Email:</p>
                            <p>{user.email}</p>
                        </div>
                        <div className='mb-4'>
                            <p className='font-semibold'>Admin:</p>
                            <p>{user.is_admin ? "Yes" : "No"}</p>
                        </div>
                        <div className="mb-4">
                            {isAdmin && (
                            <div className='mt-4'>
                                <GrantAccessForm />
                            </div>
                        )}
                        </div>
                        <button className="w-full bg-nokiaBlue text-white rounded-md px-4 py-2" onClick={handleLogout}>Logout</button>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
