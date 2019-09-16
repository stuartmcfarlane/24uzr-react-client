import React from 'react';
import './styles.css';

class ShipSelector extends React.Component {
  shipSelected = (ship) => {
    this.props.shipSelected(ship);
  }
  render() {
    return (
      <div className="ShipSelector">
        <ol>
          {this.props.ships.map(
            (ship) => <li key={ship._id} onClick={this.shipSelected.bind(this, ship)}>{ship.name}</li>)}
        </ol>
      </div>
    );
  }
}

export default ShipSelector;
