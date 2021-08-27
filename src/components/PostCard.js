import React, { useContext } from "react";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
function PostCard({
  post: { body, createAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  function likePost() {
    console.log("click");
  }
  function commentOnPost() {
    console.log("comment!");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost} size="mini">
          <Button color="red" basic>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button
          as="div"
          labelPosition="right"
          onClick={commentOnPost}
          style={{ marginLeft: 5 }}
          as={Link}
          to={`/posts/${id}`}
        >
          <Button color="teal" basic size="mini">
            <Icon name="comments" />
            Comment
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("delete post")}
            floated="right"
          >
            <Icon
              name="trash"
              style={{ margin: 0, justifyContent: "center" }}
            />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
export default PostCard;
