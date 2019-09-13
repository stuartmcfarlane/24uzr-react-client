import React from 'react';
import ReactDOM from 'react-dom';
import Ship from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ship />, div);
  ReactDOM.unmountComponentAtNode(div);
});
