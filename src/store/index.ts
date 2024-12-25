import { legacy_createStore as createStore } from "redux";
import rootReducer from "./loginReducer/reducer";

function configureStore() {
  return createStore(rootReducer);
}

export default configureStore;
