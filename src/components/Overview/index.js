import React from 'react';
import axios from 'axios';

import './styles.css';

import ShipSelector from '../ShipSelector';
import Ship from '../Ship';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      ships: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/ships')
      .then( (res) => {
        console.log(res.data);
        this.setState({
          ships: [ ...res.data ],
        })
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="Overview">
        <ShipSelector ships={this.state.ships}/>
      </div>
    );
  }
}

export default Overview;
