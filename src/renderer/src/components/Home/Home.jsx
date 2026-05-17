import { useState } from 'react'
import Timer from '../Timer.jsx'

export default function Home() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [seconds, setSeconds] = useState(3600)

  return (
        <>
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
                <a href='#'>Settings</a>
              </li>
              <li>
                <a href='#'>AniList</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center'>
          <a className='btn btn-ghost text-xl'>Pomodoro Timer</a>
        </div>
        <div className='navbar-end'>
          <button className='btn'>
            Send AniList Request
          </button>
        </div>
      </div>

      <Timer
        isRunning={isTimerRunning}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <div className='flex justify-center gap-5'>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => setIsTimerRunning(true)}>
          Start Timer
        </button>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => setSeconds(3600)}>
          Reset Timer
        </button>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => setIsTimerRunning(false)}>
          Pause Timer
        </button>
      </div>
    </>
    )
}