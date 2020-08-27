import React from "react";
import {Grid, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button, ContainedButton, PageBody} from "../../components/index";
import AboutCard from "./AboutCard";
import ExpertiseCard from "./ExpertiseCard";
import ActivitiesCard from "./ActivitiesCard";
import { Volunteer } from "../../data/types/userTypes";

class VolunteerProfile extends React.Component<
  {volunteer: Volunteer, backAction? : () => void}> {
  render() {
    return (
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}  style={{marginTop: "20px", padding: "0px 12%"}}>
          <Button color="primary" style={{fontSize: 14}}
            onClick={this.props.backAction}
          >
            <ArrowBackIosIcon/> Back
          </Button>
        </Grid>
        <Grid container direction="row" item xs={12}
          style={{marginTop: "10px", padding: "0px 12%"}}>
            <Typography variant="h1" style={{ marginLeft: "2%", fontWeight: "bold" }}>
              {this.props.volunteer.firstName}{" "}
              {this.props.volunteer.lastName}{" "}
              ({this.props.volunteer.preferredPronouns})
            </Typography>
            <div style={{flexGrow: 2}}/>
            <ContainedButton style={{ padding: "10px"}}>
              Request
            </ContainedButton>
        </Grid>
        <Grid item xs={12}>
          <PageBody>
            <div style={{paddingBottom: "30px", paddingTop: "30px"}}>
              <AboutCard
                description={this.props.volunteer.careerDescription}
                jobTitle={this.props.volunteer.jobTitle}
                employmentStatus={this.props.volunteer.phoneNumber}
                linkedIn={this.props.volunteer.linkedIn}
                phoneNumber={this.props.volunteer.phoneNumber}
                org={this.props.volunteer.employer}
              />
              <ExpertiseCard
                expertiseAreas={this.props.volunteer.expertiseAreas}
                postSecondaryTraining={this.props.volunteer.postSecondaryTraining}
                languages={this.props.volunteer.languages}
                extraDescription={this.props.volunteer.extraDescription}
              />
              <ActivitiesCard
                internalActivities={this.props.volunteer.volunteerDesiredInternalActivities}
                externalActivities={this.props.volunteer.volunteerDesiredExternalActivities}
                locations={this.props.volunteer.locations}
                grades={this.props.volunteer.grades}
              />
            </div>
          </PageBody>
        </Grid>
      </Grid>
    );
  }
}

export default VolunteerProfile;
