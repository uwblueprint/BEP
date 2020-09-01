import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../data/selectors/userSelector";
import { getActiveEvents } from "../../data/selectors/eventsSelector";
import { fetchActiveEventsService } from "../../data/services/eventsServices";

import { Link, RouteComponentProps } from "react-router-dom";
import {Card, Grid, IconButton, Modal, Snackbar, SnackbarContent, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from "@material-ui/icons/Close";
import { ContainedButton, PageBody, TextButton } from "../../components/index";
import AboutCard from "./AboutCard";
import ExpertiseCard from "./ExpertiseCard";
import ActivitiesCard from "./ActivitiesCard";
import { User, Volunteer } from "../../data/types/userTypes";
import { Event } from "../../data/types/eventTypes";

class VolunteerProfile extends React.Component <
  RouteComponentProps<{}, {}, {volunteer: Volunteer, back: string}>
    & {
        userType: number;
        userId: string;
        activeOpportunities: Event[];
        fetchActiveEvents: any;
      },
  {
    openModal: boolean;
    openSnackbar: boolean
  }> {

  _isMounted = false;

  constructor(props : any) {
    super(props);
    this.state = {
      openModal: false,
      openSnackbar: true
    };
  }

  componentDidMount() {
    this.props.fetchActiveEvents(
      this.props.userType,
      this.props.userId
    );

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.props.activeOpportunities)
    return (
      <div>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}  style={{ marginTop: "70px", padding: "0px 12%"}}>
            <Typography variant="body1" style={{paddingBottom: '10px'}}>
              <Link to={this.props.location.state.back} style={{textDecoration: "none"}}>{`<`} Back </Link>
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
                  <Grid item xs={12}>
                    <Card square style={{ padding: "10px" }}>
                      <Typography variant="body1">{event.eventName}</Typography>
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
  const user: User | null = getUser(state.user);
  return {
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
    activeOpportunities: getActiveEvents(state.events),
  };
};

const mapDispatchToProps = (dispatch : any) => ({
  fetchActiveEvents: (userType: number, userId: string) =>
  dispatch(fetchActiveEventsService(userType, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps) (VolunteerProfile);
