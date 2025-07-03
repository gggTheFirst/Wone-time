import {
  Card,
  Typography,
  InputLabel,
  Button,
  Box,
  Input,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { type ErrorMessage } from "../types";
import { parseError } from "../services/firebaseError";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<ErrorMessage>({
    hasError: false,
    message: "",
  });

  const navigate = useNavigate();

  async function checkIfEmailExists(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset password like has been sent to you email!");
      setError({ hasError: false, message: "" });
    } catch (error) {
      setError({ hasError: true, message: parseError(error.code) });
    }
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 400, height: 500 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Forgot Password
          </Typography>

          <InputLabel htmlFor="email_login">Email</InputLabel>
          <Input
            id="email_login"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter you email"
            sx={{ mb: 1 }}
          />

          {error.hasError && (
            <>
              <Typography variant="caption" color="red">
                {error.message}
              </Typography>
            </>
          )}

          <Button
            onClick={() => {
              checkIfEmailExists(username);
            }}
          >
            Send email
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body1">Return to login</Typography>
            <Button
              onClick={() => {
                navigate("/Login_Signup");
              }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;
