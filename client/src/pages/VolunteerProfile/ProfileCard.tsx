import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  },
});

export default function VolunteerCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} direction="column"  >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>Profile</Typography>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Employment Status</Typography>
              <Typography variant="body1">{props.employmentStatus}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Organization Sector</Typography>
              <Typography variant="body1">{props.sectors ? props.sectors.join(", ") : "N/A"}</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Areas of Expertise</Typography>
              <Typography variant="body1">{props.expertiseAreas.join(", ")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Post Secondary Training</Typography>
              <Typography variant="body1">{props.postSecondaryTraining.join(", ")}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}