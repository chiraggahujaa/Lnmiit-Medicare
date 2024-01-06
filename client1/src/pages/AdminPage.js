import React from 'react';
import Admin from "../Components/Admin/Admin";
import Card from '../Components/UI/Card/Card';
import classes from "./AdminPage.module.css";

function AdminPage(props) {
    return (
      <div className={classes.admin}>
          <Admin />
      </div>
    );
}

export default AdminPage;