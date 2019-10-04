const Types = {
    SET_MAPS: "SET_MAPS",
    SET_SELECTED_MAP: "SET_SELECTED_MAP",
  };
  
  // actions
const setMaps = maps => {
    return {
        type: Types.SET_MAPS,
        payload: maps
    }
};
  
const setSelectedMap = map => {
    return {
        type: Types.SET_SELECTED_MAP,
        payload: map
    }
};
  
export default {
    setMaps,
    setSelectedMap,
    Types
};
  