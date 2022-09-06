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
import MatchRoomPage from "./pages/matching-service/MatchRoomPage";

function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/matchselection" element={<MatchSelectionPage />} />
            <Route path="/matchroom" element={<MatchRoomPage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
