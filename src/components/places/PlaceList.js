import React from 'react';
import PlaceSummary from './PlaceSummary'
import {Link} from 'react-router-dom'

// returns a list of place summaries that link to corresponding place details
const PlaceList = ({places}) => {
    return(
        <div className="place-list">
          {places.map(place => {
            return (
              <Link key={place.venue.id} to={'/place/' + place.venue.id}>
                <PlaceSummary place={place} />
              </Link>
            )
            }
          )}
        </div>
    )
}

export default PlaceList
