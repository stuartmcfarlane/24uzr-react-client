import React from 'react';

class Route extends React.Component {
  bouyHovered = (bouy) => {
    this.props.bouyHovered(bouy)
  }
    render() {
        const bouys = this.props.route
                    ? this.props.route.path.map( (bouy, i) => {
                        return (
                            <li key={i} style={listItemStyle}
                                onMouseEnter={this.props.bouyHovered.bind(this, bouy)}
                                onMouseLeave={this.props.bouyHovered.bind(this, null)}
                            >
                                <div style={labelStyle}>{bouy.name}</div>
                            </li>

                        )
                    })
                    : 'Select start and end bouys'

        return (
            <div className="Route" style={routeStyle}>
                <h2>Route</h2>
                <ul style={listStyle}>
                    {bouys}
                </ul>
            </div>
        );
    }
}

const routeStyle = {
};

const listStyle = {
    listStyle: 'none',
    margin: '0',
    padding: '0',
};

const listItemStyle = {
};

const labelStyle = {
    margin: '0 1rem',
    display: 'inline-block',
};

export default Route;
