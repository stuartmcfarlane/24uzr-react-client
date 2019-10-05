import {combineReducers} from "redux"
import overview from  "../components/Overview/overview-reducer"
import shipSelector from  "../components/ShipSelector/shipSelector-reducer"

export default combineReducers({
    overview,
    shipSelector,
})