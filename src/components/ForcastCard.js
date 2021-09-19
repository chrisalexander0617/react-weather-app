import React from 'react'
import moment from 'moment'

export default class  ForcastCard extends React.Component {

    constructor(props){
        super(props)
    }
  
   render(){
        return (
            <div className="forcast-card">
                <img className="forcast-card-weather-icon" src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`} alt={'icon'} />
                <h3 className="focast-card-temp">{this.props.temp.toFixed()} F</h3>
                <h3 className="forcast-card-day">{ moment(this.props.date).format("dddd") }</h3>
                <h3 className="forcast-card-date" >{ moment(this.props.date).format("MMMM Do YYYY") }</h3>
                <h3 className="forcast-card-time">{ moment(this.props.date).format("h:mm a") }</h3>
            </div>
        )
   }
   
}