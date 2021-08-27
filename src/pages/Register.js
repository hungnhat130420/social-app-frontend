import React, { useContext,useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import {AuthContext} from '../context/auth';

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

   const {onChange,onSubmit,values} = useForm(registerUser,{
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  })


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data:{register:userData}}) {
      // console.log(result);
      context.login( userData)
      props.history.push("/");
    },
    onError(err) {
      //console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  }); 

  function registerUser(){
    addUser()
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="ConfirmPassword"
          placeholder="ConfirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button primary type="submit" style={{ marginTop: 20 }}>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $email: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        email: $email
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createAt
      token
    }
  }
`;
export default Register;
