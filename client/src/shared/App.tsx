import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/styling/Theme";
import './App.css';
import Navbar from './Navbar';
import EducatorDashboard from '../pages/EducatorDashboard/EducatorDashboard';
import EventPage from '../pages/EducatorDashboard/IndividualOpportunity/EventPage'
import Login from '../pages/Auth/SignIn';
import VolunteerList from '../pages/VolunteerList/VolunteerList';

/* Selectors */
import { getUser } from '../data/selectors/userSelector';

/* Types */
import { User } from '../data/types/userTypes';

interface IProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = (rProps: IProps) => {
  const { component: Component, isLoggedIn, ...rest } = rProps;

  return (
    <Route {...rest} render={routeProps => (
      // replace true with check for login
      isLoggedIn ?
        <Component {...routeProps} />
        : <Redirect
          to={{
            pathname: "/",
            state: { from: routeProps.location }
          }}
        />
    )} />
  );
};

class App extends React.Component<
  { user: User, history: any, location: any }, 
  { isLoggedIn: boolean; user: User | null }
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null
    };
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/events" component={EducatorDashboard} isLoggedIn={isLoggedIn} />
              <PrivateRoute path="/events/:name" component={EventPage} isLoggedIn={isLoggedIn} />
              <PrivateRoute component={VolunteerList} exact path="/volunteers" isLoggedIn={isLoggedIn} />
            </Switch>
          </React.Fragment>
        </Router>
      </ThemeProvider >
    )
  }
}

const mapStateToProps = (state: any): any => ({
  user: getUser(state)
});

export default connect(mapStateToProps, null)(App);
