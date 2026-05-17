import { useState, useEffect } from "react"
import Navbar from "../Navbar/Navbar"

export default function Settings() {
    const [longTime, setLongTime] = useState(() => localStorage.getItem('longTime') || '3600')
    const [shortTime, setShortTime] = useState(() => localStorage.getItem('shortTime') || '300')

    localStorage.setItem('state', 'settings')

    useEffect(() => {
        localStorage.setItem('longTime', longTime)
        localStorage.setItem('shortTime', shortTime)
    }, [longTime, shortTime])
    
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center">
                    <h1 className="text-2xl font-bold mb-4">Long Time </h1>
                    <input 
                    type="number" 
                    placeholder="Insert long time in seconds" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={(e) => setLongTime(e.target.value)}
                    value={longTime}
                    />
                </div>
                <div className="flex flex-row items-center">
                    <h1 className="text-2xl font-bold mb-4">Short Time </h1>
                    <input 
                    type="number" 
                    placeholder="Insert short time in seconds" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={(e) => setShortTime(e.target.value)}
                    value={shortTime}
                    />
                </div>
            </div>
        </>
    )
}