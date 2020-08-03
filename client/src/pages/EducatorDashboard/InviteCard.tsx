import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import Button from '../../components/Button'
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

const InviteCard = (props: any) => {
    console.log(props)
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
        setOpen(false)
    }
    
    

    return (
    <Card className={classes.card}>
    <Grid container spacing={2}>
        <Grid item xs={9}>
            <Typography variant="h5" component="h2">
                {props.info.invite.invitationName}      
            </Typography>
            <Typography variant="subtitle1" component="h1">
                {props.info.invite.job} -- {props.info.invite.personalPronouns}
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Button onClick={handleClickOpen}>
            <Typography variant="body2" component="h5" className={classes.retract}>
                    Retract Invitations
            </Typography>
            </Button> 
            <Dialog aria-labelledby="simple-dialog-title" open={open} >
                    <Typography>Are you sure you want to retract your invitation to {props.info.invite.invitationName}</Typography>
                    <Typography>You cannot change your decision after this</Typography>
                    <Button onClick={handleClickClose}>Accept</Button>
                    <Button onClick={handleClickClose}>Decline</Button>
                </Dialog>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                SECTORS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.sectors}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                AREAS OF EXPERTISE
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.areasOfExpertise}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                LINKEDIN URL
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.linkedinUrl}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                EMPLOYMENT STATUS
            </Typography>
            <Typography variant="body1" component="h2">
                {props.info.invite.employmentStatus}
            </Typography>
        </Grid>
    </Grid>
    </Card>
    )
}

export default InviteCard