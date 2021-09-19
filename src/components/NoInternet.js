import React from 'react'

function refresh(){
    window.location.reload()
}

export default function LoadScreen()
{
    return (
        <div className="loading-screen">
            <div className="loading-text">No internet connection :(</div>
            <p className="no-internet-text">
                You have no internet service available! Connect to a network and <span className="reload-link" onClick={refresh}>reload the page</span>.
            </p>
        </div>
    )
}