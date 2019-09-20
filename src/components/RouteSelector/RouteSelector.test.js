import React from 'react';
import ReactDOM from 'react-dom';
import RouteSelector from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RouteSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
