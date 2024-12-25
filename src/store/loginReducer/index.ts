import { combineReducers } from "redux";

import loginReducer from "./reducer";

const rootReducer=combineReducers({loginForm:loginReducer})
export default rootReducer