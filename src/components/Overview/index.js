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
      maps: [],
      selectedMap: null,
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
    let mapId;
    axios
      .get('http://localhost:3001/api/maps')
      .then((res) => {
        const maps = [...res.data];
        // const selectedMap = maps.filter( map => map.name === 'simple graph' )[0]
        const selectedMap = maps.filter( map => map.name === '24uzr-2016' )[0]
        mapId = selectedMap._id
        this.setState({
          maps,
          selectedMap
        })
      })
      .then( () => axios.get(`http://localhost:3001/api/bouys?mapId=${mapId}`) )
      .then((res) => {
        const bouys = [ ...res.data ];
        this.setState({
          bouys,
          bouysById: res.data.reduce((bouysById, bouy) => {
            bouysById[bouy._id] = bouy; return bouysById;
          }, {}),
        });
      })
      .then(() => axios.get(`http://localhost:3001/api/legs?mapId=${mapId}`))
      .then((res) => {
        console.log(res.data)
        this.setState({
          legs: [ ...res.data ],
        });
      })
      .catch(console.error);
  }
  shipSelected = (ship) => {
    console.log('ship selected', ship)
    this.setState({
      ship: ship
    })
    this.onRoute(this.state.startBouy, this.state.endBouy, ship);
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
                    start: this.state.bouysById[path.bouys[0]],
                    end: this.state.bouysById[path.bouys[path.bouys.length - 1]],
                    length: path.length,
                    path: path.bouys.map( bouyId => this.state.bouysById[bouyId]),
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
    console.log('paths from api', paths)
    const routes = paths.map( path => this.path2route(path));
    console.log('into routes', routes)
    this.setState({
      routes: routes,
      route: routes[0]
    })
  }
  onRoute = (startBouy, endBouy, ship) => {
    if (ship && startBouy && endBouy) {
      axios.get(`http://localhost:3001/api/routes?shipId=${ship._id}&mapId=${this.state.selectedMap._id}&start=${startBouy._id}&end=${endBouy._id}`)
        .then((res) => this.onPathsFromApi(res.data.paths))
    }
  }
  setStartBouy = (bouy) => {
    if (!bouy) {
      this.setRoute(null)
    }
    this.setState({
      selectedBouy: null,
      startBouy: bouy
    })
    const { endBouy, ship } = this.state;
    if (bouy && endBouy) {
      this.onRoute(bouy, endBouy, ship)
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
    const { startBouy, ship } = this.state;
    if (startBouy && bouy) {
      this.onRoute(startBouy, bouy, ship)
    }
  }
  onSelectShip = (ship) => {
    this.setState({
      ship: null
    })
    this.onRoute(this.state.startBouy, this.state.endBouy, null)
  }
  routeHovered = (route) => {
    this.setState({
      routeHighlighted: route
    })
  }
  render() {
    console.log('routes', this.state.routes)
    const map = this.state.legs && this.state.bouysById
              ? <Map bouys={this.state.bouys}
                  bouysById={this.state.bouysById}
                  legs={this.state.legs}
                  bouySelected={this.bouySelected}
                  bouyHovered={this.bouyHovered}
                  startBouy={this.state.startBouy}
                  endBouy={this.state.endBouy}
                  route={this.state.route || this.state.routeHighlighted}
                  highlightBouy={this.state.hoveredBouy}
                  />
              : 'Loading map';
    const route = this.state.route
                ? <div>
                    <button onClick={this.setRoute.bind(this, null)}>Select other root</button>
                    <Route route={this.state.route} bouyHovered={this.bouyHovered}/>
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
