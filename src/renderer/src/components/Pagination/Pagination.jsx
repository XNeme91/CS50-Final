import { useState } from 'react'

export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(0)

    const pages = ['Current', 'Planning', 'Completed', 'Dropped', 'Paused', 'Repeating']

    return (
        <div className="join mt-4 w-full justify-center">
            {pages.map((page, index) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(index)}
                    className={currentPage === index ? 'join-item btn btn-outline btn-active' : 'join-item btn'}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}
