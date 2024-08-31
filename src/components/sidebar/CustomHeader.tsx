import { DeliveryDining } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export interface ICollapsed {
  collapsed: boolean;
}
export const CustomHeader: React.FC<ICollapsed> = ({ collapsed }) => {
  const nav = useNavigate();
  return (
    <Typography
      variant="h6"
      noWrap
      onClick={() => nav("/")}
      sx={{
        cursor: "pointer",
        display: "flex",
        gap: "5px",
        alignItems: "center",
        // justifyContent:'center'
      }}
    >
      <DeliveryDining />
      {!collapsed && "Riderz"}
    </Typography>
  );
};

