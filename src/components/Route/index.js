import React from 'react';

function Route(props) {
    const bouys = props.route
                ? props.route.path.map( bouy => {
                    return (
                        <li style={listItemStyle}>
                            <div style={labelStyle}>{bouy.name}</div>
                        </li>

                    )
                })
                : 'Select start and end bouys'

    return (
        <div className="Route" style={routeStyle}>
            <h2>Route</h2>
            <ul style={listStyle}>
                {bouys}
            </ul>
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
