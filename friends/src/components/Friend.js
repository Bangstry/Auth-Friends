import React from "react";
import { axiosWithAuth } from "./AxiosAuth";
import {Card, Button, Image} from 'semantic-ui-react';

const Friend = props => {
  const editHandler = e => {
    e.preventDefault();
    props.history.push(`/edit/${props.friend.id}`);
  };
  return (
    <div>
      <Card className="card">
      <Card.Content>
        <Image
          floated='left'
          size='mini'
          src={`http://placeimg.com/200/400/any=${props.friend.id}`}
        />
        <Card.Header>{props.friend.name}</Card.Header>
        <Card.Meta>Age: {props.friend.age} </Card.Meta>
        <Card.Description>
          Email: {props.friend.email}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button color='blue' onClick={e => editHandler(e)}>
            Edit
          </Button>
          <Button color='red' onClick={e => props.removeHandler(e, props.friend.id)}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
    </div>
  );
};

export default Friend;