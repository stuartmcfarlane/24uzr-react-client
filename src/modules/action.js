const Types = {
    SET_MAPS: "SET_MAPS"
  };
  
  // actions
const setMaps = maps => {
    return {
        type: Types.SET_MAPS,
        payload: maps
    }
};
  
export default {
    setMaps,
    Types
};
  