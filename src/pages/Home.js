import React,{useContext} from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import {AuthContext} from '../context/auth';
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
  const {user} = useContext(AuthContext);
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
  // if (data) {
  //   console.log(data);
  // }
  if (error) {
    console.log(error);
    return "error"; // blocks rendering
  }
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
              <PostForm/>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}


export default Home;
