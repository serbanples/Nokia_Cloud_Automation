import React, { useEffect, useState } from 'react';
import AuthService from '../api/authService';
import ApiService from '../api/apiService';

const Profile = () => {

    const [user, setUser] = useState('')

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    useEffect(() => {
        ApiService.getCurrentUser().then(data => {
            setUser(data);
        }).catch(error => {
            console.error('Error fetching user:', error);
        });
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
