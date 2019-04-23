import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import Modal from './Modal'

class ToDo extends Component {
    constructor(){
        super()
        this.state = {
            task: '',
            taskArray: [],
            show: false,
            editTask: ''
        }
    }

    componentDidMount(){
        axios({
            method: 'POST',
            url: `http://localhost:4000/getTask`,
            data: {email: localStorage.email}
        }).then((responseFromBackEnd)=>{
            this.setState({
                taskArray: responseFromBackEnd.data
            })
        })
    }

    showModal = (props) => {
        const id = props.id
        axios({
            method: 'GET',
            url: `http://localhost:4000/getTask/${id}`,
        }).then((responseFromBackEnd)=>{
            this.setState({
                editTask: responseFromBackEnd.data[0].task,
                editDate: responseFromBackEnd.data[0].date,
                id: responseFromBackEnd.data[0].id,
                show: true
            })
        })
    }

    addTask = (event) => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `http://localhost:4000/addTask`,
            data: {
                task: this.state.task,
                date: this.state.date,
                email: localStorage.email
            }
        }).then((responseFromBackEnd) => {
            // console.log(responseFromBackEnd.data)
            this.setState({
                task: '',
                date: '',
                taskArray: responseFromBackEnd.data
            }) 
        })
    }

    handleTask = (event) => {
        this.setState({
            task: event.target.value
        })
    }
    handleTaskEdit = (event) => {
        this.setState({
            editTask: event.target.value
        })
    }

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }
    handleDateEdit = (event) => {
        this.setState({
            editDate: event.target.value
        })
    }

    deleteTask = (props) => {
        axios({
            method: 'POST',
            url: `http://localhost:4000/deleteTask`,
            data: {id: props.id, uid: props.uid}
        }).then((responseFromBackEnd)=>{
            this.setState({
                taskArray: responseFromBackEnd.data
            })
        })
    }
    
    editTask = (event) => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `http://localhost:4000/editTask`,
            data: {
                id: this.state.id, 
                task: this.state.editTask, 
                date: this.state.editDate, 
                email: localStorage.email
            }
        }).then((responseFromBackEnd)=>{
            this.setState({
                taskArray: responseFromBackEnd.data,
                show: false
            })
        })
    }


    render(){
        const taskList = this.state.taskArray.map((data)=>{
            return (
                <tr id="table-row" key={data.id}>
                    <td>{data.task}</td>
                    <td>{moment(data.date).format('MM/DD/YYYY')}</td>
                    <td><button onClick={() => this.showModal({id: data.id})}>Edit</button></td>
                    <td><button onClick={() => this.deleteTask({id: data.id, uid: data.uid})}>Delete</button></td>
                </tr>
            )
        })
        return (
            <div className="todo-container">
                <Modal show={this.state.show}>
                    <div>
                        <form onSubmit={this.editTask}>
                            <input type='text' onChange={this.handleTaskEdit} placeholder='New Task' value={this.state.editTask} required/>
                            <input type='date' onChange={this.handleDateEdit} value={this.state.editDate || ''} required/>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </Modal>
                <form id="todo-form" onSubmit={this.addTask}>
                    <input type='text' id="task-input" onChange={this.handleTask} placeholder='New Task' value={this.state.task} required/>
                    <input type='date' id='date-input' onChange={this.handleDate} value={this.state.date || ''} required/>
                    <button type="submit" id="submit-input">Add Task</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ToDo