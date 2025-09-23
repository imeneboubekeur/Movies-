import {  NavLink,Link } from "react-router-dom";
import { useState } from "react";
export default function Header({ searchPage }) {
     const [isOpen, setIsOpen] = useState(false);
    return (<div className="container1">
      <Link to="">  <h1 className="brand">MOVIES.COM</h1></Link>
        <div  className="menu-toggle">
         <button style={{position:"relative"}}
       
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      
      </button>
      </div>
      
          <ul className={`links ${isOpen ? "open" : ""}`}>
            
             <li> <NavLink to ="/"
             className={({ isActive }) => isActive ? "active-link" : ""}>HOME</NavLink></li>
            <li> <NavLink to ="/movies"
            className={({ isActive }) => isActive ? "active-link" : ""}>MOVIES</NavLink></li>
                        <li> <NavLink to ="/series"
                        className={({ isActive }) => isActive ? "active-link" : ""}>SERIES</NavLink></li>
            <li> <NavLink to ="/about"
            className={({ isActive }) => isActive ? "active-link" : ""}>ABOUT US</NavLink></li>

        </ul>
       
        <div className="searchSubscribe">
        <button className="searchBtn" onClick={searchPage}>
            <span className="material-symbols-outlined search">
                search
            </span></button>
            <button className="identify">  <Link to ="/login">S'IDENTIFIER</Link></button>
</div>
    </div>
    )
}