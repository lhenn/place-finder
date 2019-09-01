import React, {Component} from 'react'
import BackNav from '../BackNav'
import Loader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

class PlaceDetails extends Component {
  state = {
    isLoaded:false,
    venue:{}
  }
  componentDidMount() {
    this.getPlaceDetails();
  }
  getPlaceDetails = () => {
    const request = 'https://api.foursquare.com/v2/venues/' +
      this.props.match.params.id + // venue id
     '?client_id=XYR5YDLGG2GG0VZAH0J4KF2Y1CORCI3FNGZ3NSYYUOYUKEFX' + // client id
     '&client_secret=QHHW1NN1N1EB2D1Q5QRNOZ0PX3LV4FN4FUAVC43KR2ZDMQJ0' + // client secret
     '&v=20190831'  // version
    fetch(request, {
      method: "GET"
    })
    .then(response => {return response.json();} )
    .then(json => {
      this.setState({
        venue: json.response.venue,
        isLoaded:true
      })
    })
    .catch(err => {console.log(err);} )
  }
  render() {

    const url = this.state.isLoaded ? (
      <a href={this.state.venue.url}><FontAwesomeIcon className="icon" icon={faLink}/>website</a>
    ) : <div>No website available</div>

    const content = this.state.isLoaded ? (
        <div className='place-details'>
          <h2>{this.state.venue.name}</h2>
          {this.state.venue.categories[0].name}
          <div className="address">
            {this.state.venue.location.formattedAddress[0]}, <br></br>
            {this.state.venue.location.formattedAddress[1]}
          </div>
          {url}
        </div>
      ) : <Loader/>

      return(
        <div>
          <BackNav label="Results" linkTo='/places'/>
          {content}
        </div>
      )
  }
}


export default PlaceDetails


// if (this.state.isLoaded) {
//   return(
//     <div>
//       <h2>{this.state.venue.name}</h2>
//       {this.state.venue.location.address}
//       {this.state.venue.categories[0].name}
//     </div>
//   )
// } else {
//   return <Loader/>
// }
