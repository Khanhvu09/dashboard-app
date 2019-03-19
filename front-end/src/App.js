import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

class App extends Component {

  requireAuth = (props) => {
    
  }

  render() {
    return (
      <Router>
        <div>
            <NavBar />
          <div>
            <Route exact path='/home' component={Home} onEnter={this.requireAuth}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
