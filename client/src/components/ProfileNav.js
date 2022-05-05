import React, {useState} from 'react'
import Auth from "../utils/auth"
import { BrowserRouter as  Route, Link } from "react-router-dom";
export default function ProfileNav() {
    const handleLogout = () => {
        Auth.logout();
    }
        const [click, setClick] = useState(false)
      
        const handleClick = () => setClick(!click)
        const closeMobileMenu = () => setClick(false);
  return (
    <nav className='navbar'>
             
    <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
    </div>
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        
        <li className='nav-item'>
            <Link to="/quizDashboard" className='nav-links' onClick={closeMobileMenu}>
                Home
            </Link>
        </li>
        <li className='nav-item'>
            <Link to="/" className='nav-links' onClick={() => {handleLogout()}}>
               Logout
            </Link>
        </li>
    </ul>
    
</nav>
  )
}
