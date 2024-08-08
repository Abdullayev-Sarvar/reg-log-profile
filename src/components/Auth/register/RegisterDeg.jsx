import React, { useState } from 'react';
import axios from '../../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserRegister = (e) => {
        e.preventDefault()
        setLoading(true)
        
        axios.post("/users", {name, email, password, avatar})    
            .then(response => {
                if(response.data?.id) {
                    toast.success("Registered was successfully")
                    setLoading(false)
                    navigate('/login')
                }})
                .catch(error => {
                    toast.error(error.response.data.message)
                    setLoading(false)
                })
    }

    return (
        <div className='reg-bg'>
          <div className='auth-container'>
            <div className='Auth-container'>
                <div className='Auth-wrapper'>
                    <h2>Register</h2>
                    <form onSubmit={handleUserRegister}>
                        <input type="text"placeholder="Enter your Name" onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="url" placeholder="Enter avatar url Image" onChange={(e) => setAvatar(e.target.value)}/>
                        <p>Already have an account? <Link to="/login">Login.</Link></p>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
          </div>
        </div>
    );
};

export default Register;
