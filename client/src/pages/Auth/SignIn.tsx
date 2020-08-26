import React from 'react';
import { connect } from "react-redux";

import {
  ContainedButton,
  PageBody,
  WhiteTextTypography,
  SecondaryMainTextTypography,
  GreyBackgroundTextTypography,
  Link
} from "../../components/index";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { OutlinedTextField } from "../../components/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

/* Services */
import { loginService } from "../../data/services/authServices";

/* Selectors */
import { getUser } from "../../data/selectors/userSelector";

/* Type */
import { User } from "../../data/types/userTypes";

const mapStateToProps = (state: any): any => ({
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) =>
    dispatch(loginService(email, password)),
});

class SignIn extends React.Component<
    { login: any, user: User, history: any }, 
    { password: string; email: string; }
  > {
  constructor(props:any) {
    super(props);

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

      const { user, history } = this.props;
      if (user) {
        // todo: if educator, redirect to x; if volunteer, redirect to y
        history.push("/volunteers");
      }
      this.setState({ email: "", password: "" });
    }
  }

  render() {
    return (
      <PageBody>
        <div style={{ height: "100vh" }}>
          <Grid container alignItems="center" justify="center">
            
            <Grid item xs={5} style={{background: "#07598C", height:"70vh", marginTop:"10vh", padding:"5%", marginRight:"1%", borderRadius:"1%"}}>
              <WhiteTextTypography variant="h5" style={{margin:"5% 0"}}>Preparing youth for the future of work</WhiteTextTypography>
              <WhiteTextTypography variant="body2" style={{fontSize:"0.9em", marginBottom:"5%"}}>It takes a village to raise a child. We're bringing Waterloo Region together to help our kids:</WhiteTextTypography>
              <GreyBackgroundTextTypography>better understand the world of work</GreyBackgroundTextTypography>
              <GreyBackgroundTextTypography>find a sense of purpose</GreyBackgroundTextTypography>
              <GreyBackgroundTextTypography>connect with a rewarding career</GreyBackgroundTextTypography>
            </Grid>
            
            <Grid item xs={5} style={{background:"white", height:"70vh", marginTop:"10vh", padding:"5%", borderRadius:"1%"}}>
              <form
                style={{ width: "100%" }}
                onSubmit={this.handleSubmit}
              >
                <Typography variant="h6">
                  Login to get started
                </Typography>
                <Typography variant="body1" style={{margin: "10% 0 1% 0"}}>
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

                <Typography variant="body1" style={{margin: "3% 0 1% 0"}}>
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
                <Link target="_blank" href="/">
                  <SecondaryMainTextTypography style={{fontSize:"0.9em", marginTop:"2%"}}>
                    Forgot Password?
                  </SecondaryMainTextTypography>
                </Link>

                <Grid container direction="column" alignItems="center" justify="center">
                  <ContainedButton
                    type="submit"
                    style={{ width: "50%", margin:"30px 0 10px 0"}}
                  >
                    Login
                  </ContainedButton>
                  <Link target="_blank" href="/">
                    <SecondaryMainTextTypography style={{fontSize:"0.9em"}}>
                      Don't Have An Account? Sign Up
                    </SecondaryMainTextTypography>
                  </Link>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </PageBody>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
