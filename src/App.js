import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/users/Users";
import UserSingle from "./components/users/User"; //Fetching Single User From the Github API.
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(async () => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //After we have got our Response From the Github API :
    // this.setState({ users: response.data, loading: false });
    setUsers(response.data);
    setLoading(false);
    //eslint-disable-next-time
  }, []);

  const searchUser = async (text) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //After we have got our Response From the Github API :
    // this.setState({ users: response.data.items, loading: false });
    setUsers(response.data.items);
    setLoading(false);
  };

  //Getting a Single User From the Github API :
  const getUser = async (username) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //After we have got our Response From the Github API :
    // this.setState({ user: response.data, loading: false });
    setUser(response.data);
    setLoading(false);
  };

  //Fetching the Repositories From the Github API :
  const getUserRepos = async (username) => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //After we have got our Response From the Github API :
    // this.setState({ repos: response.data, loading: false });
    setRepos(response.data);
    setLoading(false);
  };

  const clearUsers = () => {
    // this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };

  //Showing Up and Alert If The User is Submitting the Form ,Without Entering Anything.
  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg: msg, type: type } });
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search
                  searchUser={searchUser}
                  clearUsers={clearUsers}
                  setAlert={showAlert}
                />
                <User loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <UserSingle
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
