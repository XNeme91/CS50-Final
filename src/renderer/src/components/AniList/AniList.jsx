import Navbar from "../Navbar/Navbar"

export default function AniList() {
    return (
        <div>
            <Navbar />
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
        </div>
    )
}