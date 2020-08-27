import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
  },
});

export default function ExpertiseCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} direction="column"  >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>
              Knowledge and Expertise
            </Typography>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Areas of Expertise
              </Typography>
              <Typography variant="body1">
                {props.expertiseAreas.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Post Secondary Training
              </Typography>
              <Typography variant="body1">
                {props.postSecondaryTraining.join(", ")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Spoken Languages</Typography>
              <Typography variant="body1">
                {props.languages.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Additional Information
              </Typography>
              <Typography variant="body1">
                {props.extraDescription ? props.extraDescription : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}