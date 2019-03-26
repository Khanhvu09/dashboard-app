import React, {Component} from 'react'
import SignInNavBar from './SignInNavbar'
import SignOutNavBar from './SignOutNavBar'
import './Nav.css'


class NavBar extends Component {
    render(){
        // if (localStorage.name === undefined){
        if (this.props.loggedIn === false && localStorage.email === undefined){
            return (
                <div className="navbar">
                    <div className="rightLinks">
                        <SignInNavBar />
                    </div>
                </div>
            )
        } else if (this.props.loggedIn === true || localStorage.email.length > 0){
            return (
                <div className="navbar">
                <div className="rightLinks">
                    <SignOutNavBar logOut={this.props.logOut}/>
                </div>
                </div>
            )
        }
    }
}

export default NavBar