import React from 'react'

//Contains our API key from OpenWeatherMap
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
        setTimeout(() => {
            this.setState({isLoading:false})
        }, 1000)
    }

    render(){
        return (
            <div>
               { this.state.isLoading &&  <LoadScreen /> }
            </div>
        )
    }
}