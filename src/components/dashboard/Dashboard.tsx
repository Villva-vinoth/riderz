import { Box } from "@mui/material";
import { useEffect } from "react";

export const Dashboard = () => {

  useEffect(() => {
    const handleState = () => {
      if (localStorage.getItem("roleFit") === "true") {
        location.reload();
        localStorage.setItem("roleFit", "false");
      }
    };
    handleState();
  }, []);

  return <Box>Dashboard</Box>;
};
