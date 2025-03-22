import React from "react";
import "../styles/skeleton.css"; // Separate CSS for skeleton styles

const SkeletonProduct = () => {
    return (
        <div className="product-box skeleton-box">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-link"></div>
        </div>
    );
};

export default SkeletonProduct;
