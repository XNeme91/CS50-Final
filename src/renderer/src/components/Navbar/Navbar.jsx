import { useNavigate } from "react-router-dom"
import icon from './github-icon.svg'

export default function Navbar() {
    const navigate = useNavigate()
    let page = localStorage.getItem('state')
    let title = localStorage.getItem('state') === 'home' ? 'Pomodoro Timer' : 'Settings'
    let tab;

    if (page === 'home') {
        tab = <button onClick={() => navigate('/settings')}>Settings</button>
    } else if (page === 'settings') {
        tab = <button onClick={() => navigate('/')}>Home</button>
    }

    return (
        <div className='navbar bg-base-100 shadow-sm'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                {tab}
              </li>
              <li>
                <button onClick={() => {navigate('/anilist'); window.api.fetchData()}}>AniList</button>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center'>
          <a className='btn btn-ghost text-xl'>{title}</a>
        </div>
        <div className='navbar-end'>
          <button className='btn bg-white border-black' onClick={() => window.api.openGitHub()}>
            <img src={icon} alt="GitHub" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </div>
    )
}