// AuthProvider.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
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

  if (loading) return <h2>Loading...</h2>

  return <>{children}</>;
}