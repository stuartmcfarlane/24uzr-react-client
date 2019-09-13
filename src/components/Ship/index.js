import React from 'react';
import './styles.css';

class Ship extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { value } = this.props.value;
        if (!value) return <div>none selected</div>
        return (
            <div className="Ship">
                <dl>
                    <dt>Name</dt>
                    <dl>{value.name}</dl>
                </dl>
            </div>
        );
    }
}

export default Ship;
