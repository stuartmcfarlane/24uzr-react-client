import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Logger with default options
import logger from "redux-logger";

import reducer from "./reducer";

export default function configureStore(initialState) {
    const store = createStore(
        reducer, 
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    );
    return store;
}
        