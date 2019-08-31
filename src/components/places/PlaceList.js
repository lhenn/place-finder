import React, {Component} from 'react';
import PlaceSummary from './PlaceSummary'

class PlaceList extends Component {
  state = {
    isLoaded: false,
    places:[]
  }
  componentDidMount() {
    this.getPlaces(52.353366199999996,4.9586163);
  }
  getPlaces = (lat, lng) => {
    const request = 'https://api.foursquare.com/v2/venues/explore' +
     '?client_id=XYR5YDLGG2GG0VZAH0J4KF2Y1CORCI3FNGZ3NSYYUOYUKEFX' + // client id
     '&client_secret=QHHW1NN1N1EB2D1Q5QRNOZ0PX3LV4FN4FUAVC43KR2ZDMQJ0' + // client secret
     '&v=20190831' + // version
     '&ll=' + lat + ',' + lng;

    fetch(request, {
      method: "GET"
    })
    .then(response => {return response.json();} )
    .then(json => {
      this.setState({
        places: json.response.groups[0].items
      })
    })
    .catch(err => {console.log(err);} )
  }
  render() {
    return(
      <div className='places'>
        <h2> Results </h2>
        <div className="placeList">
          {this.state.places.map(place => {
            return <PlaceSummary key={place.venue.id} place={place} />
            }
          )}
        </div>
      </div>
    )
  }
}

export default PlaceList
