import React, {Component} from 'react';
import BackNav from '../BackNav'
import PlaceList from './PlaceList'
import Loader from '../Loader'


class PlaceListContainer extends Component {
  state = {
    isLoaded: false,
    places:[],
    err:false
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
      if(json.meta.code===200) this.updatePlaceList(json.response.groups[0].items);
      else this.handleError();
    })
    .catch(err => {
      console.log(err);
    })
  }
  updatePlaceList = (items) => {
    this.setState({
      places: items,
      isLoaded:true
    })
  }
  handleError = () => {
    this.setState({
      isLoaded:true,
      err:true
    })
  }
  render() {
    const Content = () => {
      if(this.state.isLoaded && this.state.err) return ( // error in fetching data
        <div className='err'>
          Sorry, something went wrong. <br></br>
          <BackNav label='home' linkTo='/'/>
        </div>
      )
      if(this.state.isLoaded &&  // no results found
        !this.state.err &&
        this.state.places.length === 0) return (
          <div className='err'>
            No places found. Please try a bigger radius. <br></br>
            <BackNav label='home' linkTo='/'/>
          </div>
        )
      if(this.state.isLoaded && !this.state.err) return ( // results found
        <PlaceList places={this.state.places}/>
      )
      return <Loader/>
    };

    return(
      <div className='places'>
        <BackNav label="Filter" linkTo="/"/>
        <h2> Results </h2>
        <Content/>
      </div>
    )
  }
}

export default PlaceListContainer
