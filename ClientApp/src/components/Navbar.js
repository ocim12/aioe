import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import './UserTools.css';
import {IconContext} from 'react-icons';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import RegistrationWindow from './RegistrationWindow';

function Navbar() {
    const [sideBar, setSidebar] = useState(false);

    const [navBarActive,setActiveNav] = useState(true);

    const [isActive, setisActive] = useState("block");

    const showSidebar = () => {
      setSidebar(!sideBar);
    }

   const togglePopup = ()=> {  
      var temp1 = "block";
      var temp2 = "none";
      if(isActive != temp1){
        setisActive(temp1);
        document.getElementById("regWin").style.display= isActive;
      }else{
        setisActive(temp2);
        document.getElementById("regWin").style.display = isActive;
      }   
      } 
       const toggleNav = () => {
         setActiveNav(!navBarActive);
       }

  return (
    <><div>
<IconContext.Provider value={{color: 'red'}}> 
      <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onMouseOver = {showSidebar} onMouseOut = {showSidebar}>
              <li className="navbar-toggle">
              </li>
              {SidebarData.map((item,index) => {
                return(
                  <li key={index} className={item.cName} >
                    <Link to={item.path}>
                    {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
              <div className='userTools' >
                <button onClick={togglePopup}>
                  <BiIcons.BiSupport/>
                  <span>Support</span>
                  </button>
                <button>
                  <RiIcons.RiLogoutBoxLine/>
                  <span>Logout</span>
                  </button> 
              </div>       
          </ul>
      </nav>
      <RegistrationWindow/>
      </IconContext.Provider>

    </div>
      
    </>
  )
}

export default Navbar
