import React, {useState} from 'react'
import { BrowserRouter as Route, Link } from "react-router-dom";
import moment from "moment"
import "./Main.css"

export default function DemoNav() {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
    const handleTime = () => {
        setInterval(() => {document.getElementById('nav-Time').innerHTML = `${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`},1000)
    }

    return (
        <nav className='navbar'>
             
    <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
    </div>
    <ul className={click ? 'quizMenu active' : 'quizMenu'}>
        
        <li className='nav-item'>
            <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                Back
            </Link>
        </li>
        <li className='nav-item' style={{cursor: "pointer"}}>
            <p className='nav-links' onClick={() => window.location.reload()}>
                Retry
            </p>
        </li>
        <li className='nav-item' id='nav-Time'>
           <p className='nav-links'>
            {handleTime()}
           </p>
        </li>
        
    </ul>
    
</nav>
    )
}
