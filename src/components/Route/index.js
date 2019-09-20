import React from 'react';

function Route(props) {
    return (
        <div className="Route" style={routeStyle}>
            <h2>Route</h2>
            {
            // <ul style={listStyle}>
            //     <li style={listItemStyle}>
            //         <div style={labelStyle}>Type</div>
            //         <div style={dataStyle}>{props.route.type}</div>
            //     </li>
            //     <li style={listItemStyle}>
            //         <div style={labelStyle}>ORC</div>
            //         <div style={dataStyle}>{props.route.orcRating}</div>
            //     </li>
            // </ul>
            }
        </div>
    );
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

const dataStyle = {
    display: 'inline-block',
    margin: '0 1rem',
};

export default Route;
