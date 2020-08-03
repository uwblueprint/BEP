import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '../../../components/Button'
import { findAllByTestId } from '@testing-library/react';

export interface DialogProps {
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    retract: {
        color: 	"#FF0000",
        fontWeight: "bold",
        textDecoration: 'none'
    },
    card: {
        maxWidth: 800,
        margin: `${theme.spacing(4)}px auto`,
        padding: theme.spacing(4),
        borderRadius: 10
    }
}));

const ApplicantCard = (props: any) => {
    console.log(props)
    const classes = useStyles()
    const [acceptOpen, setAcceptOpen] = React.useState(false);
    const [denyOpen, setDenyOpen] = React.useState(false);

    const handleClickOpenAccept = () => {
        setAcceptOpen(true)
    }

    const handleClickCloseAccept = () => {
        setAcceptOpen(false)
    }
    
    const handleClickOpenDeny = () => {
        setDenyOpen(true)
    }

    const handleClickCloseDeny = () => {
        setDenyOpen(false)
    }

    return (
    <Card className={classes.card}>
    <Grid container spacing={2}>
        <Grid item xs={9}>
            <Typography variant="h5" component="h2">
                {props.info.applicant.applicantName}      
            </Typography>
            <Typography variant="subtitle1" component="h1">
                {props.info.applicant.job} -- {props.info.applicant.personalPronouns}
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Grid container spacing={10}>
            <Grid item xs={1}>
                <Button onClick={handleClickOpenDeny}>
                    Decline
                </Button>
                <Dialog aria-labelledby="simple-dialog-title" open={denyOpen} >
                    <Typography>Are you sure you want to decline {props.info.applicant.applicantName} for this event?</Typography>
                    <Typography>You cannot change your decision after this</Typography>
                    <Button onClick={handleClickCloseAccept}>Accept</Button>
                    <Button onClick={handleClickCloseDeny}>Decline</Button>
                </Dialog>
            </Grid>
             <Grid item xs={5}>
                <Button onClick={handleClickOpenAccept}>
                    Accept
                </Button>
                <Dialog aria-labelledby="simple-dialog-title" open={acceptOpen}>
                    <Typography>Are you sure you want to accept {props.info.applicant.applicantName} for this event?</Typography>
                    <Typography>You cannot change your decision after this</Typography>
                    <Button onClick={handleClickCloseAccept}>Accept</Button>
                    <Button onClick={handleClickCloseDeny}>Decline</Button>
                </Dialog>
             </Grid>
             </Grid>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                SECTORS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.applicant.sectors}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                AREAS OF EXPERTISE
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.applicant.areasOfExpertise}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                LINKEDIN URL
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.applicant.linkedinUrl}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                EMPLOYMENT STATUS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.applicant.employmentStatus}
            </Typography>
        </Grid>
    </Grid>
    </Card>
    )
}

export default ApplicantCard