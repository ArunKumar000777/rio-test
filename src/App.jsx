import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                    </Routes>
                </Router>
            </div>
        </>
    );
};

export default App;
