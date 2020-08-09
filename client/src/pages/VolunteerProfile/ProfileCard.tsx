import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//import { Volunteer } from "../../data/types/userTypes";

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
          Profile
        </Typography>

        <Grid container direction="row">
          <Grid item xs={4}>
            <Typography>EMPLOYMENT STATUS</Typography>
            <Typography>{props.employmentStatus}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>ORGANIZATION SECTOR</Typography>
            <Typography>
              {props.orgSector}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={4}>
            <Typography>AREAS OF EXPERTISE</Typography>
            <Typography>{props.expertiseAreas.join(", ")}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>POST SECONDARY TRAINING</Typography>
            <Typography>{props.postSecondaryTraining.join(", ")}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}