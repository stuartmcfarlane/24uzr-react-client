import React from 'react';
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
    fetch('http://localhost:3001/api/ships')
      .then( res => res.json() )
      .then( (ships) => {
        this.setState({
          ships: ships
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
