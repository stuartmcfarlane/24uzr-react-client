import React from 'react';
import prettyMs from 'pretty-ms';

const nmPerMetre = 0.000539957;

function humanTime(s) {
    if (!Number(s)) return '-';
    return prettyMs(s * 1000, {
        millisecondsDecimalDigits: 0,
        secondsDecimalDigits: 0,
    });
}
class Route extends React.Component {
  bouyHovered = (bouy) => {
    this.props.bouyHovered(bouy)
  }
    render() {
        console.log('route', this.props.route)
        const nMiles = (this.props.route.length * nmPerMetre).toFixed(2);
        const nTime = humanTime(this.props.route.seconds);
        const bouys = this.props.route
                    ? this.props.route.path.map( (bouy, i) => {
                        return (
                            <li key={i} style={listItemStyle}
                                onMouseEnter={this.props.bouyHovered.bind(this, bouy)}
                                onMouseLeave={this.props.bouyHovered.bind(this, null)}
                            >
                                <div style={labelStyle}>{i?i:''} {bouy.name}</div>
                            </li>

                        )
                    })
                    : 'Select start and end bouys'

        return (
            <div className="Route" style={routeStyle}>
                <h2>Route</h2>
                <p>{nMiles} nM</p>
                <p>{nTime}</p>
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
