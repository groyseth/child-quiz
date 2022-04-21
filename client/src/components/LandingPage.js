import React, { useState } from 'react'
import Auth from '../utils/auth'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Route, Link } from "react-router-dom";



export default function LandingPage() {



  return (

    <>
      <h1>LandingPage</h1>
      <button>
        <Link to='signUp'>
          SignUp
        </Link>
      </button>
      <button>
        <Link to='logIn'>
          Login
        </Link>
      </button>

    </>

  )
}
