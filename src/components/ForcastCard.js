import React from 'react'
import moment from 'moment'

export default function ForcastCard(props) 
{
    return (
        <div className="forcast-card">
            <img className="forcast-card-weather-icon" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt={'icon'} />
            <h3 className="focast-card-temp">{props.temp.toFixed()} F</h3>
            <h3 className="forcast-card-day">{ moment(props.date).format("dddd") }</h3>
            <h3 className="forcast-card-date" >{ moment(props.date).format("MMMM Do YYYY") }</h3>
            <h3 className="forcast-card-time">{ moment(props.date).format("h:mm a") }</h3>
        </div>
    )
}