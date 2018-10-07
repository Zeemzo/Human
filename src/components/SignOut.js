import React from "react";
// import { Button } from "react-bootstrap";
import { auth } from "../firebase";

const SignOutButton = () => (
  <label onClick={auth.doSignOut}>
    Sign Out
  </label>
);

export default SignOutButton;
