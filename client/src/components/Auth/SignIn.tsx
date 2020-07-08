import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

class SignIn extends React.Component {
  constructor(props:any) {
    super(props);

    const {
      classes,
      history,
      user
    } = props;

    if (user) {
        // whatever the redirect route is supposed to be
        history.push('/');
    }

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = () => {
  }

  handleSubmit = () => {
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <Typography
            component="h1"
            variant="h5"
            align="left"
          >
            Login to get started.
          </Typography>
          <label>Email</label>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
            <label>Password</label>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            LOGIN
          </Button>
          <Link href="#" variant="body2">
            Don't have an account? Sign up.
          </Link>
        </form>
      </div>
    );
  }
}

export default SignIn;
