import ACTIONS from "./action";

const defaultState = {
  items: [],
  maps: [],
  selectedMap: null,
};

const overviewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_MAPS: {
        const maps = action.payload;
        const newState = {
            ...state,
            maps,
        };
      return newState;
    }

    case ACTIONS.Types.SET_SELECTED_MAP: {
        const selectedMap = action.payload;
        const newState = {
            ...state,
            selectedMap,
        };
      return newState;
    }

    default:
      return state;
  }
};

export default overviewReducer;