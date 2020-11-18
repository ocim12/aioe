import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import './UserTools.css';
import { IconContext } from 'react-icons';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import Modal from 'react-modal';
import './RegistrationWindow.css';

function Navbar() {

  const customStylesReg = {
    content: {
      background: '#18181F',
      height: '680px',
      width: '500px',
      padding: '30px',
      display: 'flex',
      display: 'grid',
      gridColumn: 'auto',
      borderRadius: '12px',
      animation: 'true',
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const customStylesLog = {
    content: {
      background: '#18181F',
      height: '500px',
      width: '400px',
      padding: '30px',
      display: 'flex',
      display: 'grid',
      gridColumn: 'auto',
      borderRadius: '12px',
      animation: 'true',
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const [sideBar, setSidebar] = useState(false);
  const [navBarActive, setActiveNav] = useState(true);
  const [isActive, setisActive] = useState("block");

  const [isLogged, setisLogged] = useState(false);

  const [modalIsOpenReg, setIsOpenReg] = useState(false);
  function openModalReg() {
    setIsOpenReg(true);
  }


  function closeModalReg() {
    setIsOpenReg(false);
  }

  const showSidebar = () => {
    setSidebar(!sideBar);
  }

  const [modalIsOpenLog, setIsOpenLog] = useState(false);
  function openModalLog() {
    setIsOpenLog(true);
  }


  function closeModalLog() {
    setIsOpenLog(false);
  }

  const toggleNav = () => {
    setActiveNav(!navBarActive);
  }

  return (
    <><div>
      <IconContext.Provider value={{ color: 'red' }}>
        <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onMouseOver={showSidebar} onMouseOut={showSidebar}>
            <li className="navbar-toggle">
            </li>
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
            <div className='userTools' >
              <button className="buttonR" onClick={openModalReg} >
                <BiIcons.BiSupport />
                <span>Support</span>
              </button>

              <button className="buttonR" onClick={openModalLog} >
                <RiIcons.RiLogoutBoxLine />
                <span>Login</span>
              </button>
            </div>
          </ul>
        </nav>
        <Modal
          isOpen={modalIsOpenReg}
          style={customStylesReg}
          onRequestClose={closeModalReg}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div id="title"><span id="title">We are glad, you are here</span></div>
          <input placeholder="Login" className="windowInput"></input>
          <input placeholder="Password" className="windowInput"></input>
          <input placeholder="Confirm password" className="windowInput"></input>
          <input placeholder="E-mail" className="windowInput"></input>
          <button id="registerButton">Register</button>
        </Modal>

        <Modal
          isOpen={modalIsOpenLog}
          style={customStylesLog}
          onRequestClose={closeModalLog}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div id="title"><span id="title">Come in!</span></div>
          <input placeholder="Login" className="windowInput"></input>
          <input placeholder="Password" className="windowInput"></input>
          <button id="registerButton">Login</button>
        </Modal>

      </IconContext.Provider>
    </div>

    </>
  )
}

export default Navbar
