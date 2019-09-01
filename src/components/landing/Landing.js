import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'

const Landing = ({handleRadiusData, err}) => {

  // sends user-selected radius back to parent component
  const handleChange = (e) => {
    handleRadiusData(e.target.value);
  }
  // stores the link to '/places' if geolocation is found, otherwise displays error
  const geolocationGateway = err ? (
    <div className='err'>Sorry, we could not locate you. {err} </div> ) : (
      <Link to='/places' className="submit">Find Places!</Link>
    );
  return(
    <div className="landing">
      <h1>PlaceFinder</h1>
      <div className="icon-wrapper">
        <FontAwesomeIcon className="icon" icon={faMapPin} />
      </div>
      <div className="input-group">
        <label htmlFor="distance-select">Find me places within:</label>
        <select id="distance-select" onChange={handleChange}>
          <option value="1000">1 km</option>
          <option value="2000">2 km</option>
          <option value="5000">5 km</option>
          <option value="10000">10 km</option>
        </select>
      </div>
      {geolocationGateway}
    </div>
  )

}


export default Landing
