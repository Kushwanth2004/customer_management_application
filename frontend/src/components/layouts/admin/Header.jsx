import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useAuth from "../../../hooks/useAuth";
import {
  APPBAR_DESKTOP,
  APPBAR_MOBILE,
  BRAND_NAME,
} from "../../data/constrain";

const AppBarStyle = styled(AppBar)({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  width: "100%",
  "@media print": {
    display: "none",
  },
});

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  color: "#fff",
  display: "flex",
  justifyContent: "space-between", // Pushes elements to opposite ends
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_MOBILE,
    padding: 0,
  },
}));

function Header() {
  const { logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBarStyle className="bg-mediumgreen px-4 py-5">
          <Typography variant="h6" className="text-black text-2xl">
            Admin {BRAND_NAME}
          </Typography>
      {/* <Container>
        <ToolbarStyle>
          <Box>
          </Box>
        </ToolbarStyle>
      </Container> */}
    </AppBarStyle>
  );
}

export default Header;
