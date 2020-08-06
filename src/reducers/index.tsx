import userId from "./userId";
import computers from "./computers";
import parameters from "./parameters";
import search from "./search";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userId,
  computers,
  parameters,
  search,
});

export default rootReducer;
