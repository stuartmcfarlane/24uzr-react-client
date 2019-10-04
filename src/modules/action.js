import axios from 'axios'
import makeApiUrl from '../utils/makeApiUrl';

const Types = {
    SET_MAPS: "SET_MAPS",
    SET_SELECTED_MAP: "SET_SELECTED_MAP",
    SET_BOUYS: "SET_BOUYS",
    SET_LEGS: "SET_LEGS",
    SHIP_SELECTED: "SHIP_SELECTED",
    ON_ROUTE: "ON_ROUTE",
    REQUEST_ROUTES: "REQUEST_ROUTES",
    RECIEVED_ROUTES: "RECIEVED_ROUTES",
    SET_ROUTE: "SET_ROUTE",
  };
  
  // actions
const setMaps = maps => ({
    type: Types.SET_MAPS,
    payload: maps
});
  
const setSelectedMap = map => ({
    type: Types.SET_SELECTED_MAP,
    payload: map
});
  
const setBouys = bouys => ({
    type: Types.SET_BOUYS,
    payload: bouys
});
  
const setLegs = legs => ({
    type: Types.SET_LEGS,
    payload: legs
});
  
const shipSelected = ship => ({
    type: Types.SHIP_SELECTED,
    payload: ship
});

const onRoute = (route) => dispatch => {
    dispatch(requestRoutes())
    axios.get(makeApiUrl('http://localhost:3001/api/routes', route))
    .then(res => dispatch(recieveRoutes(res.data.paths)));
};
  
const requestRoutes = () => ({
    type: Types.REQUEST_ROUTES,
    payload: {}
});
  
const recieveRoutes = (paths) => ({
    type: Types.RECIEVED_ROUTES,
    payload: paths
});
const setRoute = route => ({
    type: Types.SET_ROUTE,
    payload: route
});
  
 
export default {
    setMaps,
    setSelectedMap,
    setBouys,
    setLegs,
    shipSelected,
    onRoute,
    requestRoutes,
    recieveRoutes,
    setRoute,
    Types
};
  