import { Link } from "react-router-dom";
import "../styles/product.css";
const Product = ({ product }) => {
    return (
        <div className="product-box" key={product.id}>
            <h3 className="product-title">{product.title}</h3>
            <img className="product-image" src={product.image} alt={product.title} width="100" />
            <p className="product-price-text">${product.price}</p>
            <Link className="link-text" to={`/product/${product.id}`}>
                View Details
            </Link>
        </div>
    );
};

export default Product;
