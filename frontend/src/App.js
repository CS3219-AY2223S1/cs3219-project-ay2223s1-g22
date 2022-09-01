import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/user-service/SignupPage";
import MatchSelectionPage from "./pages/matching-service/MatchSelectionPage";
import LoginPage2 from './pages/user-service/LoginPage2';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/matchselection" element={<MatchSelectionPage />} />
            <Route path="/login" element={<LoginPage2/>}/>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
