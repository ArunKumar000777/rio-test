import React from "react";
import "../styles/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>

            <span>
                {currentPage} / {totalPages || 1}
            </span>

            <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
