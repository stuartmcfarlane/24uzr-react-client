const Types = {
    SET_MAPS: "SET_MAPS",
    SET_SELECTED_MAP: "SET_SELECTED_MAP",
    SET_BOUYS: "SET_BOUYS",
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
  
export default {
    setMaps,
    setSelectedMap,
    setBouys,
    Types
};
  