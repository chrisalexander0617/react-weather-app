import React from 'react'
import axios from 'axios'

//import env from "react-dotenv";

import LoadScreen from './LoadScreen'

export default class Current extends React.Component {
    constructor(){
        super();
        this.state = {
            isLoading:true,
        }
    }

    componentDidMount(){
        //Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

        //Checks to ensure geolocator is available before attempting to grab coordinates
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bc301f252e62782b84a8350d15fe3e06`
                
                axios.get(api).then(res => {

                    //Removes loading screen once data has been successfully retrieved
                    currentComponent.setState({isLoading:false})
                    
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
            </div>
        )
    }
}