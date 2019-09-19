import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./AxiosAuth";

const Edit = props => {
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
  const sumbitHandler = e => {
    const id = props.match.params.id;
    e.preventDefault();
    if (friend.name != "" && friend.age != "" && friend.email != "") {
      axiosWithAuth()
        .put(`friends/${id}`, friend)
        .then(res => {
          props.history.push("/friends");
        });
    }
  };

  useEffect(() => {
    const id = props.match.params.id;
    axiosWithAuth()
      .get(`friends/${id}`)
      .then(res => {
        console.log(res);
        setShow(true);
        setFriend({
          ...res.data
        });
      })
      .catch(error => {
        localStorage.setItem("token", null);
        props.history.push("/");
      });
  }, []);

  return (
    <div>
      {show && (
        <form onSubmit={sumbitHandler}>
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
          <button>Edit</button>
        </form>
      )}
    </div>
  );
};

export default Edit;