import React from 'react'
import { Link } from 'react-router-dom';

function SignIn(props){
    return (
        <div>
            <Link to='/login'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}

export default SignIn