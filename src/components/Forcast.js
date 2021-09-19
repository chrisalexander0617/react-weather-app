import React from 'react'
import axios from 'axios'

import LoadScreen from './LoadScreen'
import ForcastCard from './ForcastCard'

export default class Forcast extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            forcastData:''
        }
    }
   
    componentDidMount(){
      
        // Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

        // Checks to ensure geolocator is available before attempting to grab coordinates
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {

                const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=bc301f252e62782b84a8350d15fe3e06`
                
                axios.get(api).then(res => {

                    // Removes loading screen and adds data from API call
                    currentComponent.setState({
                        isLoading:false, 
                        forcastData:res.data.list
                    })
                })
            });
        }
            
        else 
            console.error("Geolocation is not available");
    }

    render(){

        // variable needs to be initialized before being used in if state or you'll get an undefined error
        var forcastCards = []

        // checks if forcast data is in state
        if(this.state.forcastData) {
            this.state.forcastData.forEach(forcast => {
                forcastCards.push(<ForcastCard icon={forcast.weather[0].icon} date={forcast.dt_txt} temp={forcast.main.temp} /> )
            })
        }

        return (
            <div>
                { 
                    // Ternary operator that conditional renders the loading screen based on current state value 
                    this.state.isLoading &&  <LoadScreen /> 
                }

                { forcastCards }
            </div>
        )
    }
    
}