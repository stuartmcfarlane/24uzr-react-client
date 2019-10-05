import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Logger with default options
import logger from "redux-logger";

import rootReducer from "./app-reducer";

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer, 
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    );
    return store;
}
        