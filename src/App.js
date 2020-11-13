import React from "react";
import { Route, Link, Switch } from 'react-router-dom'
import Form from './Components/Form'
import HomePage from './Components/Home'
import image from './Components/Assets/Pizza.jpg'
import './App.css'


function App () {
  return (
    <div className='App'>
      <header>
        <h1 className='PageName'>Dragon Fire Pizza</h1>
        <div className='nav-links'>
          <Link className='links' to='/'>Home</Link>
          <Link className="links" to="/pizza">Order Now</Link>
        </div>
      </header>

      <Switch>
        <Route path='/pizza'>
          <Form />
        </Route>

        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  )
}

export default App
