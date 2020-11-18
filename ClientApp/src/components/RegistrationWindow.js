import React, { Component, PureComponent } from 'react'
import './RegistrationWindow.css';
import Modal from 'react-modal';


function RegistrationWindow(){


return(

        <div className="windowReg" id="regWin"> 

        <div id="title">
        <h1>We are glad, you are here.</h1>
        </div>
        <div>
        <input placeholder="Login" className="windowInput"></input>
        <input placeholder="Password"  className="windowInput"></input>
        <input placeholder="E-mail"  className="windowInput"></input>
        <input placeholder="Confirm password"  className="windowInput"></input>
        <button id="registerButton">Register</button>
        </div>
        </div>
)
}

export default RegistrationWindow;