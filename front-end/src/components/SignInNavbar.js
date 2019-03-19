import React from 'react'
import { Link } from 'react-router-dom';

function SignUp(props){
    return (
        <div>
            <Link to='/login'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}

export default SignUp