import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Edit from './pages/Edit'

class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false
    }
  }

  logIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  logOut = () => {
    localStorage.removeItem('email')
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <Router>
        <div>
            <NavBar loggedIn={this.state.loggedIn} logOut={this.logOut}/>
          <div>
            <Route exact path='/home' component={Home} onEnter={this.checkLoggedIn}/>
            <Route exact path="/login" component={(routeProps)=>
              <Login {...routeProps} loggedIn={this.logIn}/>
            }/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path='/'/>
            <Route exact path='/edit/:id' component={Edit}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
