import React, {Component} from 'react'
import ToDo from './ToDo'
import Weather from './Weather'

class Home extends Component {
    render(){
        return (
            <div className="container">
                <ToDo />
                <Weather />
            </div>
        )
    }
}

export default Home