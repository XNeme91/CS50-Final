import { useState } from 'react'

export default function Pagination({ groups = [], loading = false, error = null }) {
    const [currentPage, setCurrentPage] = useState(0)

    const pages = groups.length > 0 ? groups.map(g => g.name) : ['Current', 'Planning', 'Completed', 'Dropped', 'Paused', 'Repeating']

    const currentGroup = groups[currentPage]

    return (
        <div>
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

            <div className="mt-4">
                {loading && <div className="text-sm">Loading lists…</div>}
                {error && <div className="text-sm text-red-600">Error: {error}</div>}

                {!loading && !error && (
                    <div>
                        {currentGroup ? (
                            <div>
                                <h4 className="text-md font-semibold">{currentGroup.name}</h4>
                                {Array.isArray(currentGroup.entries) && currentGroup.entries.length > 0 ? (
                                    <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {currentGroup.entries.map(entry => {
                                            const id = entry.id ?? entry.media?.id
                                            const title = entry.media?.title?.userPreferred ?? entry.media?.title?.romaji ?? entry.media?.title?.english ?? 'Untitled'
                                            const cover = entry.media?.coverImage?.large
                                            return (
                                                <li key={id ?? `${currentGroup.name}-${Math.random()}`} className="border rounded p-3 flex gap-3">
                                                    {cover && <img src={cover} alt={title} className="w-16 h-24 object-cover rounded" />}
                                                    <div className="flex-1">
                                                        <div className="font-medium">{title}</div>
                                                        <div className="text-sm text-gray-600">Progress: {entry.progress ?? 0} ep</div>
                                                        {entry.status && <div className="text-sm text-gray-500">List status: {entry.status}</div>}
                                                        {entry.notes && <div className="mt-1 text-sm text-gray-700">Notes: {entry.notes}</div>}
                                                        {entry.comment && <div className="mt-1 text-sm text-gray-700">Comment: {entry.comment}</div>}
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ) : (
                                    <div className="text-sm text-gray-500">No entries in this list.</div>
                                )}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">No lists available.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
