import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/productSlice";
import "../styles/sidebar.css";

const categories = ["All", "men's clothing", "women's clothing", "electronics", "jewelery"];

const Sidebar = () => {
    const dispatch = useDispatch();
    const activeCategory = useSelector((state) => state.products.category);

    return (
        <div className="sidebar-container">
            <h2 className="sidebar-title">Categories</h2>
            <div className="category-list">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => dispatch(setCategory(category === "All" ? "" : category))}
                        className={`category-button ${
                            activeCategory === category || (category === "All" && activeCategory === "") ? "active" : ""
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
