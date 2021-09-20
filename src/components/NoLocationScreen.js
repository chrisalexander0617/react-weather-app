import React from 'react'

function refresh(){
    window.location.reload()
}

export default function NoLocationScreen()
{
    return (
        <div className="no-location-screen">
            <div className="loading-text">Location services not available :(</div>
            <p className="no-internet-text">
                Check to make sure your browser accepts 
                location services and that you have an 
                internet connection then <span className="reload-link" onClick={refresh}>reload the page</span>.
            </p>
        </div>
    )
}