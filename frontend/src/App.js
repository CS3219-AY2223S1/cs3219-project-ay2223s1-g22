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
import UserContext from "./UserContext";
import { useLocalStorage } from "./useLocalStorage";
import Protected from "./Protected";
import {
	isUserLoggedIn,
	refreshAccessToken,
} from "./controller/token-controller";

function App() {
	const [idToken, setIdToken] = useLocalStorage("idToken", "");
	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
	const [user, setUser] = useLocalStorage("user", {});

	const handleStoreUserData = (idToken, refreshToken, user) => {
		setIdToken(idToken);
		setRefreshToken(refreshToken);
		setUser(user);
	};

	const handleClearUserData = () => {
		setIdToken("");
		setRefreshToken("");
		setUser({});
	};

	const isLoggedIn = () => {
		return isUserLoggedIn(idToken);
	};

	const handleRefreshIdToken = (refreshToken) => {
		const resp = refreshAccessToken(refreshToken);
		resp.then((res) => {
			if (res) {
				setIdToken(res.data.id_token);
				return true;
			}
			return false;
		})
	}

	return (
		<ChakraProvider>
			<div className="App">
				<UserContext.Provider
					value={{
						idToken: idToken,
						refreshToken: refreshToken,
						user: user,
						storeUserData: handleStoreUserData,
						clearUserData: handleClearUserData,
						isLoggedIn: isLoggedIn,
						refreshIdToken: handleRefreshIdToken
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