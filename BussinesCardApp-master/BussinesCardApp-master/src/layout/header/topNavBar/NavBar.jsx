import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import Logo from "./logo/Logo";
import LogoIcon from "./logo/LogoIcon";
import { MenuProvider } from "./menu/MenuProvider";
import RightNavBar from "./right-navigation/RightNavBar";
import SearchAppBar from "./right-navigation/SearchAppBar";

export default function NavBar() {
  return (
    <MenuProvider>
      <AppBar position="sticky" color="primary" elevation={10}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LeftNavBar />
          <SearchAppBar/>
          <RightNavBar />
          
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
}
