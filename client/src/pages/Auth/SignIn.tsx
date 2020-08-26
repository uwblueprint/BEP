import React from 'react';
import { connect } from "react-redux";

import {
  ContainedButton,
  PageBody,
  WhiteTextTypography,
} from "../../components/index";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { OutlinedTextField } from "../../components/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

/* Services */
import { loginService } from "../../data/services/authServices";

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) =>
    dispatch(loginService(email, password)),
});

class SignIn extends React.Component<{ login: any }, { password: string; email: string; }> {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      this.setState({email: e.target.value});
    } else if (e.target.id === "password") {
      this.setState({password: e.target.value});
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;

    if (email && password) {
      await login(email, password);
      // select and redirect if true
      this.setState({ email: "", password: "" });
    }
  }

  render() {
    return (
      <PageBody>
        <div style={{ height: "100vh" }}>
          <Grid container style={{height: "60vh"}}>
            
            <Grid item xs={4} style={{background: "#07598C", padding:"0 30px"}}>
              <WhiteTextTypography variant="h5">Preparing youth for the future of work</WhiteTextTypography>
              <WhiteTextTypography>It takes a village to raise a child. We're bringing Waterloo Region together to help our kids:</WhiteTextTypography>
              <Typography>better understand the world of work</Typography>
              <Typography>find a sense of purpose</Typography>
              <Typography>connect with a rewarding career</Typography>
            </Grid>
            
            <Grid item xs={4} style={{background:"white"}}>
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
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"/>
                      ),
                      required: true
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
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"/>
                      ),
                      required: true
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>

                  <ContainedButton
                    type="submit"
                    style={{ width: "8%"}}
                  >
                    Login
                  </ContainedButton>
              </form>
            </Grid>
          </Grid>
        </div>
      </PageBody>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
