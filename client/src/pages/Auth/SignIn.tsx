import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';

import {
  ContainedButton,
  PageBody,
  WhiteTextTypography,
  SecondaryMainTextTypography,
  GreyBackgroundTextTypography,
  RedTextTypography,
  Link
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

class SignIn extends React.Component<
    { login: any; history: any; location: any }, 
    { password: string; email: string; failed: boolean; redirect: boolean; }
  > {
  constructor(props:any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      failed: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ ...this.state, redirect: true });
    }
  }
  
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    this.setState({ ...this.state, [id]: value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { email, password } = this.state;
    const { login } = this.props;

    if (email && password) {
      const data = await login(email, password);

      if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", data.user.userType);
        window.location.reload();
      } else {
        this.setState({ ...this.state, failed: true })
      }
    }
  };

  render() {
    const { failed, redirect } = this.state;
    if (redirect) {
      // todo: redirect based on userType
      return <Redirect to="/dashboard" />
    }

    return (
      <PageBody>
        <div style={{ height: "92vh" }}>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              xs={5}
              style={{
                background: "#07598C",
                height: "70vh",
                marginTop: "10vh",
                padding: "5%",
                marginRight: "1%",
                borderRadius: "1%",
              }}
            >
              <WhiteTextTypography variant="h5" style={{ margin: "5% 0" }}>
                Preparing youth for the future of work
              </WhiteTextTypography>
              <WhiteTextTypography
                variant="body2"
                style={{ fontSize: "0.9em", marginBottom: "7%" }}
              >
                It takes a village to raise a child. We're bringing Waterloo
                Region together to help our kids:
              </WhiteTextTypography>
              <GreyBackgroundTextTypography
                style={{
                  borderRadius: "2%",
                  margin: "5% 0",
                  padding: "1% 3%",
                  width: "fit-content",
                  textTransform: "uppercase",
                  fontSize: "0.7em",
                }}
              >
                better understand the world of work
              </GreyBackgroundTextTypography>
              <GreyBackgroundTextTypography
                style={{
                  borderRadius: "2%",
                  margin: "5% 0",
                  padding: "1% 3%",
                  width: "fit-content",
                  textTransform: "uppercase",
                  fontSize: "0.7em",
                }}
              >
                find a sense of purpose
              </GreyBackgroundTextTypography>
              <GreyBackgroundTextTypography
                style={{
                  borderRadius: "2%",
                  margin: "5% 0",
                  padding: "1% 3%",
                  width: "fit-content",
                  textTransform: "uppercase",
                  fontSize: "0.7em",
                }}
              >
                connect with a rewarding career
              </GreyBackgroundTextTypography>
            </Grid>
            
            <Grid item xs={5} style={{background:"white", height:"70vh", marginTop:"10vh", padding:"5%", borderRadius:"1%"}}>
              <form
                style={{ width: "100%" }}
                onSubmit={this.handleSubmit}
              >
                <Typography variant="h6" style={{marginBottom: "4%"}}>
                  Login to get started
                </Typography>
                <Grid style={{height:"30px", width: "100%"}}>
                { failed ? <RedTextTypography style={{fontSize: "0.85em"}}>Incorrect email or password. Please try again.</RedTextTypography> : null }
                </Grid>
                <Typography variant="body1" style={{margin: "1% 0"}}>
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
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>

                <Typography variant="body1" style={{ margin: "3% 0 1% 0" }}>
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
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>
                <Link target="_blank" href="/">
                  <SecondaryMainTextTypography
                    style={{ fontSize: "0.9em", marginTop: "2%" }}
                  >
                    Forgot Password?
                  </SecondaryMainTextTypography>
                </Link>

                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <ContainedButton
                    type="submit"
                    style={{ width: "50%", margin: "30px 0 10px 0" }}
                  >
                    Login
                  </ContainedButton>
                  <Link target="_blank" href="/">
                    <SecondaryMainTextTypography style={{ fontSize: "0.9em" }}>
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

export default connect(null, mapDispatchToProps)(SignIn);
