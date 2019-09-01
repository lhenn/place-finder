import React from 'react'


const PlaceSummary = ({place}) => {
  return (
    <div className="place-summary">
      <div className="overview">
        <span className="name">{place.venue.name}</span> <br></br>
        {place.venue.categories[0].name}
      </div>
      <div className="distance">
        {place.venue.location.distance} m
      </div>
    </div>
  )
}

export default PlaceSummary
