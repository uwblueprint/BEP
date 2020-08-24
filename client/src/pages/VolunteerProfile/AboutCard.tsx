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

export default function AboutCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} direction="column"  >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>About</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description of Career</Typography>
            <Typography variant="body1">{props.description ? props.description : "N/A"}</Typography>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Current Job</Typography>
              <Typography variant="body1">
                  {props.jobTitle}
                  {props.org ? `  at ${props.org.name}` : ""}
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Employment Status</Typography>
              <Typography variant="body1">{props.employmentStatus}</Typography>
            </Grid>
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
              <Typography variant="subtitle1">Phone Number</Typography>
              <Typography variant="body1">
                {props.phoneNumber ? props.phoneNumber : "N/A"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Organization Sector</Typography>
              <Typography variant="body1">
                {props.org ? props.org.sectors.join(", ") : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Organization Website</Typography>
              <Typography variant="body1">
                {
                  props.org  && props.org.website ? 
                  <Link target="_blank" href={props.org.website}>
                    <SecondaryMainTextTypography variant = "body1">
                      {props.org.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
                    </SecondaryMainTextTypography>
                  </Link>
                  :
                  <Typography variant="body1">N/A</Typography> 
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Organization Address</Typography>
            <Typography variant="body1">
              {props.org && props.org.address ? props.org.address : "N/A"}
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Organization Phone Number</Typography>
              <Typography variant="body1">
                {props.org && props.org.phoneNumber ? props.org.phoneNumber : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}