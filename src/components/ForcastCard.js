import React from 'react'
import moment from 'moment'

export default class  ForcastCard extends React.Component {

    constructor(props){
        super(props)
    }
  
   render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{ moment(this.props.date).format("dddd, MMMM Do YYYY, h:mm:ss a") }</h3>
            </div>
        )
   }

}