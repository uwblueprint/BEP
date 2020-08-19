import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ContainedButton, PageBody } from "../../components/index";
import ProfileCard from "./ProfileCard";
import ContactCard from "./ContactCard";

class VolunteerProfile extends React.Component<{
  email: string;
  firstName: string;
  lastName: string;
  employmentStatus: string;
  jobTitle: string;
  expertiseAreas: string[];
  postSecondaryTraining: string[];
  linkedIn?: string;
  employer?: string;
  sectors?: string[];
  description?: string;
}> {
  render() {
    return (
      <PageBody>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h1" style={{ fontWeight: "bold" }}>
                {this.props.firstName} {this.props.lastName}
              </Typography>
              <div style={{ flexGrow: 2 }} />
              <ContainedButton>Request</ContainedButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {this.props.jobTitle}{" "}
              {this.props.employer ? `at ${this.props.employer}` : ""}
            </Typography>
          </Grid>
          {this.props.description && (
            <Grid item xs={10}>
              <Typography variant="body1">{this.props.description}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <ProfileCard
              employmentStatus={this.props.employmentStatus}
              sectors={this.props.sectors}
              expertiseAreas={this.props.expertiseAreas}
              postSecondaryTraining={this.props.postSecondaryTraining}
            />
          </Grid>
          <Grid item xs={12}>
            <ContactCard
              linkedIn={this.props.linkedIn}
              email={this.props.email}
            />
          </Grid>
        </Grid>
      </PageBody>
    );
  }
}

export default VolunteerProfile;
