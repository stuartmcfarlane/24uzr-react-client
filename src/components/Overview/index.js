import React from 'react';
import { connect } from "react-redux";

import axios from 'axios';

import ShipSelector from '../ShipSelector';
import Ship from '../Ship';
import Map from '../Map';
import Route from '../Route';
import RouteSelector from '../RouteSelector';

import { mapStateToProps, mapDispatchToProps} from "./overview-redux";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredBouy: null,
      startBouy: null,
      endBouy: null,
      routeHighlighted: null,
      wind: {
        degrees: 45,
        knots: 3
      },
    };
  }
  componentDidMount() {
    console.log('overviewDidMount props', this.props)
    let mapId;
    axios
      .get('http://localhost:3001/api/maps')
      .then((res) => {
        const maps = [...res.data];
        this.props.setMaps(maps)
        // const selectedMap = maps.filter( map => map.name === 'simple graph' )[0]
        const selectedMap = maps.filter( map => map.name === '24uzr-2016' )[0]
        mapId = selectedMap._id
        this.props.setSelectedMap(selectedMap);
      })
      .then( () => axios.get(`http://localhost:3001/api/bouys?mapId=${mapId}`) )
      .then((res) => {
        const bouys = [ ...res.data ];
        this.props.setBouys(bouys)
      })
      .then(() => axios.get(`http://localhost:3001/api/legs?mapId=${mapId}`))
      .then((res) => {
        const legs = [ ...res.data ];
        this.props.setLegs(legs)
      })
      .catch(console.error);
  }
  shipSelected = (ship) => {
    this.props.shipSelected(ship)
    const { startBouy, endBouy, wind } = this.state;
    this.onRoute(startBouy, endBouy, ship, wind);
  }
  bouySelected = (bouy) => {
    this.props.bouySelected(bouy)
  }
  bouyHovered = (bouy) => {
    this.setState({
      hoveredBouy: bouy
    })
  }
  setRoute = (route) => {
    this.props.setRoute(route)
    this.setState({
      route: route
    })
  }
  onRoute = (startBouy, endBouy, ship, wind) => {
    if (startBouy && endBouy && ship && wind) {
      const route = {
        shipId:ship._id,
        mapId:this.props.selectedMap._id,
        start:startBouy._id,
        end:endBouy._id,
        windDegrees: wind.degrees,
        windKnots: wind.knots,
      }
      this.props.onRoute(route)
    }
  }
  setStartBouy = (bouy) => {
    if (!bouy) {
      this.setRoute(null)
    }
    this.props.selectedBouy(null)
    this.setState({
      selectedBouy: null,
      startBouy: bouy
    })
    const { endBouy, wind } = this.state;
    const { ship } = this.props;
    if (bouy && endBouy) {
      this.onRoute(bouy, endBouy, ship, wind)
    }
  }
  setEndBouy = (bouy) => {
    if (!bouy) {
      this.setRoute(null)
    }
    this.props.selectedBouy(null)
    this.setState({
      selectedBouy: null,
      endBouy: bouy
    });
    const { startBouy, wind } = this.state;
    const { ship } = this.props;
    if (startBouy && bouy) {
      this.onRoute(startBouy, bouy, ship, wind)
    }
  }
  onSelectShip = (ship) => {
    const { startBouy, endBouy, wind } = this.state;
    this.setState({
      ship: null
    })
    this.onRoute(startBouy, endBouy, null, wind)
  }
  routeHovered = (route) => {
    this.setState({
      routeHighlighted: route
    })
  }
  onWindDirection = (ev) => {
    this.setState({
      wind: {
        knots: this.state.wind && this.state.wind.knots,
        degrees: ev.target.value,
      }
    })
  }
  onWindSpeed = (ev) => {
    this.setState({
      wind: {
        knots: ev.target.value,
        degrees: this.state.wind && this.state.wind.degrees,
      }
    })
  }
  onWindUpdated = (ev) => {
    ev.preventDefault();
    const { startBouy, endBouy, wind } = this.state;
    const { ship } = this.props;
    this.onRoute(startBouy, endBouy, ship, wind);
  }
  render() {
    const map = this.props.legs && this.props.bouysById
              ? <Map bouys={this.props.bouys}
                  bouysById={this.props.bouysById}
                  legs={this.props.legs}
                  bouySelected={this.bouySelected}
                  bouyHovered={this.bouyHovered}
                  startBouy={this.state.startBouy}
                  endBouy={this.state.endBouy}
                  route={this.props.route || this.state.routeHighlighted}
                  highlightBouy={this.state.hoveredBouy}
                  wind={this.state.wind}
                  />
              : 'Loading map';
    const route = this.props.route
                ? <div>
                    <button onClick={this.setRoute.bind(this, null)}>Select other root</button>
                    <Route route={this.props.route} bouyHovered={this.bouyHovered}/>
                  </div>
                : this.props.routes && this.props.routes.length
                ? <RouteSelector routes={this.props.routes}
                                 routeSelected={this.setRoute} 
                                 routeHovered={this.routeHovered}/>
                : '';
    const windSelector = (
      <form onSubmit={this.onWindUpdated}>
        <h2>Wind</h2>
        <label>
          Direction
          <input type="number"
                 value={this.state.wind.degrees}
                 onChange={this.onWindDirection}
                 />
        </label>
        <label>Speed
          <input type="number"
                 value={this.state.wind.knots}
                 onChange={this.onWindSpeed}
                 />
        </label>
        <button>Reroute</button>
      </form>
    )
    return (
      <div className="Overview" style={overviewStyle}>
        <div className="side-panel" style={sidePanelStyle}>
          {this.props.ship
            ? <div>
                <Ship ship={this.props.ship} />
                <button onClick={this.onSelectShip}>Select other ship</button>
              </div>
            : <ShipSelector ships={this.props.ships} shipSelected={this.shipSelected}/>
          }
          {windSelector}
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
            {this.props.selectedBouy
                ? <div style={bouyStyle}>
                    <h3>Selected bouy</h3>
                    <p>{this.props.selectedBouy.name}</p>
                    <p>{this.props.selectedBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.props.selectedBouy.location.lon.toFixed(4)} E</p>
                    <button onClick={this.setStartBouy.bind(this, this.props.selectedBouy)}>From</button>
                    <button onClick={this.setEndBouy.bind(this, this.props.selectedBouy)}>To</button>
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

function makeRoute(url, query) {
  const qs = Object.keys(query || {})
    .filter(k => query[k] !== null && query[k] !== undefined)
    .map(k => `${k}=${query[k]}`)
    .join('&');
  return `${url}${qs.length ? '?' : ''}${qs}`;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);

