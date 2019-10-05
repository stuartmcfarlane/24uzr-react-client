import axios from 'axios'
import makeApiUrl from '../../utils/makeApiUrl';

const Types = {
    ON_MOUNTED: 'ON_MOUNTED',
    
    FETCH_MAPS: 'FETCH_MAPS',
    REQUEST_MAPS: 'REQUEST_MAPS',
    RECIEVED_MAPS: 'RECIEVED_MAPS',

    FETCH_LEGS: 'FETCH_LEGS',
    REQUEST_LEGS: 'REQUEST_LEGS',
    RECIEVED_LEGS: 'RECIEVED_LEGS',

    FETCH_BOUYS: 'FETCH_BOUYS',
    REQUEST_BOUYS: 'REQUEST_BOUYS',
    RECIEVED_BOUYS: 'RECIEVED_BOUYS',

    SET_MAPS: "SET_MAPS",
    SET_SELECTED_MAP: "SET_SELECTED_MAP",
    SET_BOUYS: "SET_BOUYS",
    SET_LEGS: "SET_LEGS",
    SHIP_SELECTED: "SHIP_SELECTED",
    ON_ROUTE: "ON_ROUTE",
    REQUEST_ROUTES: "REQUEST_ROUTES",
    RECIEVED_ROUTES: "RECIEVED_ROUTES",
    SET_ROUTE: "SET_ROUTE",
    BOUY_SELECTED: "BOUY_SELECTED",
    BOUY_HOVERED: "BOUY_HOVERED",
    START_BOUY_SELECTED: "START_BOUY_SELECTED",
    END_BOUY_SELECTED: "END_BOUY_SELECTED",
    ON_WIND_DIRECTION: "ON_WIND_DIRECTION",
    ON_WIND_SPEED: "ON_WIND_SPEED",
    ROUTE_HIGHLIGHTED: "ROUTE_HIGHLIGHTED",
  };
  
  // actions
const onMounted = _ => dispatch => {
    dispatch(fetchMaps())
}

const fetchMaps = _ => dispatch => {
    dispatch(requestMaps())
    axios
    .get('http://localhost:3001/api/maps')
    .then((res) => {
      const maps = [...res.data];
      dispatch(recievedMaps(maps))
      // const selectedMap = maps.filter( map => map.name === 'simple graph' )[0]
      const selectedMap = maps.filter( map => map.name === '24uzr-2016' )[0]
      dispatch(setSelectedMap(selectedMap))
      dispatch(fetchLegs(selectedMap._id))
      dispatch(fetchBouys(selectedMap._id))

    })
    .catch(console.error);
};
  
const requestMaps = _ => ({
    type: Types.REQUEST_MAPS,
});
  
const recievedMaps = maps => ({
    type: Types.RECIEVED_MAPS,
    payload: maps
});
  
const fetchLegs = mapId => dispatch => {
    dispatch(requestLegs())
    axios.get(`http://localhost:3001/api/legs?mapId=${mapId}`)
    .then((res) => {
      const legs = [ ...res.data ];
      dispatch(recievedLegs(legs))
    })
    .catch(console.error);
};
  
const requestLegs = _ => ({
    type: Types.REQUEST_LEGS,
});
  
const recievedLegs = legs => ({
    type: Types.RECIEVED_LEGS,
    payload: legs
});
  
const fetchBouys = mapId => dispatch => {
    dispatch(requestBouys())
    axios.get(`http://localhost:3001/api/bouys?mapId=${mapId}`)
    .then((res) => {
      const bouys = [ ...res.data ];
      dispatch(recievedBouys(bouys))
    })
    .catch(console.error);
};
  
const requestBouys = _ => ({
    type: Types.REQUEST_BOUYS,
});
  
const recievedBouys = bouys => ({
    type: Types.RECIEVED_BOUYS,
    payload: bouys
});
  
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

const bouySelected = bouy => ({
    type: Types.BOUY_SELECTED,
    payload: bouy
});

const startBouySelected = bouy => ({
    type: Types.START_BOUY_SELECTED,
    payload: bouy
});

const endBouySelected = bouy => ({
    type: Types.END_BOUY_SELECTED,
    payload: bouy
});

const bouyHovered = bouy => ({
    type: Types.BOUY_HOVERED,
    payload: bouy
});

const onRoute = (route) => dispatch => {
    dispatch(requestRoutes())
    axios.get(makeApiUrl('http://localhost:3001/api/routes', route))
    .then(res => dispatch(recieveRoutes(res.data.paths)))
    .catch(console.error)
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
  
const onWindDirection = degrees => ({
    type: Types.ON_WIND_DIRECTION,
    payload: degrees
});
  
const onWindSpeed = knots => ({
    type: Types.ON_WIND_SPEED,
    payload: knots
});
  
const routeHighlighted = route => ({
    type: Types.ROUTE_HIGHLIGHTED,
    payload: route
});
  
 
export default {
    onMounted,
    fetchMaps,
    requestMaps,
    recievedMaps,
    fetchLegs,
    requestLegs,
    recievedLegs,
    fetchBouys,
    requestBouys,
    recievedBouys,
    setMaps,
    setSelectedMap,
    setBouys,
    setLegs,
    shipSelected,
    onRoute,
    requestRoutes,
    recieveRoutes,
    setRoute,
    bouySelected,
    startBouySelected,
    endBouySelected,
    bouyHovered,
    onWindDirection,
    onWindSpeed,
    routeHighlighted,
    Types
};
  