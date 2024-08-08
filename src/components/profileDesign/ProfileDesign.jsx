import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import './ProfileDes.scss';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios('/auth/profile')
            .then(response => setProfile(response.data));
    }, []);

    return (
        <div className='profile'>
            <div className='profile-container'>
                <Link to='/' className='home-button'>Home</Link>
                {profile && (
                    <>
                        <h1 className='profile-title'>Profile</h1>
                        <div className="profile-wrapper">
                            <img className='profile-img' src={profile.avatar} alt="Profile" />
                            <div className='profile-info'>
                                <h2 className='profile-name'>Name: {profile.name}</h2>
                                <p className='profile-id'>Your id: {profile.id}</p>
                                <p className='profile-email'>Email: {profile.email}</p>
                                <p className='profile-password'>Your password: {profile.password}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
