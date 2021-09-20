import React from 'react'
import axios from 'axios'

import LoadScreen from './LoadScreen'
import ForcastCard from './ForcastCard'
import NoLocationScreen from './NoLocationScreen'

import { Container, Row } from 'react-bootstrap'

export default class Forcast extends React.Component {
    constructor(){
        super();
        this.state = {
            // Determines the display of loading screen
            isLoading:true,

            // Will contain the weather forcast data upon API fetch
            forcastData:'',

            // Determines if there is a current internet connection
            isOnline:'',

            // Determines if geolocation is available
            geoLocation:true
        }
    }

    componentDidMount(){
        // Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

        /* Ensures that the document body is scrollable on the Y axis 
        if it has been disabled by setInterval below the 2nd 
        if else statement*/
        document.querySelector('body').style.overflowY = "visible"

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

        // Verifies that there is a consistent internet connection (checks every second)
        setInterval(function(){
            if(!navigator.onLine) {
                currentComponent.setState({
                    isOnline:false
                })

                /* [Cosmetic] Hides the overflow of the document 
                body when the no location screen appears (prevents scroll)*/
                document.querySelector('body').style.overflowY = "hidden"
            } 
            else 
                document.querySelector('body').style.overflowY = "visible"
        }, 1000)


        // Responsible for sending feedback to you and the user if there is an issue with the browser's geolocation feature
        function handleGeolocationError(error){
            var errorMessage;
            
            // Handing errors from geolocation by geolocation error codes
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
            console.error(errorMessage)
    
            return
        }
    }

    render(){
        // variable needs to be initialized before being used in if state or you'll get an undefined error
        var forcastCards = []

        // checks if forcast data is in state
        if(this.state.forcastData) {
            // Proceeding to populate array once condition is met
            this.state.forcastData.forEach( (forcast, i) => {
                forcastCards.push(<ForcastCard  key={i} icon={forcast.weather[0].icon} date={forcast.dt_txt} temp={forcast.main.temp} /> )
            })
        }

        return (
            <div>
                {
                    // Initial loading screen
                    this.state.isLoading &&  <LoadScreen />
                }
                {
                    // No loading screen that appears if internet connection is disconnected
                    !this.state.isOnline && <NoLocationScreen />
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