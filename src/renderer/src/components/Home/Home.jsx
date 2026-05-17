import { useState } from 'react'
import Timer from '../Timer.jsx'
import Navbar from '../Navbar/Navbar.jsx'

export default function Home() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isLongTime, setIsLongTime] = useState(true)
  const [seconds, setSeconds] = useState(Number(localStorage.getItem('longTime')) || 3600)

  localStorage.setItem('state', 'home')

  return (
    <>
      <Navbar />
      <Timer
        isRunning={isTimerRunning}
        isLongTime={isLongTime}
        seconds={seconds}
        setSeconds={setSeconds}
        setIsLongTime={setIsLongTime}
      />
      <div className='flex justify-center gap-5'>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => setIsTimerRunning(true)}>
          Start Timer
        </button>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => {
          setIsLongTime(true)
          setSeconds(Number(localStorage.getItem('longTime')) || 3600)
        }}>
          Reset Timer
        </button>
        <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl m-5' onClick={() => setIsTimerRunning(false)}>
          Pause Timer
        </button>
      </div>
    </>
  )
}