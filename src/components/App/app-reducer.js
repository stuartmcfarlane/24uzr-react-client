import {combineReducers} from "redux"
import overview from  "../Overview/overview-reducer"
import shipSelector from  "../ShipSelector/shipSelector-reducer"

export default combineReducers({
    overview,
    shipSelector,
})