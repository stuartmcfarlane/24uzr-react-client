import React from 'react';
import ReactDOM from 'react-dom';
import ShipSelector from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShipSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
