import ACTIONS from "./overview-actions";

export const mapStateToProps = state => {
    console.log('mapStateToProps', state)
    const {overview} = state
    return ({
    ...overview
  })
};
  
  export const mapDispatchToProps = dispatch => ({
    onMounted: _ => dispatch(ACTIONS.onMounted()),
    fetchMaps: _ => dispatch(ACTIONS.fetchMaps()),
    requestMaps: _ => dispatch(ACTIONS.requestMaps()),
    recivedMaps: maps => dispatch(ACTIONS.recivedMaps(maps)),
    fetchLegs: _ => dispatch(ACTIONS.fetchLegs()),
    requestLegs: _ => dispatch(ACTIONS.requestLegs()),
    recivedLegs: legs => dispatch(ACTIONS.recivedLegs(legs)),
    fetchBouys: _ => dispatch(ACTIONS.fetchBouys()),
    requestBouys: _ => dispatch(ACTIONS.requestBouys()),
    recivedBouys: bouys => dispatch(ACTIONS.recivedBouys(bouys)),
    setMaps: maps => dispatch(ACTIONS.setMaps(maps)),
    setSelectedMap: map => dispatch(ACTIONS.setSelectedMap(map)),
    setBouys: bouys => dispatch(ACTIONS.setBouys(bouys)),
    setLegs: legs => dispatch(ACTIONS.setLegs(legs)),
    shipSelected: ship => dispatch(ACTIONS.shipSelected(ship)),
    onRoute: (route) => dispatch(ACTIONS.onRoute(route)),
    setRoute: (route) => dispatch(ACTIONS.setRoute(route)),
    bouySelected: (bouy) => dispatch(ACTIONS.bouySelected(bouy)),
    startBouySelected: (bouy) => dispatch(ACTIONS.startBouySelected(bouy)),
    endBouySelected: (bouy) => dispatch(ACTIONS.endBouySelected(bouy)),
    bouyHovered: (bouy) => dispatch(ACTIONS.bouyHovered(bouy)),
    onWindDirection: (degrees) => dispatch(ACTIONS.onWindDirection(degrees)),
    onWindSpeed: (knots) => dispatch(ACTIONS.onWindSpeed(knots)),
    routeHighlighted: (route) => dispatch(ACTIONS.routeHighlighted(route)),
  });
  
  