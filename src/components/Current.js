import React from 'react'

//Contains our API key from OpenWeatherMap
import env from "react-dotenv";

export default class Current extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    componentDidMount(){
        console.log('This component mounted')
    }

    render(){
        return (
            <div>
               
            </div>
        )
    }
}