import { useState, useEffect } from "react"
import Navbar from "../Navbar/Navbar"
import Pagination from "../Pagination/Pagination"

export default function AniList() {
    const [animeList, setAnimeList] = useState('current')
    const [animeGroups, setAnimeGroups] = useState([])
    const [loadingLists, setLoadingLists] = useState(false)
    const [loadError, setLoadError] = useState(null)

    // load lists on mount
    useEffect(() => {
        async function loadLists() {
            setLoadingLists(true)
            setLoadError(null)
            try {
                const res = await window.api.getAnimeList()
                const lists = res?.data?.MediaListCollection?.lists ?? res?.MediaListCollection?.lists ?? res?.lists ?? res
                setAnimeGroups(lists || [])
            } catch (err) {
                console.error('Error loading anime lists', err)
                setLoadError(err?.message || String(err))
            } finally {
                setLoadingLists(false)
            }
        }
        loadLists()
    }, [])

    return (
        <div>
            <Navbar />
            <Pagination groups={animeGroups} loading={loadingLists} error={loadError} />
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
                let animeListString = animeList.data.MediaListCollection.lists[0].entries[0]
                console.log('Anime List:', animeListString)
            }}>
                Get Anime List
            </button>

        </div>
    )
}

// animeList.data.MediaListCollection.lists[0].entries[0].media
// so animelist is the response, data is the full object
// medialistcollection has the lists (watching, plannning, etc)
// lists is an array so access is via index
// each list has entires which is also an array, access via index
// each entry has media which is the anime data we want to access
// there is coverImage.large which is the URL for the anime cover image. We can use this URL to display the cover image in our app.
// and finally title which is an object with english, native, and romaji titles. We can choose which title to display based on user preference or availability.