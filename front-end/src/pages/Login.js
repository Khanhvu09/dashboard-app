import React, { Component } from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            msg: '',
            showAlert: false
        }
    }
    

    login = (formData) =>{
        console.log('login action is running')
        axios({
            method: 'POST',
            url: `http://localhost:4000/login`,
            data: formData
        }).then((res)=>{
            console.log(res)
            if(res.data.msg === 'baduser'){
                this.setState({
                    msg: 'Email does not exist',
                    showAlert: true
                })
            } else if (res.data.msg === 'badpassword'){
                this.setState({
                    msg: 'Wrong password',
                    showAlert: true
                })
            } else if (res.data.msg === 'loginsuccess'){
                // this.setSession(res)
                localStorage.setItem('email', res.data.email);
                this.props.loggedIn()
                this.props.history.push('/home')
            }
        })
    }

    // setSession = (res) => {
    //     let expiresAt = JSON.stringify((res.expiresIn * 1000) + new Date().getTime());
    //     localStorage.setItem('name', res.data.user);
    //     // this.props.history.push('/home')
    //   }

    loginSubmit = (event)=>{
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[1].value
        // console.log(email)
        // console.log(password)
        this.login({
            email: email,
            password: password
        })
    }

    render(){
        return(
            <main>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Login Error"
                    text={this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <form onSubmit={this.loginSubmit}>
                    <input className='validate' type='email' name='email' id='email' />
                    <label htmlFor='email'>Enter your email</label>
                    <input className='validate' type='password' name='password' id='password' />
                    <label htmlFor='password'>Enter your password</label>
                    {/* <a className='pink-text' href='#!'><b>Forgot Password?</b></a> */}
                    <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Sign In</button>
                </form>
            </main>
        )
    }
}

export default Login