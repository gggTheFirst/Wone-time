// AuthProvider.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {Box, CircularProgress} from '@mui/material'
import { auth } from "./services/firebase";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) return (

    <Box sx={{ display: 'flex', justifyContent: "center", minHeight: "95vh", alignContent: "center", flexWrap: "wrap" }}>
      <CircularProgress size={"70px"}  />
    </Box>
  )


  return <>{children}</>;
}