import ACTIONS from "./shipSelector-actions";

const defaultState = {
    ships: [],
};

const shipSelectorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.REQUEST_SHIPS: {
            const newState = {
                ...state,
            };
        return newState;
        }

        case ACTIONS.Types.RECIEVED_SHIPS: {
            const ships = action.payload;
            const newState = {
                ...state,
                ships,
            };
        return newState;
        }

        default:
            return state;
    }
};

export default shipSelectorReducer;