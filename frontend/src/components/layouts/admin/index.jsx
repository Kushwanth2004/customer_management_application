import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import { APPBAR_DESKTOP, APPBAR_MOBILE, BRAND_NAME } from "../../../components/data/constrain";
import Sidebar from "./Sidebar";

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: `calc(100vh - ${APPBAR_DESKTOP + 1}px)`,
  paddingTop: APPBAR_MOBILE + 30,
  paddingBottom: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APPBAR_DESKTOP + 20,
  },
  "@media print": {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: "auto",
  },
}));

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex-1 overflow-y-auto h-screen bg-secondwhite">
        <div className="flex absolute w-full items-center justify-between p-3">
          <h1 className="text-3xl">ADMIN {BRAND_NAME}</h1>
        </div>
        <MainStyle className="min-h-screen py-16">{children || <Outlet />}</MainStyle>
      </div>
    </div>
  );
};

export default AdminLayout;
