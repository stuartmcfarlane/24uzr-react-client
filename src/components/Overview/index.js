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
    const { startBouy, endBouy, wind } = this.props;
    this.onRoute(startBouy, endBouy, ship, wind);
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
      this.props.setRoute(null)
    }
    this.props.bouySelected(null)
    this.props.startBouySelected(bouy)
    const { endBouy, ship, wind } = this.props;
    if (bouy && endBouy) {
      this.onRoute(bouy, endBouy, ship, wind)
    }
  }
  setEndBouy = (bouy) => {
    if (!bouy) {
      this.props.setRoute(null)
    }
    this.props.bouySelected(null)
    this.props.endBouySelected(bouy)
    const { startBouy, ship, wind } = this.props;
    if (startBouy && bouy) {
      this.onRoute(startBouy, bouy, ship, wind)
    }
  }
  onSelectShip = (ship) => {
    const { startBouy, endBouy, wind } = this.props;
    this.props.shipSelected(ship)
    this.onRoute(startBouy, endBouy, null, wind)
  }
  onWindDirection = (ev) => {
    this.props.onWindDirection(ev.target.value)
  }
  onWindSpeed = (ev) => {
    this.props.onWindSpeed(ev.target.value)
  }
  onWindUpdated = (ev) => {
    ev.preventDefault();
    const { startBouy, endBouy, ship, wind } = this.props;
    this.onRoute(startBouy, endBouy, ship, wind);
  }
  render() {
    const map = this.props.legs && this.props.bouysById
              ? <Map bouys={this.props.bouys}
                  bouysById={this.props.bouysById}
                  legs={this.props.legs}
                  bouySelected={this.props.bouySelected}
                  bouyHovered={this.props.bouyHovered}
                  startBouy={this.props.startBouy}
                  endBouy={this.props.endBouy}
                  route={this.props.route || this.props.highlightedRoute}
                  highlightBouy={this.props.hoveredBouy}
                  wind={this.props.wind}
                  />
              : 'Loading map';
    const route = this.props.route
                ? <div>
                    <button onClick={this.props.setRoute.bind(this, null)}>Select other root</button>
                    <Route route={this.props.route} bouyHovered={this.props.bouyHovered}/>
                  </div>
                : this.props.routes && this.props.routes.length
                ? <RouteSelector routes={this.props.routes}
                                 routeSelected={this.props.setRoute} 
                                 routeHovered={this.props.routeHighlighted}/>
                : '';
    const windSelector = (
      <form onSubmit={this.onWindUpdated}>
        <h2>Wind</h2>
        <label>
          Direction
          <input type="number"
                 value={this.props.wind.degrees}
                 onChange={this.onWindDirection}
                 />
        </label>
        <label>Speed
          <input type="number"
                 value={this.props.wind.knots}
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
            {this.props.startBouy
                ? <div style={bouyStyle}>
                    <h3>From</h3>
                    <p>{this.props.startBouy.name}</p>
                    <p>{this.props.startBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.props.startBouy.location.lon.toFixed(4)} E</p>
                    <button onClick={this.setStartBouy.bind(this, null)}>X</button>
                  </div>
                : ''
            }
            {this.props.endBouy
                ? <div style={bouyStyle}>
                    <h3>To</h3>
                    <p>{this.props.endBouy.name}</p>
                    <p>{this.props.endBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.props.endBouy.location.lon.toFixed(4)} E</p>
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
            {this.props.hoveredBouy
                ? <div style={bouyStyle}>
                    <h3>Bouy</h3>
                    <p>{this.props.hoveredBouy.name}</p>
                    <p>{this.props.hoveredBouy.location.lat.toFixed(4)} N</p>
                    <p>{this.props.hoveredBouy.location.lon.toFixed(4)} E</p>
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

