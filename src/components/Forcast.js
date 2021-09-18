import React from 'react'
import LoadScreen from './LoadScreen'

export default class Forcast extends React.Component {
    
    constructor(){
        super();
        this.state = {
            isLoading:true
        }
    }

    componentDidMount(){
        console.log('This component mounted')
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