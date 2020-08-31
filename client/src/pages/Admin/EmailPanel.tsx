import React from "react";
import { connect } from "react-redux";

import {
  ContainedButton,
  Button,
  PageBody,
  BlackTextTypography,
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
    { subject: string; email: string; failed: boolean; }
  > {
  constructor(props:any) {
    super(props);

    this.state = {
      email: '',
      subject: '',
      failed: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    this.setState({ ...this.state, [id]: value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { email, subject } = this.state;
    const { login } = this.props;

    if (email && subject) {
      const data = await login(email, subject);

      this.setState({ ...this.state })
    }
  };

  render() {
    return (
      <PageBody>
        <div style={{ height: "97vh" }}>
          <Grid container alignItems="center" justify="center" style={{ paddingTop: "15vh" }}>
            <Grid item xs={10}>
              <BlackTextTypography variant="h1">Edit Email Content</BlackTextTypography>
            </Grid>
            <Grid item xs={10} style={{background:"white", height:"60vh", padding:"5%", marginTop: "5vh", borderRadius:"1%"}}>
              <form
                style={{ width: "100%" }}
                onSubmit={this.handleSubmit}
              >
                <Typography variant="body1" style={{margin: "1% 0"}}>
                  Email Type
                </Typography>
                <Grid item container direction="row">
                  <OutlinedTextField
                    id="email"
                    placeholder="this should be a dropdown"
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
                  Subject
                </Typography>
                <Grid item container direction="row">
                  <OutlinedTextField
                    id="subject"
                    placeholder="Enter email subject line"
                    value={this.state.subject}
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
                  Subject
                </Typography>
                <Grid item container direction="row">
                  <OutlinedTextField
                    id="subject"
                    placeholder="Enter email subject line"
                    value={this.state.subject}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                    inputProps={{ style: { height: "40px", padding: "0" } }}
                    style={{ width: "90%" }}
                  />
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Button style={{ width: "15%", margin: "50px 0 10px 0" }}>Discard</Button>
                  <ContainedButton
                    type="submit"
                    style={{ width: "15%", margin: "50px 0 10px 10%" }}
                  >
                    Save
                  </ContainedButton>
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
