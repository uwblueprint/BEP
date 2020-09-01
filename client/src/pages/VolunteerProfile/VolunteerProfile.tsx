import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../data/selectors/userSelector";
import { getActiveEvents } from "../../data/selectors/eventsSelector";
import { getVolunteerApplications, getVolunteerInvitations } from "../../data/selectors/volunteersSelector";
import { fetchActiveEventsService } from "../../data/services/eventsServices";
import { fetchApplicationsByVolunteer } from "../../data/services/applicationsService";
import { 
  createInvitationService, fetchInvitationsByVolunteer
} from "../../data/services/invitationsService";

import { Link, RouteComponentProps } from "react-router-dom";
import {Card, CardActionArea, Grid, IconButton, Modal, Snackbar, SnackbarContent, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from "@material-ui/icons/Close";
import { ContainedButton, PageBody, TextButton } from "../../components/index";
import AboutCard from "./AboutCard";
import ExpertiseCard from "./ExpertiseCard";
import ActivitiesCard from "./ActivitiesCard";
import { Event } from "../../data/types/eventTypes";
import { User, Volunteer } from "../../data/types/userTypes";
import Invitation from "../../data/types/invitationTypes";
import Application from "../../data/types/applicationTypes";

class VolunteerProfile extends React.Component <
  RouteComponentProps<{}, {}, {volunteer: Volunteer, back: string}>
    & {
        userType: number;
        userId: string;
        activeOpportunities: Event[];
        fetchActiveEvents: any;
        createInvitation: any;
        fetchInvitations: any;
        fetchApplications: any;
        applications: Application[];
        invitations: Invitation[];
      },
  {
    openModal: boolean;
    openSnackbar: boolean;
    noRequestEvents: string[]
  }> {

  _isMounted = false;
  _invites = [];

  constructor(props : any) {
    super(props);
    this.state = {
      openModal: false,
      openSnackbar: false,
      noRequestEvents: []
    };
  }

  componentDidMount() {
    this.props.fetchActiveEvents(
      this.props.userType,
      this.props.userId
    );
/*
    this.props.fetchApplications(this.props.userId).then((apps : Application[]) => {
      console.log(apps);
      let appIds = apps.map((app : Application) => app.event.id);
      this.props.fetchInvitations(this.props.userId).then((invites : Invitation[]) => {
        console.log(invites);
        let inviteIds = invites.map((invite : Invitation) => invite.event.id);
        this.setState({noRequestEvents: inviteIds.concat(appIds)});
      });
    });
*/
  this.props.fetchApplications(this.props.userId)
  
  this.props.fetchInvitations(this.props.userId)

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let appIds = this.props.applications.map((app : Application) => app.event.id);
    let inviteIds = this.props.invitations.map((invite : Invitation) => invite.event.id);
    console.log(appIds);
    console.log(inviteIds);
    return (
      <div>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}  style={{ marginTop: "70px", padding: "0px 12%"}}>
            <Typography variant="body1" style={{paddingBottom: '10px'}}>
              {/*<Link to={this.props.location.state.back} style={{textDecoration: "none"}}>{`<`} Back </Link>*/}
              <a href="javascript:history.back()">{`<`} Back</a>
            </Typography>
          </Grid>
          <Grid container direction="row" item xs={12}
            style={{padding: "0px 12%"}}>
              <Typography variant="h1" style={{ marginLeft: "2%", fontWeight: "bold" }}>
                {this.props.location.state.volunteer.firstName}{" "}
                {this.props.location.state.volunteer.lastName}{" "}
                ({this.props.location.state.volunteer.preferredPronouns})
              </Typography>
              <div style={{flexGrow: 2}}/>
              <ContainedButton style={{ padding: "10px"}}
                onClick={()=> this.setState({openModal: true})}
              >
                Request
              </ContainedButton>
          </Grid>
          <Grid item xs={12}>
            <PageBody>
              <div style={{paddingBottom: "30px", paddingTop: "30px"}}>
                <AboutCard
                  description={this.props.location.state.volunteer.careerDescription}
                  jobTitle={this.props.location.state.volunteer.jobTitle}
                  employmentStatus={this.props.location.state.volunteer.phoneNumber}
                  linkedIn={this.props.location.state.volunteer.linkedIn}
                  phoneNumber={this.props.location.state.volunteer.phoneNumber}
                  org={this.props.location.state.volunteer.employer}
                />
                <ExpertiseCard
                  expertiseAreas={this.props.location.state.volunteer.expertiseAreas}
                  postSecondaryTraining={this.props.location.state.volunteer.postSecondaryTraining}
                  languages={this.props.location.state.volunteer.languages}
                  extraDescription={this.props.location.state.volunteer.extraDescription}
                />
                <ActivitiesCard
                  internalActivities={this.props.location.state.volunteer.volunteerDesiredInternalActivities}
                  externalActivities={this.props.location.state.volunteer.volunteerDesiredExternalActivities}
                  locations={this.props.location.state.volunteer.locations}
                  grades={this.props.location.state.volunteer.grades}
                />
              </div>
            </PageBody>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.openSnackbar}
          onClose={()=>this.setState({openSnackbar: false})}
        >
          <SnackbarContent
            message={`You have requested ${this.props.location.state.volunteer.firstName}
            ${this.props.location.state.volunteer.lastName} for this event.`}
            action={
              <IconButton onClick={()=>this.setState({openSnackbar: false})}>
                <CloseIcon style={{color: "white"}}/>
              </IconButton>
            }
          />
        </Snackbar>
        <Modal
          open={this.state.openModal}
          onClose={() => this.setState({openModal: false})}
          style={{ left: "20%", top: "30%"}}
        >
          <Card style={{width: "60%"}}>
            <Grid container direction="column" style={{padding: "20px"}}>
              <Grid container item xs={12} direction="row">
                <Typography variant="h2">
                  Request {this.props.location.state.volunteer.firstName}
                  {" "}{this.props.location.state.volunteer.lastName} For...
                </Typography>
                <div style={{flexGrow: 2}}/>
                <IconButton onClick={()=>this.setState({openModal: false})}>
                  <CloseIcon style={{color: "black"}}/>
                </IconButton>
              </Grid>
              {
                this.props.activeOpportunities.map((event) => 
                  <Grid item xs={12} key={event.id}>
                    <Card square style={{ padding: "10px" }}>
                      <CardActionArea
                        onClick={()=>{
                          this.setState({openModal: false, openSnackbar: true});
                        }}
                      >
                        <Typography variant="body1">{event.eventName}</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              }
            </Grid>
          </Card>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  const userObj = localStorage.getItem("user");
  const user = userObj ? JSON.parse(userObj) : userObj;
  return {
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
    activeOpportunities: getActiveEvents(state.events),
    applications: getVolunteerApplications(state.volunteers),
    invites: getVolunteerInvitations(state.volunteers),
  };
};

const mapDispatchToProps = (dispatch : any) => ({
  fetchActiveEvents: (userType: number, userId: string) =>
    dispatch(fetchActiveEventsService(userType, userId)),
  fetchApplications: (id: string) =>
    dispatch(fetchApplicationsByVolunteer(id)),
  fetchInvitations: (id: string) =>
    dispatch(fetchInvitationsByVolunteer(id)),
  createInvitation: (invitationEvent: Event, invitedVolunteer: Volunteer) =>
    dispatch(createInvitationService({
      event: invitationEvent,
      id: "",
      status: "pending",
      volunteer: invitedVolunteer
    })),
});

export default connect(mapStateToProps, mapDispatchToProps) (VolunteerProfile);
