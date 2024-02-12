import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './HolidayList.css';
import {useNavigate} from "react-router-dom";

const HolidayList = () => {
    const [holidays, setHolidays] = useState([]);
    const [theme, setTheme] = useState('KG');
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/holidays?country=${theme}`,
                    {
                        headers: {
                            Authorization: `${cookies.token}`
                        }
                    }
                    );

                const data = await response.data;
                if (data.success) {
                    console.log(data.data)
                    setHolidays(data.data);
                } else {
                    console.error('Failed to fetch holidays:', data.message);
                    navigate('/login')
                }
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };

        fetchHolidays();
    }, [theme]);

    return (

        <div className="holiday-list">
            <select onChange={(e) => setTheme(e.target.value)}>
                <option value="KG">Kyrgyzstan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="UZ">Uzbekistan</option>
                <option value="CA">Canada</option>
            </select>
            <h1>Holidays in 2024</h1>
            <ul>
                {holidays.map(holiday => (
                    <li key={holiday.date}>{holiday.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HolidayList;
