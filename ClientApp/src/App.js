import React, { Component } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './page/Home'
import BrgGame from './page/BrgGame'
import Support from './page/Support'
import Logout from './page/Logout'
import Tfgame from './page/Tfgame'
import CoinflipGame from './page/CoinflipGame'
import ModalLogin from './ModalLogin'
import { Link, Redirect } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route exact path='/'component={Home}/>
          <Route exact path='/brgGame' component={BrgGame}/>
          <Route exact path='/coinflipGame' component={CoinflipGame}/>
          <Route exact path='/tfgame' component={Tfgame}/>
          <Route exact path='/support' component={Support}/>
          <Route exact path='/logout' component={Logout}/>
        </Switch>
    </Router>
    </>
  );
}

export default App
