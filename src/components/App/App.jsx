import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import AdminPage from "../AdminPage/AdminPage";
import ChartPage from "../ChartPage/ChartPage";
import HistoryPage from "../HistoryPage/HistoryPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import StartProcedurePage from "../StartProcedurePage/StartProcedurePage";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#152696',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#99012c',
        // dark: will be calculated from palette.secondary.main,
        contrastText: 'white',
      },
      warning: {
        // light: will be calculated from palette.primary.main,
        main: '#e86f05',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      }
    }  
});

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /start page
              <Redirect to="/start" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /start page
              <Redirect to="/start" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/admin">
            {user.id !== 1 ? (
              // If the user is already logged in,
              // redirect them to the /start page
              <Redirect to="/start" />
            ) : (
              // Otherwise, show the registration page
              <AdminPage />
            )}
          </Route>

          <ProtectedRoute>
            <Route exact path="/start">
              <StartProcedurePage />
            </Route>
            <Route exact path="/chart">
              <ChartPage />
            </Route>
            <Route exact path="/history">
              <HistoryPage />
            </Route>
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
