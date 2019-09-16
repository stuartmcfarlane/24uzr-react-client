import React from 'react';
import './styles.css';

function Ship(props) {
    if (!props.ship) return <div>none selected</div>
    return (
        <div className="Ship">
            <dl>
                <dt>Name</dt>
                <dl>{props.ship.name}</dl>
            </dl>
        </div>
    );
}

export default Ship;
