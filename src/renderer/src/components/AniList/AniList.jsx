import Navbar from "../Navbar/Navbar"

export default function AniList() {
    return (
        <div>
            <Navbar />
            <h1>AniList Page</h1>
            <p>This is the AniList page.</p>
            <button className="btn btn-primary" onClick={async () => {
                // Handle login logic here
                const result = await window.api.anilist()
                console.log(result) // Should log 'user wants to login to anilist'
            }}>
                Login with AniList
            </button>
        </div>
    )
}