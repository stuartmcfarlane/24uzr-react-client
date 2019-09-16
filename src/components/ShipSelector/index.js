import React from 'react';
import './styles.css';

// const ShipSelector = ({ ships }) => {
//   return (
//     <div>
//       <h3>Ships</h3>
//       {ships.map((ship) => (
//         <div key={ship._id}>{ship.name}</div>
//       ))}
//     </div>
//   )
// };


class ShipSelector extends React.Component {
    render() {
      return (
        <div className="ShipSelector">
          <ol>
            {this.props.ships.map(
              (ship) => <li>{ship.name}</li>)}
          </ol>
        </div>
      );
    }
}

export default ShipSelector;
