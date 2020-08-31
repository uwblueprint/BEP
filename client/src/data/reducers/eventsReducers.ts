import {
  FETCH_ACTIVE_EVENTS,
  FETCH_EVENT_APPLICATIONS,
  FETCH_EVENT_INVITATIONS,
  FETCH_PAST_EVENTS,
  FETCH_VOLUNTEERS_OF_EVENT,
  UPDATE_EVENT,
  UPDATE_APPLICATION,
  CREATE_APPLICATION,
} from "../actions/actionTypes";
import { Event } from "../types/eventTypes";
import { UserType } from "../types/userTypes";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";
import { Volunteer } from "../types/userTypes";

export interface EventsState {
  activeList: Event[];
  // `applications` maps an event ID to an array of applications.
  applications: Map<string, Application[]>;
  invitations: Map<string, Invitation[]>;
  // Number of past events recieved from the backend. Since past events are filtered before
  // being assigned to `state.events.pastList`, the length of the `pastList` array will not
  // match `numPastEventsRecieved`.
  numPastEventsRecieved: number;
  pastList: Event[];
  // `volunteers` maps an event ID to an array of volunteers.
  volunteers: Map<string, Volunteer[]>;
}

const initialState: EventsState = { 
  activeList: [],
  applications: new Map<string, Application[]>(),
  numPastEventsRecieved: 0,
  pastList: [],
  invitations: new Map<string, Invitation[]>()
  volunteers: new Map<string, Volunteer[]>(),
};

export default function eventsFilter(
  state: EventsState = initialState,
  action: { type: string; payload: any; filter: any }
) {
  let newApplicationsMap = new Map<string, Application[]>();
  let newInvitationsMap = new Map<string, Invitation[]>();
  let newVolunteersMap = new Map<string, Volunteer[]>();

  const visibilityFilter =
    action.payload &&
    action.payload.userType &&
    action.payload.userId &&
    action.payload.userType === UserType.Educator
      ? (event: Event) => event.contact.id === action.payload.userId
      : (event: Event) => event.isPublic;

  switch (action.type) {
    case FETCH_ACTIVE_EVENTS:
      return {
        ...state,
        activeList: action.payload.list.filter(visibilityFilter),
      };
    case FETCH_PAST_EVENTS:
      return {
        ...state,
        pastList: state.pastList.concat(
          action.payload.list.filter(visibilityFilter)
        ),
        numPastEventsRecieved:
          state.numPastEventsRecieved + action.payload.list.length,
      };
    case UPDATE_EVENT:
      let foundEvent = false;
      return {
        ...state,
        activeList: state.activeList.map((event) => {
          if (event.id === action.payload.event.id) {
            foundEvent = true;
            return action.payload.event;
          }
          return event;
        }),
        pastList: foundEvent
          ? state.pastList
          : state.pastList.map((event) =>
              event.id === action.payload.event.id
                ? action.payload.event
                : event
            ),
      };
    case FETCH_EVENT_APPLICATIONS:
      newApplicationsMap = state.applications;
      newApplicationsMap.set(
        action.payload.event.id,
        action.payload.applications
      );
      return {
        ...state,
        applications: newApplicationsMap,
      };
    case FETCH_EVENT_INVITATIONS:
      newInvitationsMap = state.invitations;
      newInvitationsMap.set(
        action.payload.event.id,
        action.payload.invitations
      );
      return {
        ...state,
        invitations: newInvitationsMap
      }
    case UPDATE_APPLICATION:
      newApplicationsMap = state.applications;
      const applicationsArr = newApplicationsMap
        .get(action.payload.application.event.id)!
        .map((application: Application) =>
          application.id === action.payload.application.id
            ? action.payload.application
            : application
        );

      newApplicationsMap.set(
        action.payload.application.event.id,
        applicationsArr
      );
      return {
        ...state,
        applications: newApplicationsMap,
      };
    case CREATE_APPLICATION:
      newApplicationsMap = state.applications;
      newApplicationsMap.set(
        action.payload.application.event.id,
        newApplicationsMap
          .get(action.payload.application.event.id)!
          .concat(action.payload.application)
      );
      return {
        ...state,
        applications: newApplicationsMap,
      };
    case FETCH_VOLUNTEERS_OF_EVENT:
      newVolunteersMap = state.volunteers;
      newVolunteersMap.set(action.payload.event.id, action.payload.volunteers);
      return {
        ...state,
        volunteers: newVolunteersMap,
      };
    default:
      return state;
  }
}
