import React from 'react'

export default function ForcastCard(props){
    return (
        <div>
            <img src={props.icon} />
            <div>{props.date}</div>
            <div>{props.time}</div>
            <div>{props.temp}</div>
        </div>
    )
}