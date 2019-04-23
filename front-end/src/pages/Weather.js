import React, {Component} from 'react'
import axios from 'axios'

class Weather extends Component {
    constructor(){
        super()
        this.state = {
            zipCode: '',
            showWeather: false,
            name: '',
            temp: '',
            cloud: '',
            icon: ''
        }
    }

    componentDidMount(){
        axios({
            method: 'POST',
            url: `http://localhost:4000/getWeather`,
            data: {email: localStorage.email}
        }).then((responseFromBackEnd)=>{
            if (responseFromBackEnd.data.length > 0){
                const zipcode = responseFromBackEnd.data[0].zipcode
                this.setState({
                    zipCode: zipcode,
                    showWeather: true
                })
                const APIKEY = 'd3132c622ab3c6cb25350c27bb9e2f05'
                const url = `http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${APIKEY}&zip=${this.state.zipCode}`
                console.log(url)
                axios.get(url).then((weatherData)=>{
                    let temp = `${weatherData.data.main.temp}`.substring(0,2)
                    let icon = weatherData.data.weather[0].icon
                    this.setState({
                        name: weatherData.data.name,
                        cloud: weatherData.data.weather[0].description,
                        temp: temp,
                        icon: `/weather-icons/${icon}.png`,
                        showWeather: true
                    })
                })
            } 
        })
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            zipCode: event.target.value
        })
    }

    getWeather = (event) => {
        event.preventDefault()
        // console.log('get weather')
        const APIKEY = 'd3132c622ab3c6cb25350c27bb9e2f05'
        const url = `http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${APIKEY}&zip=${this.state.zipCode}`
        console.log(url)
        axios.get(url).then((weatherData)=>{
            let temp = `${weatherData.data.main.temp}`.substring(0,2)
            let icon = weatherData.data.weather[0].icon
            this.setState({
                name: weatherData.data.name,
                cloud: weatherData.data.weather[0].description,
                temp: temp,
                icon: `/weather-icons/${icon}.png`,
                showWeather: true
            })
        })
        axios({
            method: 'POST',
            url: `http://localhost:4000/inputWeather`,
            data: {
                zipCode: this.state.zipCode,
                email: localStorage.email
            }
        })
    }

    render(){
        if (this.state.showWeather === false){
            return(
                <div>
                    <h2>Weather</h2>
                    <form onSubmit={this.getWeather}>
                        <input type='text' onChange={this.handleChange} value={this.state.city}></input>
                        <button type='submit'>Get Weather</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Weather</h2>
                    <img src={this.state.icon} alt=''/>
                    <h4>{this.state.name}</h4>
                    <h4>{this.state.cloud}</h4>
                    <h4>{this.state.temp}&#8457;</h4>
                </div>
            )
        }
    }
}

export default Weather