import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/user-service/SignupPage";
import MatchSelectionPage from "./pages/matching-service/MatchSelectionPage";
import LoginPage from './pages/user-service/LoginPage';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    document.body.style.backgroundColor = '#3e3e5b' //default bg colour

    return (
    <ChakraProvider>
        <div className="App">
        <Router>
            <Routes>
            <Route exact path="/" element={<Navigate replace to="/login" />}/>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/matchselection" element={<MatchSelectionPage />} />
            <Route path="/login" element={<LoginPage />}/>
            </Routes>
        </Router>
        </div>
    </ChakraProvider>
  );
}

export default App;
