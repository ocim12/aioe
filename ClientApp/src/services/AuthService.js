import React, { Component, useEffect, useState } from 'react'


 const register = (username, password, email) => {
    let user = {
        "name": username,
        "password": password,
        "email": email
    }
    return fetch('api/user/reg',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json' },
        body: JSON.stringify(user)
      })
}

const login = (username, password) => {
    let user = {
        "name": username,
        "password": password,
    }
    return fetch('api/user/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json' },
        body: JSON.stringify(user)
      });
}

const logout = () => {

}
const getCurrentToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}


export default {
    register, 
    login,
    logout,
    getCurrentToken,
    getCurrentUser
}