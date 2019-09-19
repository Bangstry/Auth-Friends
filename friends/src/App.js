import React, {useState} from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import FriendsList from "./components/FriendsList";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import AddFriend from "./components/AddFriend";
import Edit from "./components/Editor";
import {Button} from 'semantic-ui-react';
import SignOut from './components/SignOut';

function App(props) {

  const [auth, setAuth] = useState(true);
  return (
    <div className="App">
      <br />
      {auth && <Button>
      <Link to="/">Sign In</Link>
      </Button>}

      {!auth && <Button>
      <Link to="/SignOut">Sign Out</Link>
      </Button>}
      <br />
      <br />

      <PrivateRoute path="/friends" component={props=> <FriendsList {...props} setAuth={setAuth}  />} />
      <PrivateRoute path="/add" component={props=> <AddFriend {...props} />} setAuth={setAuth} />
      <PrivateRoute path="/edit/:id" component={props=> <Edit {...props} setAuth={setAuth} />} />
      <Route exact path="/" component={props=> <SignIn {...props} setAuth={setAuth} />} />
      <Route  path="/SignOut" component={props=> <SignOut {...props} setAuth={setAuth} />} />
    </div>
  );
}

export default App;