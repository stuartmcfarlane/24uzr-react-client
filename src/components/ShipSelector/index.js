import React from 'react';
import './styles.css';

const ShipSelector = ({ ships }) => {
  return (
    <div>
      <h3>Ships</h3>
      {ships.map((ship) => (
        <div key={ship._id}>{ship.name}</div>
      ))}
    </div>
  )
};


// class ShipSelector extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           ships: null,
//           selection: null
//         }
//     };
//     render() {
//       return (
//         <div className="ShipSelector">
//           <ol>{this.props.ships}</ol>
//         </div>
//       );
//     }
// }

export default ShipSelector;
