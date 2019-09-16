import React from 'react';
import ShipSelector from '../ShipSelector';
import Ship from '../Ship';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: null,
    };
  }
  shipSelected = (ship) => {
    this.setState({
      ship: ship
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
        </div>
        <div className="main-panel" style={mainPanelStyle}>
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

export default Overview;
