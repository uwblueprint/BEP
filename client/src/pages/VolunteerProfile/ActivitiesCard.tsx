import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
  },
});

export default function ActivitiesCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} direction="column"  >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>Activities</Typography>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Inside Schools</Typography>
              <Typography variant="body1">
                {props.internalActivities.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Outside Schools</Typography>
              <Typography variant="body1">
                {props.externalActivities.join(", ")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Areas Willing to Volunteer In</Typography>
              <Typography variant="body1">
                {props.locations.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Grades Willing to Volunteer With</Typography>
              <Typography variant="body1">
                Grades {props.grades.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}