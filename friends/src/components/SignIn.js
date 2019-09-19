import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./AxiosAuth";
import {Input, Button} from 'semantic-ui-react';

const SignIn = props => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosWithAuth()
        .get("friends")
        .then(res => {
          props.setAuth(false);
          props.history.push("/friends");
        })
        .catch(error => {
          localStorage.setItem("token", null);
          props.setAuth(true);
          setShow(true);
        });
    } else {
      setShow(true);
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.setAuth(false);
        props.history.push("/friends");
      })
      .catch(error => {
        props.setAuth(true);
        console.log("error", error);
      });
  };

  const changeHandler = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      {show && (
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            name="username"
            placeholder="Enter username"
            value={user.username}
            onChange={changeHandler}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={changeHandler}
          />
          <Button>Sign Up</Button>
        </form>
      )}
    </div>
  );
};

export default SignIn;