'use client';

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    return (
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="hidden sm:block">
                <p className="text-sm" style={{ color: '#515B6F' }}>
                    Page <span className="font-semibold" style={{ color: '#25324B' }}>{currentPage}</span> of{' '}
                    <span className="font-semibold" style={{ color: '#25324B' }}>{totalPages}</span>
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#515B6F' }}
                >
                    Previous
                </button>

                <div className="hidden sm:flex gap-1">
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all ${page === currentPage
                                    ? 'z-10 bg-primary text-white'
                                    : 'border border-gray-200 hover:bg-gray-50'
                                }`}
                            style={page === currentPage ? { backgroundColor: '#4640DE' } : { color: '#515B6F' }}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#515B6F' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
