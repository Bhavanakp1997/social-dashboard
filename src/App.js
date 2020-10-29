import React from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>   
        <Link to="/"></Link>
        <Route path='/' component= {Login} exact={true}/>
        <Route path='/dashboard/:id' component={Dashboard}/>
      </div>
    </BrowserRouter>
  )
}

export default App
