import React from 'react';
import Login from "../Components/Login";
import classes from "./LoginPage.module.css";
import Card from '../Components/UI/Card/Card';
import bg from "../Images/bg.jpg";

function LoginPage(props) {
    return (
      <div className={classes.bg}>
        <div
          className={classes.login}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Dummylogin />
        </div>
      </div>
    );
}

function Dummylogin(){
  return (
    <Card className={classes.dummy}>
      <Login />
    </Card>
  );
}

export default LoginPage;