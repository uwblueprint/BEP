import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ContainedButton} from "../../components/index";
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
          <Typography variant="h6">
            {this.props.jobTitle}{" "}
            {this.props.employer ? `at ${this.props.employer}` : ""}
          </Typography>
          {this.props.description && (
            <Typography variant="body1">{this.props.description}</Typography>
          )}
        </Grid>
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
    );
  }
}

export default VolunteerProfile;
