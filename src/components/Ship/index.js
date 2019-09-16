import React from 'react';

function Ship(props) {
    return (
        <div className="Ship" style={shipStyle}>
            <h2>{props.ship.name}</h2>
            <ul style={listStyle}>
                <li style={listItemStyle}>
                    <div style={labelStyle}>Type</div>
                    <div style={dataStyle}>{props.ship.type}</div>
                </li>
                <li style={listItemStyle}>
                    <div style={labelStyle}>ORC</div>
                    <div style={dataStyle}>{props.ship.orcRating}</div>
                </li>
            </ul>
        </div>
    );
}

const shipStyle = {
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

export default Ship;
