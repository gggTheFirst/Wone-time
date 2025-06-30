import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout2() {
  return (
    <>
      <Header />
      <Box sx={{ minWidth: "100vw", minHeight: "95vh", display: "flex" }}>
        <Sidebar />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Layout2;
