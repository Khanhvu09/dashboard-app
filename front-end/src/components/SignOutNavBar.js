import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SignOut extends Component{
    
    logout = () => {
        this.props.logOut()
    }
    render(){
        console.log(window.location.pathname)
        
        return (
            <div>
                <Link to='/home'>Home</Link>
                <Link to='/login' onClick={this.logout}> Logout</Link>
            </div>
        )
    } 
}


export default SignOut