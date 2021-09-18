import React from 'react'

export default class Current extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    componentDidMount(){
        console.log('This component mounted')
    }

    render(){
        return (
            <div>
                Current
            </div>
        )
    }
}