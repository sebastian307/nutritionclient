import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Food from './pages/Food';
import Stock from "./pages/Stock";
import PreparedMeals from "./pages/PreparedMeals";

import Navbar from "./components/Navbar";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="food" element={<Food />} />
                <Route path="stock" element={<Stock />} />
                <Route path="preparedMeals" element={<PreparedMeals />} />
            </Routes>
        </div>
    );
}

export default App;
