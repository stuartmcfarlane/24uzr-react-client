import React from 'react';
import ReactDOM from 'react-dom';
import WindOverlay from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WindOverlay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
