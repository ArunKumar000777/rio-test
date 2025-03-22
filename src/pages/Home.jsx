import React from "react";
import "../styles/home.css";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <ProductList />
        </div>
    );
};

export default Home;
