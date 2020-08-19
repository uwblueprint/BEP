import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  TextButton,
  BlackExpandMoreIcon,
  SecondaryMainExpandMoreIcon,
  WhiteCloseIcon,
  PageHeader,
  PageBody,
  BlueSearchIcon,
  OutlinedCheckbox,
  WhiteTextTypography,
  BlackTextTypography,
  SecondaryMainTextTypography,
} from "../../components/index";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { OutlinedTextField } from "../../components/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class SignIn extends React.Component<{}, {password: string; email: string;}> {
  constructor(props:any) {
    super(props);

    const {
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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      this.setState({email: e.target.value});
    } else if (e.target.id === "password") {
      this.setState({password: e.target.value});
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(this.state);
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Card elevation={0}>
          <CardContent>

           <form
                style={{ width: "100%" }}
                onSubmit={this.handleSubmit}
              >
                <Typography variant="h6">
                  Login to get started
                </Typography>
                <Typography variant="body1">
                  Email
                </Typography>
                <Grid item container direction="row">
                  <OutlinedTextField
                    id="email"
                    placeholder="e.g. name@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"/>
                      ),
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>

                <Typography variant="body1">
                  Password
                </Typography>
                <Grid item container direction="row">
                  <OutlinedTextField
                    id="password"
                    type="password"
                    placeholder="e.g. name@email.com"
                    value={this.state.password}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"/>
                      ),
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>

                  <ContainedButton
                    type="submit"
                    style={{ width: "8%", marginLeft: "2%" }}
                  >
                    Login
                  </ContainedButton>
              </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SignIn;
