const Types = {
    SET_MAPS: "SET_MAPS",
    SET_SELECTED_MAP: "SET_SELECTED_MAP",
    SET_BOUYS: "SET_BOUYS",
    SET_LEGS: "SET_LEGS",
    SHIP_SELECTED: "SHIP_SELECTED",
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
  
export default {
    setMaps,
    setSelectedMap,
    setBouys,
    setLegs,
    shipSelected,
    Types
};
  