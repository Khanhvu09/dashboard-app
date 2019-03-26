import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom' 

class Edit extends Component {
    constructor(){
        super()
        this.state = {
            task: '',
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios({
            method: 'GET',
            url: `http://localhost:4000/getTask/${id}`,
        }).then((responseFromBackEnd)=>{
            console.log(responseFromBackEnd.data[0].id)
            this.setState({
                task: responseFromBackEnd.data[0].task,
                date: responseFromBackEnd.data[0].date,
                id: responseFromBackEnd.data[0].id
            })
        })
    }

    

    handleTask = (event) => {
        this.setState({
            task: event.target.value
        })
    }

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    
    
    editTask = (event) => {
        event.preventDefault()
        console.log(this.state.task)
        console.log(this.state.date)
        axios({
            method: 'POST',
            url: `http://localhost:4000/editTask`,
            data: {id: this.state.id, task: this.state.task, date: this.state.date}
        }).then((responseFromBackEnd)=>{
            console.log(responseFromBackEnd.data.msg)
            if (responseFromBackEnd.data.msg === 'taskUpdated'){
                this.props.history.push('/home')
            }
        })
    }


    render(){
        return (
            <div>
                <form onSubmit={this.editTask}>
                    <input type='text' onChange={this.handleTask} placeholder='New Task' value={this.state.task}/>
                    <input type='date' onChange={this.handleDate} value={this.state.date || ''}/>
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }
}

export default Edit