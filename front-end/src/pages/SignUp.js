import React, { Component } from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            showAlert: false
        }
    }

    signUp = (formData) =>{
        console.log('Sign up action is running')
        axios({
            method: 'POST',
            url: `http://localhost:4000/signup`,
            data: formData
        }).then((res)=>{
            console.log(res.data.msg)
            if(res.data.msg === 'userExists'){
                this.setState({
                    showAlert: true
                })
            } else if (res.data.msg === 'userAdded'){
                this.props.history.push('/Home')
            }
        })
    }

    signUpSubmit = (event)=>{
        event.preventDefault();
        const name = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        // console.log(email)
        // console.log(password)
        this.signUp({
            name: name,
            email: email,
            password: password
        })
    }

    render(){
        return(
            <main>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Registration Error"
                    text="Email is already registered. Sign in or chooose a different email."
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <form onSubmit={this.signUpSubmit}>
                    <input className='validate' type='name' name='name' id='name'/>
                    <label htmlFor='name'>Enter your name</label>
                    <input className='validate' type='email' name='email' id='email' />
                    <label htmlFor='email'>Enter your email</label>
                    <input className='validate' type='password' name='password' id='password' />
                    <label htmlFor='password'>Enter your password</label>
                    <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Register</button>
                </form>
            </main>
        )
    }
}

export default SignUp