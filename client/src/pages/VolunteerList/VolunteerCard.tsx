import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Volunteer } from "../../data/types/userTypes";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function VolunteerCard(props: any) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.firstName} {props.lastName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.jobTitle} at {props.employerName} — ({props.preferredPronouns})
        </Typography>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Typography>SECTORS</Typography>
            <Typography>
              {props.volunteerDesiredExternalActivities[0]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>AREAS OF EXPERTISE</Typography>
            <Typography>
              {props.expertiseAreas.reduce(
                (acc: string, area: string) => acc + area,
                ""
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>LINKEDIN URL</Typography>
            <Typography>{props.linkedIn}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>EMPLOYMENT STATUS</Typography>
            <Typography>{props.employmentStatus}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
