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
    radius:1000
  }
  componentDidMount() {
    this.findUserLocation();
  }
  findUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  updatePosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
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
                <Landing {...routeProps} handleRadiusData={this.handleRadiusData} />
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
