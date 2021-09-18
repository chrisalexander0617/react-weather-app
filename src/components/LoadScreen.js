import React from 'react';
import LoadingBar from './LoadingBar'

export default function LoadScreen(){
    return (
        <div className="loading-screen">
            <div className="loading-text">Loading</div>
            <LoadingBar />
        </div>
    )
}