import userId from "./userId";
import computers from "./computers";
import search from "./search";
import systemData from "./systemData";
import parameterData from './parametersData';
import delivery from "./delivery";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userId,
  computers,
  search,
  systemData,
  parameterData,
  delivery
});

export default rootReducer;
