import {combineReducers} from 'redux'
import imageReducer from "./imageReducer";
import networkReducer from "./networkReducer";



const rootReducer = combineReducers({
  imageReducer,
  networkReducer,
})

export default rootReducer;
