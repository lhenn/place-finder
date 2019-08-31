import React from 'react'

const PlaceSummary = ({place}) => {
  return (
    <div className="place-summary">
      {place.venue.name}
    </div>
  )
}

export default PlaceSummary
