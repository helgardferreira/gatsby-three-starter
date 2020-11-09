import { combineReducers } from "redux"
import loaderReducer from "./loader.reducer"

export default combineReducers({ loader: loaderReducer })
