import React from 'react';
import WindOverlay from './WindOverlay';

import {loc2svg, box2svg} from '../../utils/loc2svg';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boundingBox: {},
      viewBox: {},
    };
  }
  render() {
    const {
      bouys,
      legs,
      bouysById
    } = this.props;
    const boundingBox = getBoundingBox(bouys);
    const viewBox = getViewBox(boundingBox, getRadius(boundingBox));

    const { startBouy, endBouy, highlightBouy } = this.props;
    if (!bouys.length) return 'loadng...';
    const radius = getRadius(boundingBox);
    const circleStrokeWidth = radius / 5;
    const bouyCircles = (bouys || []).map( bouy => {
      const c = loc2svg(bouy.location);
      const fill = highlightBouy && bouy._id === highlightBouy._id
                 ? 'blue'
                 : endBouy && bouy._id === endBouy._id
                 ? 'red'
                 : startBouy && bouy._id === startBouy._id
                 ? 'green'
                 : 'white';
      return (
        <circle key={bouy._id}
                onClick={this.props.bouySelected.bind(this, bouy)}
                onMouseEnter={this.props.bouyHovered.bind(this, bouy)}
                onMouseLeave={this.props.bouyHovered.bind(this, null)}
                cx={c.x}
                cy={c.y}
                r={radius}
                stroke="#666"
                strokeWidth={circleStrokeWidth}
                fill={fill}
        />
      );
    });

    const lineWidth = radius / 5;
    const legLines =  (legs || []).map( leg => {
      const { start, end } = getBouysFromLeg( bouysById, leg );
      const p1 = loc2svg(start.location);
      const p2 = loc2svg(end.location);
      return (
        <line key={leg._id}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#ccc"
              strokeWidth={lineWidth}
        />
      );
    });
    const route = this.props.route
                ? <path stroke="green"
                     strokeWidth={lineWidth}
                     fill="none"
                     d={
                       'M' + this.props.route.path
                         .map(bouy => {
                           const { x, y } = loc2svg(bouy.location);
                           return `${x}, ${y}`;
                         }).join(' L')
                     }
                />
                : '';
    const windOverlay = (
      <WindOverlay boundingBox={box2svg(boundingBox)}
                   wind={this.props.wind}
      />
    );
    const transform=`scale(1,1)`;
    const svg = (
      <svg style={svgStyle}
           viewBox={viewBox}>
        {windOverlay}
        <g id="route" transform={transform}>
          {legLines}
          {bouyCircles}
        </g>
        {route}
      </svg>
    );

    return (
      <div className="Map" style={mapStyle}>
        {svg}
      </div>
    );
  }
}

const makeWindVector = (viewBox, wind) => {
  return '';
}
const getBoundingBox = (bouys) => {
  return bouys.reduce((boundingBox, bouy) => {
    return {
      left: Math.min(boundingBox.left, bouy.location.lon),
      top: Math.max(boundingBox.top, bouy.location.lat),
      right: Math.max(boundingBox.right, bouy.location.lon),
      bottom: Math.min(boundingBox.bottom, bouy.location.lat),
    };
  },
  { left: 9999, top: 0, right: 0, bottom: 9999 });
}
const getViewBox = (boundingBox, margin) => {
  const topLeft = loc2svg({lon: boundingBox.left, lat: boundingBox.top});
  const tightViewBox = {
    x: topLeft.x,
    y: topLeft.y,
    width: boundingBox.right - boundingBox.left,
    height: boundingBox.top - boundingBox.bottom,
  };
  const { x, y, width, height } = {
    x: tightViewBox.x - margin,
    y: tightViewBox.y - margin,
    width: tightViewBox.width + (2 * margin),
    height: tightViewBox.height + (2 * margin),
  };

  return `${x} ${y} ${width} ${height}`;
}
const getRadius = (boundingBox) => {
  return .005;
}

const getBouysFromLeg = (bouysById, leg) => {
  return {
    start: bouysById[leg.start],
    end: bouysById[leg.end],
  }
}

const mapStyle = {
  width: '100%',
  height: '100%',
  padding: '1rem',
};

const svgStyle = {
  width: '100%',
  height: '100%',
};

export default Map;
