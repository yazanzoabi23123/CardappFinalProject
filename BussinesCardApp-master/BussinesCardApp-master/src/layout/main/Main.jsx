import { Box } from "@mui/material";
import { node } from "prop-types";
import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
export default function Main({ children }) {
  const { isDark } = useTheme();
  const {user} =useUser();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          minHeight: "85vh",
          backgroundColor: isDark ? "#333333" : "#e3f2fd",
        }}
      >
        {children}
        
      </Box>
    </>
  );
}

Main.propTypes = {
  children: node.isRequired,
};

