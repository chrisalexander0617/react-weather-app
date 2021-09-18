import React from 'react';

export default function WeatherCard(props) {
    return (
        <div>
            <h1>{props.city}</h1>
            <h3>{props.temp}</h3>
        </div>
    )
}