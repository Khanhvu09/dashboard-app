import React, {Component} from 'react'
import SignInNavBar from './SignInNavbar'


class NavBar extends Component {
    render(){
        console.log(this)
        return (
            <div>
                <SignInNavBar />
            </div>
        )
    }
}

export default NavBar