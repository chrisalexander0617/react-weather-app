import React from 'react'

function refresh(){
    window.location.reload()
}

export default function NoLocationScreen()
{
    return (
        <div className="loading-screen no-location-screen">
            <div className="loading-text">Location services not available :(</div>
            <p className="no-internet-text">
                Check to make sure your browser accepts location services <span className="reload-link" onClick={refresh}>reload the page</span>.
            </p>
        </div>
    )
}