import React from 'react';

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps} from "./shipSelector-redux";

class ShipSelector extends React.Component {
  componentDidMount() {
    this.props.fetchShips()
  }
  render() {
    return (
      <div className="ShipSelector" style={shipSelectorStyle}>
        <h2>Select a ship</h2>
        <ul style={shipListStyle}>
          {
            this.props.ships.map(
              (ship) => <li key={ship._id}
                            onClick={this.props.shipSelected.bind(this, ship)}
                            style={shipStyle}
                        >{ship.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

const shipSelectorStyle = {
};

const shipListStyle = {
  listStyle: 'none',
  margin: '1rem 0',
  padding: '0',
  borderTop: '1px solid #aaa',
};

const shipStyle = {
  padding: '.5rem',
  borderBottom: '1px solid #aaa',
  backgroundColor: '#eee'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipSelector)
