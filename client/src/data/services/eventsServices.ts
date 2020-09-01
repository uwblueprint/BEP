import {
  getActiveEvents,
  getPastEvents,
  updateEvent,
} from "../../utils/eventsApiUtils";
import { getEventApplications } from "../../utils/applicationsApiUtils";
import { getEventInvitations } from "../../utils/invitationsApiUtils";
import { getVolunteersOfEvent } from "../../utils/eventVolunteersApiUtils";
import {
  fetchActiveEvents,
  fetchPastEvents,
  fetchEventApplications,
  fetchVolunteersOfEvent,
  fetchEventInvitations,
  updateEvent as updateEventAction,
} from "../actions/eventsActions";

import Application from "../types/applicationTypes";
import { Event } from "../types/eventTypes";
import EventVolunteer from "../types/eventVolunteerTypes";

export function fetchActiveEventsService(userType: number, userId: string) {
  return (dispatch: any) => {
    return getActiveEvents().then((res: any) => {
      dispatch(fetchActiveEvents(res.data, userType, userId));
      return res;
    });
  };
}

export function fetchPastEventsService(
  limit: number,
  offset: number,
  userType: number,
  userId: string
) {
  return (dispatch: any) => {
    return getPastEvents(limit, offset).then((res: any) => {
      dispatch(fetchPastEvents(res.data, userType, userId));
      return res;
    });
  };
}

export function updateEventService(event: Event) {
  return (dispatch: any) => {
    return updateEvent(event).then((res: any) => {
      dispatch(updateEventAction(event));
      return res;
    });
  };
}

export function fetchEventApplicationsService(event: Event) {
  return (dispatch: any) => {
    return getEventApplications(event.id).then((res: any) => {
      dispatch(
        fetchEventApplications(
          event,
          res.data.map((application: Application) => {
            application.event = event;
            return application;
          })
        )
      );
      return res;
    });
  };
}

export function fetchVolunteersOfEventService(event: Event) {
  return (dispatch: any) => {
    return getVolunteersOfEvent(event.id).then((res: any) => {
      dispatch(
        fetchVolunteersOfEvent(
          event,
          res.data.map(
            (eventVolunteer: EventVolunteer) => eventVolunteer.volunteer
          )
        )
      );
      return res;
    });
  };
}

export function fetchEventInvitationsService(event: Event) {
  return (dispatch: any) => {
    return getEventInvitations(event.id).then((res: any) => {
      dispatch(fetchEventInvitations(event, res.data));
      return res;
    });
  };
}
