import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import {Card, Grid, IconButton, Modal, Snackbar, SnackbarContent, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from "@material-ui/icons/Close";
import { ContainedButton, PageBody} from "../../components/index";
import AboutCard from "./AboutCard";
import ExpertiseCard from "./ExpertiseCard";
import ActivitiesCard from "./ActivitiesCard";
import { Volunteer } from "../../data/types/userTypes";

class VolunteerProfile extends React.Component <
  RouteComponentProps<{}, {}, {volunteer: Volunteer, back: string}>,
  {openModal: boolean, openSnackbar: boolean}> {
  constructor(props : any) {
    super(props);
    this.state = {
      openModal: false,
      openSnackbar: true
    };
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}  style={{marginTop: "20px", padding: "0px 12%"}}>
            <Typography variant="body1" style={{paddingBottom: '10px'}}>
              <Link to={this.props.location.state.back} style={{textDecoration: "none"}}>{`<`} Back </Link>
            </Typography>
          </Grid>
          <Grid container direction="row" item xs={12}
            style={{marginTop: "10px", padding: "0px 12%"}}>
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
        >
          <Card>
            some stuff
          </Card>
        </Modal>
      </div>
    );
  }
}

export default VolunteerProfile;
