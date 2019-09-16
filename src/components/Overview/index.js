import React from 'react';
import axios from 'axios';

import './styles.css';

import ShipSelector from '../ShipSelector';
import Ship from '../Ship';

console.log(Ship)

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: null,
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
      .catch(console.error);
  }
  shipSelected = (ship) => {
    this.setState({
      ship: ship
    })
  }
  render() {
    return (
      <div className="Overview">
        <Ship ship={this.state.ship} />
        <ShipSelector ships={this.state.ships} shipSelected={this.shipSelected}/>
      </div>
    );
  }
}

export default Overview;
