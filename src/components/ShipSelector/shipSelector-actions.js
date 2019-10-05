import axios from 'axios'
import makeApiUrl from '../../utils/makeApiUrl';

const Types = {
    ON_MOUNTED: 'ON_MOUNTED',
    
    FETCH_SHIPS: 'FETCH_SHIPS',
    REQUEST_SHIPS: 'REQUEST_SHIPS',
    RECIEVED_SHIPS: 'RECIEVED_SHIPS',

  };
  
  // actions
const onMounted = _ => dispatch => {
    dispatch(fetchShips())
}

const fetchShips = _ => dispatch => {
    dispatch(requestShips())
    axios.get(makeApiUrl('ships'))
    .then( (res) => {
        const ships = [ ...res.data ]
        dispatch(recievedShips(ships))
    })
    .catch(console.error);
}
  
const requestShips = _ => ({
    type: Types.REQUEST_SHIPS,
});
  
const recievedShips = maps => ({
    type: Types.RECIEVED_SHIPS,
    payload: maps
});
  
 
export default {
    onMounted,
    fetchShips,
    requestShips,
    recievedShips,
    Types
};
  