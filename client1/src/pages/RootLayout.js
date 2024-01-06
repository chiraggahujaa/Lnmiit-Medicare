import MainNavigation from "../Components/Nav/MainNavigation";
import {Outlet} from "react-router-dom";

import React from "react";

function RootLayout(props) {
  return (
    <>
      <MainNavigation />
      <main style={{ marginTop: "2rem", marginBottom : "2rem"}}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
