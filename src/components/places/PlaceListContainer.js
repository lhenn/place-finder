import React, {Component} from 'react';
import BackNav from '../BackNav'
import PlaceList from './PlaceList'
import Loader from '../Loader'


class PlaceListContainer extends Component {
  state = {
    isLoaded: false,
    places:[]
  }
  componentDidMount() {
    this.getPlaces(this.props.lat, this.props.lng, this.props.radius);
  }
  getPlaces = (lat, lng, radius) => {
    const request = 'https://api.foursquare.com/v2/venues/explore' +
     '?client_id=XYR5YDLGG2GG0VZAH0J4KF2Y1CORCI3FNGZ3NSYYUOYUKEFX' + // client id
     '&client_secret=QHHW1NN1N1EB2D1Q5QRNOZ0PX3LV4FN4FUAVC43KR2ZDMQJ0' + // client secret
     '&v=20190831' + // version
     '&ll=' + lat + ',' + lng +
     '&radius=' + radius;
    fetch(request, {
      method: "GET"
    })
    .then(response => {return response.json();} )
    .then(json => {
      console.log(json.response)
      this.setState({
        places: json.response.groups[0].items,
        isLoaded:true
      })
    })
    .catch(err => {console.log(err);} )
  }
  render() {
    const content = this.state.isLoaded ? <PlaceList places={this.state.places}/> : <Loader/>
    return(
      <div className='places'>
        <BackNav label="Filter" linkTo="/"/>
        <h2> Results </h2>
        {content}
      </div>
    )
  }
}

export default PlaceListContainer
