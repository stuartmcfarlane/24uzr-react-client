import ACTIONS from "./overview-actions";

const defaultState = {
    maps: [],
    selectedMap: null,
    ship: null,
    legs: [],
    bouys: [],
    bouysById: {},
    routes: [],
    route: null,
    selectedBouy: null,
    hoveredBouy: null,
    startBouy: null,
    endBouy: null,
    wind: {
        degrees: 45,
        knots: 3
    },
    highlightedRoute: null,
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

    case ACTIONS.Types.BOUY_SELECTED: {
        const selectedBouy = action.payload;
        const newState = {
            ...state,
            selectedBouy,
        };
        return newState;
    }

    case ACTIONS.Types.START_BOUY_SELECTED: {
        const startBouy = action.payload;
        const newState = {
            ...state,
            startBouy,
        };
        return newState;
    }

    case ACTIONS.Types.END_BOUY_SELECTED: {
        const endBouy = action.payload;
        const newState = {
            ...state,
            endBouy,
        };
        return newState;
    }

    case ACTIONS.Types.BOUY_HOVERED: {
        const hoveredBouy = action.payload;
        const newState = {
            ...state,
            hoveredBouy,
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

    case ACTIONS.Types.ON_WIND_DIRECTION: {
        const degrees = action.payload;
            const wind = {
                ...state.wind,
                degrees,
            }
        const newState = {
            ...state,
            wind,
        };
        return newState;
    }

    case ACTIONS.Types.ON_WIND_SPEED: {
        const knots = action.payload;
            const wind = {
                ...state.wind,
                knots,
            }
        const newState = {
            ...state,
            wind,
        };
        return newState;
    }

    case ACTIONS.Types.ROUTE_HIGHLIGHTED: {
        const highlightedRoute = action.payload;
        const newState = {
            ...state,
            highlightedRoute,
        };
        return newState;
    }

    default:
      return state;
  }
};

export default overviewReducer;