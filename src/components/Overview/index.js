import React from 'react';
import ShipSelector from '../ShipSelector';
import Ship from '../Ship';
import Map from '../Map';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: null,
      selectedBouy: null
    };
  }
  shipSelected = (ship) => {
    this.setState({
      ship: ship
    })
  }
  bouySelected = (bouy) => {
    console.log('bouy', bouy)
    this.setState({
      selectedBouy: bouy
    })
  }
  render() {
    return (
      <div className="Overview" style={overviewStyle}>
        <div className="side-panel" style={sidePanelStyle}>
          {this.state.ship
            ? <React.Fragment>
                <ShipSelector ships={this.state.ships} shipSelected={this.shipSelected}/>
                <Ship ship={this.state.ship} />
              </React.Fragment>
            : <ShipSelector ships={this.state.ships} shipSelected={this.shipSelected}/>
          }
          {this.state.selectedBouy
              ? <React.Fragment>
                  <h3>Selected bouy</h3>
                  <p>{this.state.selectedBouy.name}</p>
                  <p>{this.state.selectedBouy.location.lat.toFixed(4)} N</p>
                  <p>{this.state.selectedBouy.location.lon.toFixed(4)} E</p>
                </React.Fragment>
              : ''
          }
        </div>
        <div className="main-panel" style={mainPanelStyle}>
          <Map bouySelected={this.bouySelected}/>
        </div>
        
      </div>
    );
  }
}

const displayLocation = (loc) => {
  const lat = loc.lat.toFixed(4);
  const lon = loc.lon.toFixed(4);
  return `${lat} N ${lon} E`;
}

const overviewStyle = {
  height: '100vh',
};

const sidePanelStyle = {
  display: 'block',
  float: 'left',
  width: '20%',
  height: '100%',
  borderRight: '1px dotted #aaa',
};

const mainPanelStyle = {
  display: 'block',
  float: 'left',
  width: '80%',
  height: '100%',
};

export default Overview;
