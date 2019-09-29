import React from 'react';

class WindOverlay extends React.Component {
  render() {
    const {
      boundingBox,
      wind,
    } = this.props;
    console.log('WindOverlay', this.props)
    const arrowCount = 20;
    const lineWidth = (boundingBox.right - boundingBox.left) / 800;
    const arrows = makeGrid(boundingBox, arrowCount, arrowCount)
      .map(makeArrow.bind(null, wind))
      .map(line2windArrow.bind(null, '#aaa', lineWidth));

    return (
      <g id="windOverlay">
        {arrows}
      </g>
    );
  }
}

function line2windArrow(color, lineWidth, line, key) {
  return (
    <React.Fragment>
      {point2circle(color, lineWidth * 2, { x: line.x1, y: line.y1})}
      {line2svg(color, lineWidth, line, key)}
    </React.Fragment>
  )
}

function line2svg(color, lineWidth, line, key) {
  return (
    <line key={key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={color}
          strokeWidth={lineWidth}
    />
  )  
}

function point2circle(color, radius, point, key) {
  return (
    <circle key={key}
            cx={point.x}
            cy={point.y}
            r={radius}
            fill={color}
    />
  )  
}

function box2svg(stroke, lineWidth, box, key) {
  const path = `M ${box.left} ${box.top} H ${box.right} V ${box.bottom} H ${box.left} Z`;
  return (
    <path key={key}
          d={path}
          stroke={stroke}
          strokeWidth={lineWidth}
          fill="transparent"
    />
  )  
}

function makeGrid(box, xCount, yCount) {
  const width = (box.right - box.left) / xCount;
  const height = (box.bottom - box.top) / yCount;
  console.log('box', box, width, height)
  const originBox = {
    top: box.top,
    left: box.left,
    bottom: box.top + height,
    right: box.left + width,
  }
  let grid = Array(xCount * yCount);
  for (let i = 0, y = 0; y < yCount; y++) {
    for (let x = 0; x < xCount; x++, i++ ) {
      grid[i] = translateBox(originBox, width * x, height * y);
    }
  }
  return grid;
}
function degrees2unitVector(degrees) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x1: 0,
    y1: 0,
    x2: Math.cos(radians),
    y2: Math.sin(radians)
  }
}
function makeArrow(wind, box) {
  const len = (wind.knots / 10) * (box.right - box.left) * 0.8;
  const unitVector = degrees2unitVector(wind.degrees-270);
  const windVector = scaleLine(unitVector, len, len)
  const boxCenter = {
    x: box.left + (box.right - box.left) / 2,
    y: box.top + (box.bottom - box.top) / 2,
  }
  const arrow = translateLine(windVector, boxCenter.x, boxCenter.y);
  return arrow;
}

function translateBox(box, x, y) {
  return {
    top: box.top + y,
    left: box.left + x,
    bottom: box.bottom + y,
    right: box.right + x,
  }
}
function translateLine(line, x, y) {
  return {
    x1: line.x1 + x,
    y1: line.y1 + y,
    x2: line.x2 + x,
    y2: line.y2 + y,
  }
}
function scaleLine(line, x, y) {
  return {
    x1: line.x1 * x,
    y1: line.y1 * y,
    x2: line.x2 * x,
    y2: line.y2 * y,
  }
}
export default WindOverlay;
