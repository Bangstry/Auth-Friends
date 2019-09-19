import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./AxiosAuth";
import Friend from "./Friend";
import { Link } from "react-router-dom";
import {Card, Button} from 'semantic-ui-react';

const FriendsList = props => {
  const [friends, setFriends] = useState();
  const [retrieve, setRetrieve] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get("friends")
      .then(res => {
        setFriends(res.data);
        setRetrieve(false);
      })
      .catch(error => {
        localStorage.setItem("token", null);
        props.history.push("/");
        setRetrieve(false);
      });
  }, []);

  const removeHandler = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`friends/${id}`)
      .then(res => {
        setFriends(res.data);
      });
  };

  return (
    <div>
      {retrieve && "Finding your friends... Please hold..."}
      {friends && <Button><Link to="/add">Add Friend's</Link></Button>}
    <Card.Group className="card-group">
      {friends &&
        friends.map(friend => {
          return (
            <Friend
              key={friend.id}
              friend={friend}
              history={props.history}
              removeHandler={removeHandler}
            />
          );
        })}
        </Card.Group>
    </div>
  );
};

export default FriendsList;