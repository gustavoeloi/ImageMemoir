import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    })
  }, [])

  if (loading) return <div>Verificando autenticação...</div>

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
