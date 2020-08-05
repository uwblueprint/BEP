import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'


const useStyles = makeStyles((theme) => ({
    retract: {
        textDecoration: 'none'
    },
    card: {
        maxWidth: 700,
        // margin: `${theme.spacing(4)}px auto`,
        padding: theme.spacing(1),
        borderRadius: 10
    },
    root: {
        paddingLeft: '25px'
    }
}));

const ConfirmedVolunteerCard = (props: any) => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <Typography variant="h4" classes={{
                root: classes.retract,
            }}>props.volunteer.name</Typography>
            <Typography variant="body1">props.volunteer.job at props.volunteer.company -- (props.volunteer.personalpronouns)</Typography>
        </Card>
    )

}

export default ConfirmedVolunteerCard