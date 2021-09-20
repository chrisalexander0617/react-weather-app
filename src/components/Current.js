import React from 'react'
import axios from 'axios'

import LoadScreen from './LoadScreen'
import NoLocationScreen from './NoLocationScreen'

import WeatherCard from './WeatherCard'

import { Container, Row, Col } from 'react-bootstrap'

export default class Current extends React.Component {

    constructor(){
        super();
        this.state = {
            isLoading:false,
            cityName:'',
            temp:'',
            isOnline:'',
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

            currentComponent.setState({
                isOnline:true,
                geoLocation:true,
                isLoading:true
            })

            navigator.geolocation.getCurrentPosition(function(position) {

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=bc301f252e62782b84a8350d15fe3e06`
                
                axios.get(api).then(res => {

                    // Removes loading screen and adds data to local state from API call
                    currentComponent.setState({
                        isLoading:false, 
                        cityName:res.data.name, 
                        temp:res.data.main.temp,
                    })
                })
            }, handleGeolocationError );
        }
        
        else 
            console.error("Geolocation is not available");

        /* Verifies that there is a consistent internet connection, 
        setting the "isOnline" to false will prompt the no internet 
        connection screen */
        setInterval(function(){
            if(!navigator.onLine) {
                currentComponent.setState({
                    isOnline:false
                })

                /* Hides the overflow of the document 
                body when the no location screen appears*/
                document.querySelector('body').style.overflowY = "hidden"
            } 
        }, 1000)

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
        return (
            <Container>
                <Row>
                    <Col className="mx-auto" lg={6}>
                        { this.state.isLoading &&  <LoadScreen /> }
                        { !this.state.isOnline && <NoLocationScreen />}
                        { !this.state.geoLocation && <NoLocationScreen /> }
                        <WeatherCard
                            city={this.state.cityName} 
                            temp={this.state.temp} 
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}