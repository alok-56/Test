import { Store, legacy_createStore as createStore } from "redux";
import rootReducer from "./loginReducer/reducer";

const store: Store = createStore(rootReducer);
export default store;