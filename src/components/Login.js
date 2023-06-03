import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { auth, provider } from "../firebase";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//  styles :
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const InnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
    height: 100px;
  }
  > button {
    margin-top: 40px;
    color: white;
    background-color: #0a8d48 !important;
    text-transform: inherit !important;
  }
`;

const Login = () => {
  const auth = getAuth();
  const onSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log("token", token);
        // The signed-in user info.
        const user = result.user;
        // console.log("user is ", user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        // console.log("error->", error);
        // console.log("credential", credential);
      });
  };

  return (
    <Container>
      <h2>Hi! Welcome to my Slack Clone</h2>
      <InnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in to Chat !!</h1>

        <Button onClick={onSignIn} variant="contained" color="primary">
          Sign In
        </Button>
      </InnerContainer>
      <h6>Made by Anamika Gupta</h6>
    </Container>
  );
};

export default Login;
