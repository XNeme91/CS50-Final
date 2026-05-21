import { useState, useEffect } from "react"
import Navbar from "../Navbar/Navbar"
import Pagination from "../Pagination/Pagination"

export default function AniList() {
    const [animeList, setAnimeList] = useState('current')

    // Change anime list based on button click
    useEffect(() => {
        switch (animeList) {
            case 'current':
                break;
            case 'planning':
                break;
            case 'completed':
                break;
            case 'dropped':
                break;
            case 'paused':
                break;
            case 'repeating':
                break;
        }
    }, [animeList])

    return (
        <div>
            <Navbar />
            <Pagination/>
            <h1>AniList Page</h1>
            <p>This is the AniList page.</p>
            
            <button className="btn btn-primary" onClick={async () => {
                // Handle login logic here
                const result = await window.api.login()
                console.log(result) // Should log 'user wants to login to anilist'
            }}>
                Login with AniList
            </button>
            <button className="btn btn-secondary" onClick={async () => {
                // Handle get token logic here
                const token = await window.api.getToken()
                console.log(token)
            }}>
                Get Decrypted Token
            </button>
            <button className="btn btn-danger" onClick={async () => {
                // Handle logout logic here
                const result = await window.api.logout()
                console.log(result)
            }}>
                Logout
            </button>
            <button className="btn btn-info" onClick={async () => {
                // Handle get viewer data logic here
                const viewer = await window.api.getViewer()
                console.log(viewer)
            }}>
                Get Viewer Data
            </button>
            <button className="btn btn-warning" onClick={async () => {
                // Handle get user ID logic here
                const userId = await window.api.getUserId()
                console.log('User ID:', userId)
            }}>
                Get User ID
            </button>
            <button className="btn btn-success" onClick={async () => {
                // Handle get anime list logic here
                const animeList = await window.api.getAnimeList()
                console.log('Anime List:', animeList)
            }}>
                Get Anime List
            </button>

        </div>
    )
}