// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter from react-router-dom
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import Weather from "./components/Weather";
import Holiday from "./components/Holiday";

function App() {
    return (
        <Router>
            <div>
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/" element={<Register />} /> {/* Use 'element' instead of 'component' */}
                    <Route path="/login" element={<Login />} /> {/* Use 'element' instead of 'component' */}
                    <Route path="/register" element={<Register />} /> {/* Use 'element' instead of 'component' */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<AdminPage/>} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/holidays" element={<Holiday/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
