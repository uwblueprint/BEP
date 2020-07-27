import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import Button from '../Button'

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

const ContactCard = (props: any) => {
    console.log(props.props)
    const classes = useStyles()
   
    return (
    <Card className={classes.card}>
    <Grid container spacing={2}>
        <Grid item xs={9}>
            <Typography variant="h5" component="h2">
                props.user.name           
            </Typography>
            <Typography variant="subtitle1" component="h1">
                props.user.job -- props.user.pronouns       
            </Typography>
        </Grid>
        <Grid item xs={3}>
            {props.props.type == "invitations" ? 
            <Typography variant="body1" component="h2" className={classes.retract}>
                    Retract Invitations
            </Typography> :
            <Grid container spacing={10}>
            <Grid item xs={1}>
                <Button>
                    Decline
                </Button>
            </Grid>
             <Grid item xs={5}>
                <Button>
                    Accept
                </Button>
             </Grid>
             </Grid>}
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                SECTORS
            </Typography>
            <Typography variant="body1" component="h2">
                props.user.sectors
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                AREAS OF EXPERTISE
            </Typography>
            <Typography variant="body1" component="h2">
                props.user.areasofexpertise
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                LINKEDIN URL
            </Typography>
            <Typography variant="body1" component="h2">
                props.user.linkedinurl
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                EMPLOYMENT STATUS
            </Typography>
            <Typography variant="body1" component="h2">
                props.user.employmentstatus
            </Typography>
        </Grid>


    </Grid>
    </Card>
    )
}

export default ContactCard