import { combineReducers } from "redux";
import events from "./eventsReducers";
import volunteers from "./volunteersReducers";
import picklists from "./picklistReducers";
import user from "./authReducers";
import schoolList from "./schoolListReducers";

export default combineReducers({
  volunteers,
  picklists,
  events,
  user,
  schoolList,
});
