import { DeliveryDining } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const CustomLogo = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
      {/* <img src="/path-to-your-logo/logo.png" alt="Custom Logo" width={150} /> */}
      <DeliveryDining />
      <Typography variant="h5" component="div" ml={2}>
        Riderz
      </Typography>
    </Box>
  );
};

