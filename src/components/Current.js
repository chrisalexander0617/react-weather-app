import React from 'react'
import axios from 'axios'

import LoadScreen from './LoadScreen'
import NoInternetScreen from './NoInternetScreen'
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
            locationServicesAccepted:false
        }
    }

    componentDidMount(){

        // Refers to this current component. Prevents undefined setState error
        var currentComponent = this;

       
         // Verifies that there is a consistent internet connection, setting the "isOnline" to false will prompt the no internet connection screen
         setInterval(function(){
            if(!navigator.onLine) {
                currentComponent.setState({
                    isOnline:false
                })
            } 
        }, 1000)

        // Checks to ensure geolocator is available before attempting to grab coordinates
        if ("geolocation" in navigator && navigator.onLine) {

            currentComponent.setState({
                isOnline:true,
                locationServicesAccepted:true,
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
            });
        }
            
        else 
            console.error("Geolocation is not available");
          
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col className="mx-auto" lg={6}>
                        { this.state.isLoading &&  <LoadScreen /> }
                        { !this.state.isOnline && <NoInternetScreen /> }
                        { !this.state.locationServicesAccepted && <NoLocationScreen /> }
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