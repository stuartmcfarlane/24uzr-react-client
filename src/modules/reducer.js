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

    case ACTIONS.Types.SET_BOUYS: {
        const bouys = action.payload;
        const newState = {
            ...state,
            bouys,
            bouysById: bouys.reduce((bouysById, bouy) => {
                bouysById[bouy._id] = bouy; return bouysById;
              }, {}),
            };
        console.log('reduce bouys state', newState);
        return newState;
    }

    case ACTIONS.Types.SET_LEGS: {
        const legs = action.payload;
        const newState = {
            ...state,
            legs,
        };
        return newState;
    }

    case ACTIONS.Types.SHIP_SELECTED: {
        const ship = action.payload;
        const newState = {
            ...state,
            ship,
        };
        return newState;
    }

    default:
      return state;
  }
};

export default overviewReducer;