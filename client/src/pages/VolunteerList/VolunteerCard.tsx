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

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12}>
            <Typography variant="h2">
              {props.firstName} {props.lastName}
            </Typography>
            <Typography variant="body2" style={{ opacity: 0.8 }}>
              {props.jobTitle}{" "}
              {props.employer ? `at ${props.employer.name}` : ""} — (
              {props.preferredPronouns})
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1">Sectors</Typography>
            <Typography variant="body1">
              {props.employer ? props.employer.sectors.join(", ") : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Areas of Expertise</Typography>
            <Typography variant="body1">
              {props.expertiseAreas.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">LinkedIn URL</Typography>
            {props.linkedIn && (
              <Link target="_blank" href={props.linkedIn}>
                <SecondaryMainTextTypography variant="body1">
                  {
                    props.linkedIn
                      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                      .split("/")[0] // Remove protocol and 'www'
                  }
                </SecondaryMainTextTypography>
              </Link>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Employment Status</Typography>
            <Typography variant="body1">{props.employmentStatus}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
