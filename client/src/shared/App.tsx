import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteProps,
} from "react-router-dom";

import Login from "../pages/Auth/SignIn";
import VolunteerList from "../pages/VolunteerList/VolunteerList";
import VolunteerRegistration from "../pages/Auth/VolunteerRegistration";
import EducatorRegistration from "../pages/Auth/EducatorRegistration";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/styling/Theme";
import "./App.css";
import Navbar from "./Navbar";
import EducatorDashboard from "../pages/EducatorDashboard/EducatorDashboard";
import EventPage from "../pages/EducatorDashboard/IndividualOpportunity/EventPage";
import OpportunityList from "../pages/OpportunityList/OpportunityList";

/* Types */
import { User } from "../data/types/userTypes";

interface IProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = (rProps: IProps) => {
  const { component: Component, isLoggedIn, ...rest } = rProps;

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

class App extends React.Component<
  { user: User; history: any; location: any },
  {}
> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let user;
    let isLoggedIn = false;
    let isEducator = false;
    const userString = localStorage.getItem("user");

    if (userString) {
      user = JSON.parse(userString);
      isLoggedIn = true;
    }

    return (
      <ThemeProvider theme={theme}>
        <Navbar user={user} />
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Login} />

              <PrivateRoute
                exact
                path="/events"
                component={EducatorDashboard}
                isLoggedIn={isLoggedIn}
              />
              <PrivateRoute
                path="/events/:name"
                component={EventPage}
                isLoggedIn={isLoggedIn}
              />
              <Route
                component={VolunteerList}
                exact
                path="/volunteers"
                isLoggedIn={isLoggedIn}
              />
              <PrivateRoute
                component={OpportunityList}
                exact
                path="/opportunities"
                isLoggedIn={isLoggedIn}
              />
              <Route
                path="/educator-registration"
                component={EducatorRegistration}
              />
              <Route
                path="/volunteer-registration"
                component={VolunteerRegistration}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
