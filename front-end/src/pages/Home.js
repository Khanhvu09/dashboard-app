import React, {Component} from 'react'
// import ToDo from './ToDo'
import Weather from './Weather'
import {Link} from 'react-router-dom'

class Home extends Component {
    render(){
        return (
            <div className="container">
                <Link to='todo'><button>ToDo List</button></Link>
                {/* <ToDo /> */}
                <Weather />
            </div>
        )
    }
}

export default Home