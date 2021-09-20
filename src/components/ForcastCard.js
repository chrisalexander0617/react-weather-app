import React from 'react'
import moment from 'moment'

import { Col, Card } from 'react-bootstrap'

export default function ForcastCard(props) 
{
    return (
        <React.Fragment>
            <Col sm={6} md={4} lg={3}>
                <Card className="forcast-card my-4 pb-4">
                    <img className="forcast-card-weather-icon" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt={'icon'} />
                    <h1 className="focast-card-temp">{props.temp.toFixed()} F</h1>
                    <h4 className="forcast-card-day text-light-blue">{ moment(props.date).format("dddd") }</h4>
                    <h5 className="forcast-card-date text-light-blue" >{ moment(props.date).format("MMMM Do YYYY") }</h5>
                    <h5 className="forcast-card-time text-light-blue">{ moment(props.date).format("h:mm a") }</h5>
                </Card>
            </Col>
        </React.Fragment>
    )
}