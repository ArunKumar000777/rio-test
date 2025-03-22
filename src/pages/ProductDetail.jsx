import React, { useEffect } from "react";
import "../styles/productDetail.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const productState = useSelector((state) => state.products.productDetails[id]) || {};
    const { loading, error, data: product } = productState;

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id, product]);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!product) return <p className="error-text">Product not found.</p>;

    return (
        <div className="product-detail-container">
            <h2 className="product-detail-title">{product.title}</h2>
            <img className="product-detail-image" src={product.image} alt={product.title} />
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-category">Category: {product.category}</p>
        </div>
    );
};

export default ProductDetail;
