import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../../modules/store";

import Overview from '../Overview';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <Overview /> 
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
