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


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/brgGame' component={BrgGame}/>
          <Route path='/coinflipGame' component={CoinflipGame}/>
          <Route path='/tfgame' component={Tfgame}/>
          <Route path='/support' component={Support}/>
          <Route path='/logout' component={Logout}/>
        </Switch>
    </Router>
    </>
  );
}

export default App
