import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./AxiosAuth";

const FriendRequest = props => {
  const [show, setShow] = useState(false);
  const [friend, setFriend] = useState({
    id: null,
    name: "",
    age: "",
    email: ""
  });

  const changeHandler = e => {
    setFriend({
      ...friend,
      [e.target.name]: e.target.value,
      id: Date.now()
    });
  };
  const submitHandler = e => {
    e.preventDefault();
    if (friend.name != "" && friend.age != "" && friend.email != "") {
      axiosWithAuth()
        .post("friends", friend)
        .then(res => {
          props.history.push("/friends");
        })
        .catch(error => {});

      setFriend({
        id: null,
        name: "",
        age: "",
        email: ""
      });
    }
  };

  useEffect(() => {
    axiosWithAuth()
      .get("friends")
      .then(res => {
        setShow(true);
      })
      .catch(error => {
        localStorage.setItem("token", null);
        props.history.push("/");
      });
  }, []);

  return (
    <div>
      {show && (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={friend.name}
            onChange={changeHandler}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={friend.age}
            onChange={changeHandler}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={friend.email}
            onChange={changeHandler}
          />
          <button>Send Request</button>
        </form>
      )}
    </div>
  );
};

export default FriendRequest;