import React, {useState} from 'react'
import { BrowserRouter as  Route, Link } from "react-router-dom";
import './Main.css'


export default function QuizNav() {
    const [click, setClick] = useState(false)
      
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

  return (
    
    <nav className='navbar'>
             
    <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
    </div>
    <ul className={click ? 'quizMenu active' : 'quizMenu'}>
        
        <li className='nav-item'>
            <Link to="/quizDashboard" className='nav-links' onClick={closeMobileMenu}>
                Quit
            </Link>
        </li>
        
    </ul>
    
</nav>
  )
}
