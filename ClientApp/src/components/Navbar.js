import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import './UserTools.css';
import { IconContext } from 'react-icons';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import Modal from 'react-modal';
import './RegistrationWindow.css';

import { Redirect2 } from 'react-router';
import ModalLogin from '../ModalLogin.js'
import ModalRegister from '../ModalRegister';
import AuthService from '../services/AuthService'



function Navbar() {

  const [sideBar, setSidebar] = useState(false);

  const [isLogged, setisLogged] = useState(false);
  const [modalIsOpenLog, setIsOpenLog] = useState(false);

  const [modalIsOpenReg, setIsOpenReg] = useState(false);


  const showSidebar = () => {
    setSidebar(!sideBar);
  }

  function logout() {

    AuthService.logout();
  }



  return (
    <><div>
      <IconContext.Provider value={{ color: 'red' }}>
        <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onMouseOver={showSidebar} onMouseOut={showSidebar}>
            <div className="navbar-toggle">
              <div className="picture-place">
              </div>
              <div className="player-info">
                <span>Nick gracza</span>
                <span>Balans gracza</span>
              </div>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
            {!isLogged ?
              <div className='userTools' >
                <button className="buttonR" onClick={() => setIsOpenReg(true)} >
                  <RiIcons.RiRegisteredFill />
                  <span>Sign up</span>
                </button>

                <button className="buttonR" onClick={() => setIsOpenLog(true)} >
                  <RiIcons.RiLogoutBoxLine />
                  <span>Login</span>
                </button>
              </div>
              : isLogged && (
                <div className='userTools' >
                  <p>Elo mordo {AuthService.getCurrentUser().name} o numerze ID: {AuthService.getCurrentUser().userID}</p>
                  <button className="buttonR" onClick={() => logout} >
                    <RiIcons.RiLogoutBoxLine />
                    <span>Logout</span>
                  </button>
                </div>
              )}
          </ul>
        </nav>
        <ModalRegister isOpen={modalIsOpenReg} requestClose={setIsOpenReg} setIsOpenReg={setIsOpenReg} />
        <ModalLogin isOpen={modalIsOpenLog} requestClose={setIsOpenLog} setIsOpenLog={setIsOpenLog} setisLogged={setisLogged} />
      </IconContext.Provider>
    </div>
    </>
  )
}

export default Navbar
