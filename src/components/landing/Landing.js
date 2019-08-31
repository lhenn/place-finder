import React, {Component} from 'react';

class Landing extends Component {
  state = {
    lat: '',
    lng: '',
    distanceRadius:null
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
    console.log("found location", position)
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }
  handleChange = (e) => {
    this.setState({
      distanceRadius:e.target.value
    });
    console.log("changed", this.state);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
  }
  render() {
    return(
      <div className="landing">
        <h1>PlaceFinder</h1>
        <form action="handleSubmit">
          <div className="input-group">
            <label htmlFor="distance-select">Find me places within:</label>
            <select id="distance-select" onChange={this.handleChange}>
              <option value="2">2 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
            </select>
          </div>
          <button onClick={this.handleSubmit}>explore!</button>
        </form>
      </div>
    )
  }

}

export default Landing
