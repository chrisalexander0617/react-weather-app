import React from 'react'

export default class  ForcastCard extends React.Component {

    constructor(props){
        super(props)
    }
  
   render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{this.props.date}</h3>
            </div>
        )
   }
   
}