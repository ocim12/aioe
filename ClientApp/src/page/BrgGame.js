import React, { Component, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';


function BrgGame(props) {
    const[spin, setSpin] = useState(false);


    function onClick() {
        setSpin(!spin);
        console.log(spin)
    }
    return (

        <div>
            <div className='home'>
            <header>
            <h1>Black Red Green</h1>
            <p>Game</p>
            {

    
            }

            <button onClick={onClick}>Start!</button>
            </header>  
            </div>

            <div>
                
            </div>
        </div>
    )
    
}

export default BrgGame;
