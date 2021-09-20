import React from 'react'
import axios from 'axios'

import LoadScreen from './LoadScreen'
import NoInternetScreen from './NoInternetScreen'
import ForcastCard from './ForcastCard'
import NoLocationScreen from './NoLocationScreen'

import { Container, Row } from 'react-bootstrap'

export default class Forcast extends React.Component {
    
    constructor(){
        super();
        this.state = {
            isLoading:true,
            forcastData:'',
            isOnline:'',
            geoLocation:true
        }
    }

    

    componentDidMount(){

        // Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

        // Verifies that the navigator is online initially
        if(navigator.onLine) {
            currentComponent.setState({
                isOnline:true
            }) 
        }
        
        // Checks to ensure geolocator is available before attempting to grab coordinates
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {

                const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=bc301f252e62782b84a8350d15fe3e06`
                
                axios.get(api).then(res => {

                    // Removes loading screen and adds data from API call
                    currentComponent.setState({
                        isLoading:false, 
                        forcastData:res.data.list,
                        geoLocation:true
                    })
                })
            },  handleGeolocationError );
        }
            
        else {
            console.error("Geolocation is not available");
        }

        // Verifies that there is a consistent internet connection
        setInterval(function(){
            if(!navigator.onLine) {
                currentComponent.setState({
                    isOnline:false
                })
            } 
        }, 1000)


        // Responsible for sending feedback to you and the user if there is an issue with the browser's geolocation feature
        function handleGeolocationError(error){
            var errorMessage;
    
            switch(error.code){
                case 1:
                    errorMessage = "User has denied location sevices, or browser has blocked access to geolocation"
                    //Insert setState method here
                    currentComponent.setState({
                        geoLocation:false
                    })
                    break;
                case 2:
                    errorMessage = "Geolocation position unavailable, please try again"
                    currentComponent.setState({
                        geoLocation:false
                    })
                    break;
                case 3:
                    errorMessage = "Timeout"
                    currentComponent.setState({
                        geoLocation:false
                    })
                    break;
                default:
                    errorMessage = "There is an issue"
                    currentComponent.setState({
                        geoLocation:false
                    })
            }
            
            // For browser feedback
            console.log(errorMessage)
    
            return
        }
    }

    render(){

        // variable needs to be initialized before being used in if state or you'll get an undefined error
        var forcastCards = []

        // checks if forcast data is in state
        if(this.state.forcastData) {
            this.state.forcastData.forEach( (forcast, i) => {
                forcastCards.push(<ForcastCard key={i} icon={forcast.weather[0].icon} date={forcast.dt_txt} temp={forcast.main.temp} /> )
            })
        }

        return (
            <div>
                {
                    // Initial loading screen
                    this.state.isLoading &&  <LoadScreen />
                }
                {}
                {
                    // No loading screen that appears if internet connection is disconnected
                    !this.state.isOnline && <NoInternetScreen />
                }
                {
                    // Screen that displays when geolocation services are not available (due to settings or user' action)
                    !this.state.geoLocation && <NoLocationScreen />
                }
                <Container>
                    <Row>
                        { forcastCards }
                    </Row>
                </Container>
            </div>
        )
    }
}