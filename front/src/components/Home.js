// Home.js

import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import './Home.css';

const Home = () => {
    const [news, setNews] = useState([]);
    const [cookies,setCookie] = useCookies(['token']);
    const [theme, setTheme] = useState('bitcoin');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, [theme]);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:3000/news?' + new URLSearchParams({
                searchQuery: theme
            }), {
                    headers: {
                        Authorization: `${cookies.token}`
                    },

                },
            );
            const data = await response.json();
            if (data.success) {
                setNews(data.data);
            } else {
                console.error('Failed to fetch news:', response.message);
                navigate('/login')
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <div className="home">
            <h2>Latest News</h2>
            <select onChange={(e) => setTheme(e.target.value)}>
                <option value="bitcoin">Bitcoin</option>
                <option value="apple">Apple</option>
                <option value="earthquake">Earthquake</option>
                <option value="animal">Animal</option>
            </select>
            <button onClick={() => navigate('/weather')} style={
                {
                    padding: '8px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '200px',
                    marginLeft: '100px'
                }
            } >Weather</button>
            <button onClick={() => navigate('/holidays')} style={
                {
                    padding: '8px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '200px',
                    marginLeft: '100px'
                }
            }>
                Holidays
            </button>
            <button onClick={() => {
                navigate('/login');
                setCookie('token', '', {path: '/'});
            } } style={
                {
                    padding: '8px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '200px',
                    marginLeft: '100px'
                }
            } >Logout</button>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <img src={article.urlToImage} alt={article.title} width="300px" height="300px"/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
