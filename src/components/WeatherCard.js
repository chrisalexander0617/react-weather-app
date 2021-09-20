import React from 'react';
import { Card } from 'react-bootstrap'

export default function WeatherCard(props) 
{
    return (
        <Card className="forcast-card p-4">
            <h1>{props.city}</h1>
            <h3>{props.temp}F</h3>
        </Card>
    )
}