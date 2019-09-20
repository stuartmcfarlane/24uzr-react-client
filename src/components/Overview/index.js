import React from 'react';
import ShipSelector from '../ShipSelector';
import Ship from '../Ship';
import Map from '../Map';
import Route from '../Route';
import RouteSelector from '../RouteSelector';

import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: null,
      selectedBouy: null,
      legs: [],
      bouys: [],
      bouysById: {},
      hoveredBouy: null,
      startBouy: null,
      endBouy: null,
      routes: [],
      route: null,
      routeHighlighted: null
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/api/bouys')
      .then((res) => {
        const bouys = [ ...res.data ];

        this.setState({
          bouys,
          bouysById: res.data.reduce((bouysById, bouy) => {
            bouysById[bouy._id] = bouy; return bouysById;
          }, {}),
        });
      })
      .then(() => axios.get('http://localhost:3001/api/legs'))
      .then((res) => {
        this.setState({
          legs: [ ...res.data ],
        });
      })
      .catch(console.error);
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
  path2route = (path) => {
    const route = path && path.length
                ? {
                    start: this.state.bouysById[path[0]],
                    end: this.state.bouysById[path[path.length - 1]],
                    path: path.map( bouyId => this.state.bouysById[bouyId]),
                  }
                : null;
    return route
  }
  setRoute = (route) => {
    this.setState({
      route: route
    })
  }
  onPathsFromApi = (paths) => {
    const routes = paths.map( path => this.path2route(path));
    this.setState({
      routes: routes,
      route: routes[0]
    })
  }
  onRoute = (startBouy, endBouy) => {
      axios.get(`http://localhost:3001/api/routes?start=${startBouy._id}&end=${endBouy._id}`)
        .then((res) => this.onPathsFromApi(res.data.paths))
  }
  setStartBouy = (bouy) => {
    if (!bouy) {
      this.setRoute(null)
    }
    this.setState({
      selectedBouy: null,
      startBouy: bouy
    })
    const { endBouy } = this.state;
    if (bouy && endBouy) {
      this.onRoute(bouy, endBouy)
    }
  }
  setEndBouy = (bouy) => {
    if (!bouy) {
      this.setRoute(null)
    }
    this.setState({
      selectedBouy: null,
      endBouy: bouy
    });
    const { startBouy } = this.state;
    if (startBouy && bouy) {
      this.onRoute(startBouy, bouy)
    }
  }
  onSelectShip = (e) => {
    this.setState({
      ship: null
    })
  }
  routeHovered = (route) => {
    this.setState({
      routeHighlighted: route
    })
  }
  render() {
    const map = this.state.legs && this.state.bouysById
              ? <Map bouys={this.state.bouys}
                  bouysById={this.state.bouysById}
                  legs={this.state.legs}
                  bouySelected={this.bouySelected}
                  bouyHovered={this.bouyHovered}
                  startBouy={this.state.startBouy}
                  endBouy={this.state.endBouy}
                  route={this.state.route || this.state.routeHighlighted}
                  />
              : 'Loading map';
    const route = this.state.route
                ? <div>
                    <button onClick={this.setRoute.bind(this, null)}>Select other root</button>
                    <Route route={this.state.route} />
                  </div>
                : <RouteSelector routes={this.state.routes}
                                 routeSelected={this.setRoute} 
                                 routeHovered={this.routeHovered}/>

    return (
      <div className="Overview" style={overviewStyle}>
        <div className="side-panel" style={sidePanelStyle}>
          {this.state.ship
            ? <div>
                <Ship ship={this.state.ship} />
                <button onClick={this.onSelectShip}>Select other ship</button>
              </div>
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
          {map}
        </div>
        <div className="right-panel" style={rightPanelStyle}>
          {route}
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
  width: '15%',
  height: '100%',
  borderRight: '1px dotted #aaa',
};

const mainPanelStyle = {
  display: 'block',
  float: 'left',
  width: '70%',
  height: '100%',
  borderRight: '1px dotted #aaa',
};

const rightPanelStyle = {
  display: 'block',
  float: 'left',
  width: '15%',
  height: '100%',
  overflowY: 'auto',
};

const bouyStyle = {
  display: 'inline-block',
  width: '50%',
  float: 'left'
};

export default Overview;
