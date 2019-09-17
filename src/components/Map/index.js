import React from 'react';
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boundingBox: {},
      viewBox: {},
      legs: [],
      bouys: [],
      bouysById: {},
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/api/bouys')
      .then( (res) => {
        const bouys = [ ...res.data ];
        const boundingBox = getBoundingBox(bouys);
        const viewBox = getViewBox(boundingBox, getRadius(boundingBox));

        this.setState({
          boundingBox,
          viewBox,
          bouys,
          bouysById: res.data.reduce( (bouysById, bouy) => {
            bouysById[bouy._id] = bouy; return bouysById;
          }, {}),
        });
      })
      .then( () => axios.get('http://localhost:3001/api/legs'))
      .then( (res) => {
        this.setState({
          legs: [ ...res.data ],
        });
      })
      .catch(console.error);
  }
  render() {
    const {
      boundingBox,
      viewBox,
      bouys,
      legs,
      bouysById
    } = this.state;
    if (!bouys.length) return 'loadng...';
    const radius = getRadius(boundingBox);
    const bouyCircles = (bouys || []).map( bouy => {
      const c = loc2svg(bouy.location);
      return (
        <circle key={bouy._id}
                onClick={this.props.bouySelected.bind(this, bouy)}
                cx={c.x}
                cy={c.y}
                r={radius}
                fill="red"
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
              stroke="green"
              strokeWidth={lineWidth}
        />
      );
    });
    const cornerMarkerLength = radius * 5;
    const topLeftPath = (
      `M ${boundingBox.left + cornerMarkerLength} ${boundingBox.top}
       L ${boundingBox.left} ${boundingBox.top}
       L ${boundingBox.left} ${boundingBox.top - cornerMarkerLength}`
    );
    const topLeft = (
      <path fill="transparent" stroke="blue" strokeWidth={lineWidth}
            d={topLeftPath}
      />
    );
    const bottomRightPath = (
      `M ${boundingBox.right - cornerMarkerLength} ${boundingBox.bottom}
       L ${boundingBox.right} ${boundingBox.bottom}
       L ${boundingBox.right} ${boundingBox.bottom + cornerMarkerLength}`
     );
    const bottomRight = (
      <path fill="transparent" stroke="blue" strokeWidth={lineWidth}
            d={bottomRightPath}
      />
    );
    // const transform=`scale(1,-1) translate(0,-2 * ${boundingBox.top})`;
    const transform=`scale(1,1)`;
    const svg = (
      <svg style={svgStyle}
           viewBox={viewBox}>
        <g transform={transform}>
          {topLeft}
          {bottomRight}
          {bouyCircles}
          {legLines}
        </g>
      </svg>
    );

    return (
      <div className="Map" style={mapStyle}>
        {svg}
      </div>
    );
  }
}

const loc2svg = (loc) => {
  return {
    x: loc.lon,
    y: -1 * loc.lat,
  }
}

const getBoundingBox = (bouys) => {
  return bouys.reduce( (boundingBox, bouy) => {
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
