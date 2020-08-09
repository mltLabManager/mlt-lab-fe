import userId from "./userId";
import computers from "./computers";
import search from "./search";
import systemData from "./systemData";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userId,
  computers,
  search,
  systemData,
});

export default rootReducer;
