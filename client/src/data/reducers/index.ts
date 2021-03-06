import { combineReducers } from "redux";
import events from "./eventsReducers";
import volunteers from "./volunteersReducers";
import picklists from "./picklistReducers";
import user from "./authReducers";
import schoolList from "./schoolListReducers";
import eventPicklists from "./eventPicklistReducers";
import employers from "./employerReducer";

export default combineReducers({
  volunteers,
  picklists,
  events,
  user,
  schoolList,
  eventPicklists,
  employers,
});
