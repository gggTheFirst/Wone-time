import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLoginInfo } from "../stores/loginState";
import myLogo from "../assets/time-tracker.svg";

function Header() {
  const username = useLoginInfo((state) => state.userName);
  const loginState = useLoginInfo((state) => state.loginStatus);
  // const loginState = true

  return (
    <AppBar
      position="static"
      color={"primary"}
      sx={{ paddingX: 2, boxShadow: 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Company Logo/Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Optional Logo (replace with <img src="..." /> if needed) */}
          <img src={myLogo} alt="To" width={45} />
          <Typography variant="h6" fontWeight="bold">
            {"Wone-Time"}
          </Typography>
        </Box>

        {/* User Info */}
        {loginState && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">Hi, {username}</Typography>
            <AccountCircleIcon />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
