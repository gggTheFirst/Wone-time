import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";

function Layout2() {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Layout2;
