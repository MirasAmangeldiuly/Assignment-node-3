import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const onLogin = () => {
        navigate('/login')
    }
    const handleRegister = async () => {
        if (username !== '' && password !== '') {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                alert('User registered successfully.');
                navigate('/login')
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
        <div className="register-container">
            <h2>Register</h2>
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
            <button onClick={handleRegister}>Register</button>
            <p>Already have account? <span onClick={onLogin}>Login</span></p>
        </div>
    );
}

export default Register;
