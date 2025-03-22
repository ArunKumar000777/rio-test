import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { fetchProducts, setSearchQuery } from "../redux/productSlice";
import "../styles/productList.css";
import Product from "./Product";
import Pagination from "./Pagination";
import SkeletonProduct from "./SkeletonProduct";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, status, error, searchQuery, category } = useSelector((state) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    // Memoized filter function
    const filteredProducts = useMemo(() => {
        return products.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!category || product.category === category)
        );
    }, [products, searchQuery, category]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    return (
        <div>
            <div className="input-box">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
                <CiSearch className="search-icon" />
            </div>

            {status === "loading" && (
                <div className="product-grid">
                    {[...Array(itemsPerPage)].map((_, index) => (
                        <SkeletonProduct key={index} />
                    ))}
                </div>
            )}
            {status === "failed" && <p className="error-text">{error}</p>}

            <div className="product-grid">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => <Product key={product.id} product={product} />)
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default ProductList;
