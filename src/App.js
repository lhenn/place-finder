import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/landing/Landing'
import PlaceListContainer from './components/places/PlaceListContainer'
import PlaceDetails from './components/places/PlaceDetails'


class App extends Component {
  state = {
    lat: '',
    lng: '',
    radius:1000,
    err: ''
  }
  componentDidMount() {
    this.findUserLocation();
  }
  findUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateLocation, this.updateLocationError);
    } else {
      this.setState({err:"Geolocation is not supported by this browser."});
    }
  }
  updateLocation = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }
  updateLocationError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.setState({err:"User denied the request for Geolocation."});
        break;
      case error.POSITION_UNAVAILABLE:
        this.setState({err:"Location information is unavailable."});
        break;
      case error.TIMEOUT:
        this.setState({err:"The request to get user location timed out."});
        break;
      default:
        this.setState({err:"An unknown error occurred."});
    }
  }
  handleRadiusData = (radius) => {
    this.setState({
      radius:radius
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route
              exact path='/'
              render = {(routeProps) => (
                <Landing
                  {...routeProps}
                  handleRadiusData={this.handleRadiusData}
                  err={this.state.err}
                  />
              )}
              />
            <Route
              path='/places'
              render={(routeProps) => (
                <PlaceListContainer
                  {...routeProps}
                  lat={this.state.lat}
                  lng={this.state.lng}
                  radius={this.state.radius}
                  />
              )}
              />
            <Route path='/place/:id' component={PlaceDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
