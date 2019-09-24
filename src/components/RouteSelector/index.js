import React from 'react';

const nmPerMetre = 0.000539957;

class RouteSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
  }
  routeSelected = (route) => {
    this.props.routeSelected(route);
  }
  routeHovered = (route) => {
    this.props.routeHovered(route)
  }
  render() {
    console.log(this.props)
    return (
      <div className="RouteSelector" style={routeSelectorStyle}>
        <h2>Select a route</h2>
        <ul style={routeListStyle}>
          {
            this.props.routes.map(
              (route, i) => {
                const { start, end, length } = route;
                const nMiles = (route.length * nmPerMetre).toFixed(2);
                return (
                  <li key={i}
                            onClick={this.routeSelected.bind(this, route)}
                            style={routeStyle}
                            onMouseEnter={this.props.routeHovered.bind(this, route)}
                            onMouseLeave={this.props.routeHovered.bind(this, null)}
                        >{route.start.name} - {route.end.name} : {nMiles}</li>
                )
              }
            )
          }
        </ul>
      </div>
    );
  }
}

const routeSelectorStyle = {
};

const routeListStyle = {
  listStyle: 'none',
  margin: '1rem 0',
  padding: '0',
  borderTop: '1px solid #aaa',
};

const routeStyle = {
  padding: '.5rem',
  borderBottom: '1px solid #aaa',
  backgroundColor: '#eee'
};
export default RouteSelector;
