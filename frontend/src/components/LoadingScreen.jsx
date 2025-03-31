import { useEffect } from "react";
import NProgress from "nprogress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BRAND_NAME } from "./data/constrain";


const LoadingScreen = () => {
  NProgress.configure({
    showSpinner: false,
  });
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        color: "black",
      }}>
      {/* Brand Name */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "black",
          fontWeight: "bold",
          letterSpacing: 2,
        }}>
        {BRAND_NAME}
      </Typography>

      {/* Circular Progress with Red Color */}
      <CircularProgress
        sx={{
          color: "black", // Use red color for the progress indicator
          mb: 3,
        }}
        thickness={5}
        size={60} />

      {/* Loading Message */}
      <Typography
        variant="body1"
        sx={{
          color: "black",
        }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};
export default LoadingScreen;
