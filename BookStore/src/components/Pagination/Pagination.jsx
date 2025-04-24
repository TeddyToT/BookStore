import React from 'react';

const Paginate = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // Function to get the page numbers to display, with ellipses for larger numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5; // How many page numbers to display at once

        if (totalPages <= maxPageNumbersToShow) {
            // If total pages are less than or equal to max, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // More than max pages, show the first page, last page, and nearby pages with ellipses in between
            pageNumbers.push(1); // Always show the first page
            if (currentPage > 3) pageNumbers.push('...'); // Show ellipses if not near the beginning

            // Add surrounding pages around the current page
            let start = Math.max(currentPage - 1, 2);
            let end = Math.min(currentPage + 1, totalPages - 1);
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) pageNumbers.push('...'); // Show ellipses if not near the end
            pageNumbers.push(totalPages); // Always show the last page
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Trước
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page === '...' ? currentPage : page)}
                    className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'} ${
                        page === '...' ? 'text-gray-500' : ''
                    }`}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Tiếp
            </button>
        </div>
    );
};

export default Paginate;
