import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

// Logger with default options
import logger from "redux-logger";

import reducer from "./reducer";

export default function configureStore(initialState) {
    const store = createStore(
        reducer, 
        initialState,
        composeWithDevTools(
            applyMiddleware(logger)
        )
    );
    return store;
}
        