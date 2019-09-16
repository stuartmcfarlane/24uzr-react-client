import React from 'react';
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legs: [],
      bouys: [],
      bouysById: {}
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/api/bouys')
      .then( (res) => {
        this.setState({
          bouys: [ ...res.data ],
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
    const boundingBox = getBoundingBox(this.state.bouys);
    const viewBox = getViewBox(boundingBox);
    const radius = getRadius(boundingBox);
    const bouys = (this.state.bouys || []).map( bouy => {
      return (
        <circle key={bouy._id}
                onClick={this.props.bouySelected.bind(this, bouy)}
                cx={bouy.location.lon}
                cy={bouy.location.lat}
                r={radius}
                fill="red"
        />
      );
    });
    const lineWidth = radius / 5;
    const legs =  (this.state.legs || []).map( leg => {
      const { start, end } = getBouysFromLeg( this.state.bouysById, leg );
      return (
        <line key={leg._id}
              x1={start.location.lon}
              y1={start.location.lat}
              x2={end.location.lon}
              y2={end.location.lat}
              stroke="green"
              strokeWidth={lineWidth}
        />
      );
    });

    return (
      <div className="Map" style={mapStyle}>
        {
          this.state.bouys.length
            ? <svg style={svgStyle} viewBox={viewBox}>{bouys}{legs}</svg>
            : ''
        }
      </div>
    );
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
const getViewBox = (boundingBox) => {
  const tightViewBox = {
    x: boundingBox.left,
    y: boundingBox.bottom,
    width: boundingBox.right - boundingBox.left,
    height: boundingBox.top - boundingBox.bottom,
  };
  const marginX = tightViewBox.width/50;
  const marginY = tightViewBox.height/50;
  const { x, y, width, height } = {
    x: tightViewBox.x - marginX,
    y: tightViewBox.y - marginY,
    width: tightViewBox.width + (2 * marginX),
    height: tightViewBox.height + (2 * marginY),
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
};

const svgStyle = {
  width: '100%',
  height: '100%',
};

export default Map;
