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

    case ACTIONS.Types.REQUEST_ROUTES: {
        const newState = {
            ...state,
            route: null,
            routes: [],
        };
        return newState;
    }

    case ACTIONS.Types.RECIEVED_ROUTES: {
        const paths = action.payload
        const routes = paths.map( path => {
            return path && path.length
            ? {
                start: state.bouysById[path.bouys[0]],
                end: state.bouysById[path.bouys[path.bouys.length - 1]],
                length: path.length,
                seconds: path.seconds,
                path: path.bouys.map( bouyId => state.bouysById[bouyId]),
              }
            : null;

        });
        const route = routes[0]
        const newState = {
            ...state,
            routes,
            route,
        };
        return newState;
    }

    case ACTIONS.Types.SET_ROUTE: {
        const route = action.payload;
        const newState = {
            ...state,
            route,
        };
        return newState;
    }

    default:
      return state;
  }
};

export default overviewReducer;