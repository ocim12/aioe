import React, { Component, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import AuthService from '../services/AuthService';
import UserService from '../services/UserService'
function BrgGame(props) {
       
    const [message, setMessage] = useState("");

    useEffect(() =>{
        UserService.getBrgGameContent(AuthService.getCurrentUser().userID).then((response) => {
            
                console.log(response);
            
        })
    })
    

    return (
        <div className='home'>
            <header>
            <h1>Black Red Green</h1>
            <p>Game</p>
            <p>siema stary chuju</p>  
            <p>{AuthService.getCurrentUser().email}</p> 
            <p>{}</p> 
            </header>
            
        </div>
    )
    
}

export default BrgGame;
