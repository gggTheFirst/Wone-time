import { List, ListItem, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";
import ContrastIcon from "@mui/icons-material/Contrast";
import MenuIcon from "@mui/icons-material/Menu";

import Box from "@mui/material/Box";

import { useLoginInfo } from "../stores/loginState";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { useRef, useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [sidebarVisible, setVisible] = useState(false);
  const SideRef = useRef(null);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
      // navigate("/Login_Signup");
      // useLoginInfo.getState().resetStore();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  function SlideSideBar() {
    const isVisible = !sidebarVisible;
    setVisible(isVisible);

    requestAnimationFrame(() => {
      if (SideRef.current && menuRef.current) {
        // SideRef.current.style.position = isVisible ? "fixed" : "absolute";
        SideRef.current.style.left = isVisible ? "0" : "-200px";
        SideRef.current.style.width = isVisible ? "200px" : "0";
        menuRef.current.style.left = isVisible
          ? "235px" // fallback if needed
          : "10px";
      }
    });
  }
  return (
    <>
      <MenuIcon
        ref={menuRef}
        sx={{
          cursor: "pointer",
          visibility: {
            sm: "visible",
            md: "hidden",
          },
          position: "fixed",
          top: "75px",
          left: "10px",
        }}
        onClick={SlideSideBar}
      />
      <Box
        ref={SideRef}
        sx={{
          border: "1px solid black",

          left: {
            xs: "-30%", // 0px+
            sm: "-30%", // 600px+
            md: "0", // 900px+
            lg: "0", // 1200px+
          },
          width: {
            xs: "0%", // 0px+
            sm: "0%", // 600px+
            md: "200px", // 900px+
          },
          minHeight: "95vh",
          p: 2,
          pt: 8,
          position: "relative",
        }}
      >
        <List sx={{ display: "flex", flexDirection: "column" }}>
          <Link to={"/"}>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ pb: "3px" }} />
              <Typography variant="overline" sx={{ pl: 1, fontSize: 16 }}>
                Dashboard
              </Typography>
            </ListItem>
          </Link>

          <Link to={"/timeEntries"}>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <TimerIcon sx={{ pb: "3px" }} />
              <Typography variant="overline" sx={{ pl: 1, fontSize: 16 }}>
                Time Tracking
              </Typography>
            </ListItem>
          </Link>

          <Link to={"/report"}>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <EqualizerIcon sx={{ pb: "3px" }} />
              <Typography variant="overline" sx={{ pl: 1, fontSize: 16 }}>
                Report
              </Typography>
            </ListItem>
          </Link>
        </List>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            bottom: "100px",
            position: "absolute",
          }}
        >
          <ListItem
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <ContrastIcon sx={{ pb: "3px" }} />
            <Typography variant="overline" sx={{ pl: 1, fontSize: 16 }}>
              Switch Theme
            </Typography>
          </ListItem>
          <ListItem
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <LogoutIcon sx={{ pb: "3px" }} />
            <Typography
              onClick={handleLogout}
              variant="overline"
              sx={{ pl: 1, fontSize: 16 }}
            >
              Logout
            </Typography>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
