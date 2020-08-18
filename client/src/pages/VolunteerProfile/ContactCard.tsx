import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, SecondaryMainTextTypography } from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  }
});

export default function VolunteerCard(props: any) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>Contact Information</Typography>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">LinkedIn URL</Typography>
              {
                props.linkedIn ?
                <Link target="_blank" href={props.linkedIn}>
                  <SecondaryMainTextTypography variant = "body1">
                    {props.linkedIn.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
                  </SecondaryMainTextTypography>
                </Link>
                :
                <Typography variant="body1">N/A</Typography>
              }
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Email</Typography>
              <Link target="_blank" href={"mailto:".concat(props.email)}>
                <SecondaryMainTextTypography>
                  {props.email}
                </SecondaryMainTextTypography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}