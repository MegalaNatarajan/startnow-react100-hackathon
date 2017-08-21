import React from 'react';

const TopSpot = function(props) {
    return(
        <div className='well'>
       
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        
        <a className="btn btn-primary btn-sm" href={"https://maps.google.com/?q="+props.location[0]+","+props.location[1]}>Location</a>

        </div>
       )
  }
  export default TopSpot;