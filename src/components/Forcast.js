import React from 'react'
import axios from 'axios'

//import env from "react-dotenv";

import LoadScreen from './LoadScreen'
import WeatherCard from './WeatherCard'

export default class Forcast extends React.Component {
    
    constructor(){
        super();
        this.state = {
            isLoading:true,
            cityName:'',
            temp:''
        }
    }

    componentDidMount(){
        //Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

        //Checks to ensure geolocator is available before attempting to grab coordinates
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=bc301f252e62782b84a8350d15fe3e06`
                
                axios.get(api).then(res => {

                    //Removes loading screen and adds data from API call
                    currentComponent.setState({
                        isLoading:false, 
                        cityName:res.data.name, 
                        temp:res.data.main.temp
                    })
                })
            });
        }
            
        else 
            console.error("Geolocation is not available");
    }

    render(){
        return (
            <div>
                { 
                /* Ternary operator that conditional 
                renders the loading screen based on current 
                state value */
                this.state.isLoading &&  <LoadScreen /> 
                }
                <WeatherCard
                    city={this.state.cityName} 
                    temp={this.state.temp} 
                />
            </div>
        )
    }

}