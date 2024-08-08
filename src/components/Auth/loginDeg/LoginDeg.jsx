import React, { useState } from 'react';
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/auth/login/', { email, password })
            .then(response => {
                if(response.status === 201) {
                    localStorage.setItem('token', response.data.access_token);
                    toast.success('Login was successfully');
                    navigate('/profile');
                }
            })
        .catch(error => {
            if (error.response) {
                console.error('Error response:', error.response);
                if (error.response.status === 401) {
                    toast.error("Invalid email or password. Please try again.");
                } else {
                    toast.error(`Error: ${error.response.data.message || "An error occurred."}`);
                }
            } else {
                toast.error("An error occurred. Please try again.");
            }
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });

    }

    return (
        <div className='log-bg'>
            <div className='auth-container'>
                <div className='Auth-container'>
                    <div className='Auth-wrapper wrappper-bg'>
                        <h2>Login</h2>
                        <form onSubmit={handleUserLogin}>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p>Don't have an account? <Link to="/register">Register.</Link></p>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Login...' : 'Login'}
                            </button>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
