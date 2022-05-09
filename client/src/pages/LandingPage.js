import React from 'react'
import { BrowserRouter as Route, Link } from "react-router-dom";



export default function LandingPage() {



  return (
    <div className='landingStyle'>
      <h1 className='landingTitle'>A Children's Learning Site!</h1>
      <button onClick={() => window.location.replace('/signUp')} className="btn btn-block btn-primary mx-3">
        Sign Up
      </button>
      <p>Or</p>
      <button onClick={() => window.location.replace('/login')} className="btn btn-block btn-primary mx-3">
       Login
      </button>
      <p>Try the <Link to='/DemoQuiz'>Demo!</Link></p>
    </div>
  )
}
