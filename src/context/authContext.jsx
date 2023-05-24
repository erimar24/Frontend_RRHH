import { createContext, useContext, useEffect, useState } from "react";
import { signIn } from "../services";
import { from, BehaviorSubject } from "rxjs";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem("user"))
  const [user, setUser] = useState(userData);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const isLoggedIn$ = from(new BehaviorSubject(isAuth));

  async function handleSignIn(email, password) {
    const result = await signIn(email, password)

    if (!result.success)
      return result;

    const user = await sessionStorage.getItem("user")
    setUser(JSON.parse(user));
    setIsAuth(true);
    setLoading(false);
  }

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    (userData) ? setUser(JSON.parse(userData)) : setUser(null);
    setLoading(false);
  }, [])

  return (
    <authContext.Provider value={{ user, loading, handleSignIn, isLoggedIn$ }}>
      {children}
    </authContext.Provider>
  );
};
