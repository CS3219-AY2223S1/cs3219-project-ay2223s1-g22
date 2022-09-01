import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './pages/user-service/SignupPage';
import LoginPage from './pages/user-service/LoginPage';
import LoginPage2 from './pages/user-service/LoginPage2';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
                        {/* <Route path="/signup" element={<SignupPage/>}/> */}
                        <Route path="/login" element={<LoginPage2/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
