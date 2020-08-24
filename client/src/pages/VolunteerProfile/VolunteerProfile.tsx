import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ContainedButton, PageBody} from "../../components/index";
import AboutCard from "./AboutCard";
import ExpertiseCard from "./ExpertiseCard";
import ActivitiesCard from "./ActivitiesCard";
import { Volunteer } from "../../data/types/userTypes";

class VolunteerProfile extends React.Component<{volunteer: Volunteer}> {
  render() {
    return (
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h1" style={{ fontWeight: "bold" }}>
              {this.props.volunteer.firstName}{" "}
              {this.props.volunteer.lastName}{" "}
              ({this.props.volunteer.preferredPronouns})
            </Typography>
            <div style={{ flexGrow: 2 }} />
            <ContainedButton>Request</ContainedButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <PageBody>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <AboutCard
                  jobTitle={this.props.volunteer.jobTitle}
                  employmentStatus={this.props.volunteer.phoneNumber}
                  linkedIn={this.props.volunteer.linkedIn}
                  phoneNumber={this.props.volunteer.phoneNumber}
                  description={this.props.volunteer.careerDescription}
                  org={this.props.volunteer.employer}
                />
              </Grid>
              <Grid item xs={12}>
                <ExpertiseCard
                  expertiseAreas={this.props.volunteer.expertiseAreas}
                  postSecondaryTraining={this.props.volunteer.postSecondaryTraining}
                  languages={this.props.volunteer.languages}
                  extraDescription={this.props.volunteer.extraDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <ActivitiesCard
                  internalActivities={this.props.volunteer.volunteerDesiredInternalActivities}
                  externalActivities={this.props.volunteer.volunteerDesiredExternalActivities}
                  locations={this.props.volunteer.locations}
                  grades={this.props.volunteer.grades}
                />
              </Grid>
            </Grid>
          </PageBody>
        </Grid>
      </Grid>
    );
  }
}

export default VolunteerProfile;
