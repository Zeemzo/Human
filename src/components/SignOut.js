import React from "react";
import { auth } from "../firebase";
import { Button, NavItem } from "react-bootstrap";

const SignOutButton = () => (
  <NavItem id={"n1"} onClick={
      (auth.doSignOut)

  }  >
    Sign Out
  
  </NavItem>

);

export default SignOutButton;
