import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteProps,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/styling/Theme";
import "./App.css";
import EducatorDashboard from "../pages/EducatorDashboard/EducatorDashboard";
import EventPage from "../pages/EducatorDashboard/IndividualOpportunity/EventPage";
import Login from "../pages/Auth/SignIn";
import TestSection from "../pages/Requests/TestSection";
import VolunteerList from "../pages/VolunteerList/VolunteerList";
import VolunteerRegistration from "../pages/Auth/VolunteerRegistration";
import EducatorRegistration from "../pages/Auth/EducatorRegistration";

interface IProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = (props: IProps) => {
  const { component: Component, isLoggedIn, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        // replace true with check for login
        isLoggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // update state with user info and loading:false
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/events" component={EducatorDashboard} />
              <Route path="/events/:name" component={EventPage} />
              <Route
                path="/educator-registration"
                component={EducatorRegistration}
              />
              <Route
                path="/volunteer-registration"
                component={VolunteerRegistration}
              />

              <PrivateRoute
                component={TestSection}
                exact
                path="/test"
                isLoggedIn={true}
              />
              <PrivateRoute
                component={VolunteerList}
                exact
                path="/volunteers"
                isLoggedIn={true}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </ThemeProvider>
    );
  }
}
