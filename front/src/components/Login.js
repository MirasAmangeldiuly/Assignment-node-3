import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {useCookies} from "react-cookie";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();


    const onRegister = () => {
        navigate('/register')
    }
    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setCookie('token', data.data, { path: '/' });
                if (username === 'admin') {
                    navigate('/admin')
                }
                else {
                    navigate('/home')
                }
            } else {
                alert(data.message);
                setPassword('')
                setUsername('')
            }

        } else {
            alert('Please enter username and password.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <span onClick={onRegister}>Register</span></p>
        </div>
    );
}

export default Login;
