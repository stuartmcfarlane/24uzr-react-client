import React from 'react';
import ShipSelector from '../ShipSelector';
import Ship from '../Ship';
import Map from '../Map';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: null,
      selectedBouy: null,
      hoveredBouy: null,
      startBouy: null,
      endBouy: null,
    };
  }
  shipSelected = (ship) => {
    this.setState({
      ship: ship
    })
  }
  bouySelected = (bouy) => {
    this.setState({
      selectedBouy: bouy
    })
  }
  bouyHovered = (bouy) => {
    this.setState({
      hoveredBouy: bouy
    })
  }
  setStartBouy = (bouy) => {
    this.setState({
      selectedBouy: null,
      startBouy: bouy
    })
  }
  setEndBouy = (bouy) => {
    this.setState({
      selectedBouy: null,
      endBouy: bouy
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
          <div className="row">
            {this.state.startBouy
                ? <div style={bouyStyle}>
                    <h3>From</h3>
                    <p>{this.state.startBouy.name}</p>
                    <p>{this.state.startBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.state.startBouy.location.lon.toFixed(4)} E</p>
                    <button onClick={this.setStartBouy.bind(this, null)}>X</button>
                  </div>
                : ''
            }
            {this.state.endBouy
                ? <div style={bouyStyle}>
                    <h3>To</h3>
                    <p>{this.state.endBouy.name}</p>
                    <p>{this.state.endBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.state.endBouy.location.lon.toFixed(4)} E</p>
                    <button onClick={this.setEndBouy.bind(this, null)}>X</button>
                  </div>
                : ''
            }
          </div>
          <div className="row">
            {this.state.selectedBouy
                ? <div style={bouyStyle}>
                    <h3>Selected bouy</h3>
                    <p>{this.state.selectedBouy.name}</p>
                    <p>{this.state.selectedBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.state.selectedBouy.location.lon.toFixed(4)} E</p>
                    <button onClick={this.setStartBouy.bind(this, this.state.selectedBouy)}>From</button>
                    <button onClick={this.setEndBouy.bind(this, this.state.selectedBouy)}>To</button>
                  </div>
                : ''
            }
            {this.state.hoveredBouy
                ? <div style={bouyStyle}>
                    <h3>Bouy</h3>
                    <p>{this.state.hoveredBouy.name}</p>
                    <p>{this.state.hoveredBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.state.hoveredBouy.location.lon.toFixed(4)} E</p>
                  </div>
                : ''
            }
          </div>
        </div>
        <div className="main-panel" style={mainPanelStyle}>
          <Map bouySelected={this.bouySelected}
               bouyHovered={this.bouyHovered}
               startBouy={this.state.startBouy}
               endBouy={this.state.endBouy}
               />
        </div>
        
      </div>
    );
  }
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

const bouyStyle = {
  display: 'inline-block',
  width: '50%',
  float: 'left'
};

export default Overview;
