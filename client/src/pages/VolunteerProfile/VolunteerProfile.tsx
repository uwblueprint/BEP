import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProfileCard from "./ProfileCard"
import ContactCard from "./ContactCard"
import './Profile.css'


class VolunteerProfile extends React.Component<
{
    email: string,
    firstName: string,
    lastName: string,
    employmentStatus: string,
    jobTitle: string,
    linkedIn: string,
    expertiseAreas: string[],
    sectors: string[],
    postSecondaryTraining: string[],
    employer?: string,
    description?: string
}
> {
    render() {
        return(
            <div>
                <Grid container direction = "row">
        <Typography className='profile-name'>{this.props.firstName} {this.props.lastName}</Typography>
                </Grid>
                <Grid>
                <Typography className='profile-title'>{this.props.jobTitle} {this.props.employer ? `at ${this.props.employer}` : ""}</Typography>
                </Grid>
                <Grid>
                <Typography className='profile-description'> {this.props.description} </Typography>
                </Grid>
                <ProfileCard
                    employmentStatus = {this.props.employmentStatus}
                    orgSector = "Information and Communication Technology"
                    expertiseAreas = {this.props.expertiseAreas}
                    postSecondaryTraining = {this.props.postSecondaryTraining}
                />
                <ContactCard
                    linkedIn = {this.props.linkedIn}
                    email = {this.props.email}
                />
            </div>
        );
    }
}

export default VolunteerProfile;