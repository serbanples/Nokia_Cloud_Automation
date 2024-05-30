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
        <div>
            <h2>Profile</h2>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Admin: {user.is_admin ? "yes" : "no"}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}

            {isAdmin && ( <GrantAccessForm /> )}
        </div>
    );
};

export default Profile;
