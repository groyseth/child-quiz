import React from 'react'
import { Link, Route } from 'react-router-dom'
import NavBar from './NavBar'
import './QuizHome.css'
// import Quiz1 from '../pages/Quiz1'
export default function QuizHomePage() {
  return (
      <>
      <NavBar />

      <div className='quizSelect'>quiz selection
      <button>
        <Link to='quiz1'>
          Quiz 1
        </Link>
      </button>
      </div>
      </>
    
  )
}
