import ACTIONS from "./overview-actions";

export const mapStateToProps = state => {
    console.log('mapStateToProps', state)
    const {overview} = state
    return ({
    ...overview
  })
};
  
  export const mapDispatchToProps = dispatch => ({
    setMaps: maps => dispatch(ACTIONS.setMaps(maps)),
    setSelectedMap: map => dispatch(ACTIONS.setSelectedMap(map)),
    setBouys: bouys => dispatch(ACTIONS.setBouys(bouys)),
    setLegs: legs => dispatch(ACTIONS.setLegs(legs)),
    shipSelected: ship => dispatch(ACTIONS.shipSelected(ship)),
    onRoute: (route) => dispatch(ACTIONS.onRoute(route)),
    setRoute: (route) => dispatch(ACTIONS.setRoute(route)),
  });
  
  