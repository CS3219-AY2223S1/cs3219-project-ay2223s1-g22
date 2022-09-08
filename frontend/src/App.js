import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import SignupPage from "./pages/user-service/SignupPage";
import MatchSelectionPage from "./pages/matching-service/MatchSelectionPage";
import LoginPage from "./pages/user-service/LoginPage";
import MatchRoomPage from "./pages/matching-service/MatchRoomPage2";
import UserContext from "./UserContext";
import { useLocalStorage } from "./useLocalStorage";
import Protected from "./Protected";

function App() {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useLocalStorage("user", {});

  const handleStoreUserData = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const handleClearUserData = () => {
    setToken("");
    setUser({});
  };

  const isLoggedIn = () => {
    return token !== "";
  };

  return (
    <ChakraProvider>
      <div className="App">
        <UserContext.Provider
          value={{
            token: token,
            user: user,
            storeUserData: handleStoreUserData,
            clearUserData: handleClearUserData,
            isLoggedIn: isLoggedIn,
          }}
        >
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/login" />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/matchselection"
                element={
                  <Protected>
                    <MatchSelectionPage />
                  </Protected>
                }
              />

              <Route
                path="/matchroom"
                element={
                  <Protected>
                    <MatchRoomPage />
                  </Protected>
                }
              />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </ChakraProvider>
  );
}

export default App;
