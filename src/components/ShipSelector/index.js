import React from 'react';
import axios from 'axios';

class ShipSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ships: []
    };
  }
  shipSelected = (ship) => {
    this.props.shipSelected(ship);
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/ships')
      .then( (res) => {
        this.setState({
          ships: [ ...res.data ],
        });
      })
      .catch(console.error);
  }
  render() {
    return (
      <div className="ShipSelector" style={shipSelectorStyle}>
        <h2>Select a ship</h2>
        <ul style={shipListStyle}>
          {
            this.state.ships.map(
              (ship) => <li key={ship._id}
                            onClick={this.shipSelected.bind(this, ship)}
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
export default ShipSelector;
