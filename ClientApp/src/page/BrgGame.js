import React, { Component, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import AuthService from '../services/AuthService';
function BrgGame(props) {
       

    return (
        <div className='home'>
            <header>
            <h1>Black Red Green</h1>
            <p>Game</p>
            <p>siema stary chuju</p>  
            <p>{AuthService.getCurrentUser().email}</p> 
            </header>
            
        </div>
    )

}

export default BrgGame;
