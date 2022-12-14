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
import { useSessionStorage } from "./useSessionStorage";
import Protected from "./Protected";
import {
	isUserLoggedIn,
	refreshAccessToken,
} from "./controller/token-controller";
import LoginProtected from "./LoginProtected";

function App() {
	const [idToken, setIdToken] = useSessionStorage("idToken", "");
	const [refreshToken, setRefreshToken] = useSessionStorage("refreshToken", "");
	const [user, setUser] = useSessionStorage("user", {});

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
		return isUserLoggedIn({
			idToken: idToken,
			refreshToken: refreshToken
		}, handleStoreUserData);
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
								element={
									isLoggedIn() ? <Navigate replace to="/matchselection" />
										: <Navigate replace to="/login" />
								} />

							<Route path="/login" element={
								<LoginProtected>
									<LoginPage />
								</LoginProtected>} />

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