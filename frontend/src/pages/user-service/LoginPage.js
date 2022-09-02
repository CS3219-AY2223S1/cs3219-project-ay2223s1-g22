import { useState, useCallback, useEffect } from "react";
import {
	Flex,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Link,
	FormControl,
	InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash, FaComments } from "react-icons/fa";
import NavBar from "../user-service/NavBar";
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from "../../controller/user-controller";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye)
const CFaEyeSlash = chakra(FaRegEyeSlash)

const App = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const handleShowClick = () => setShowPassword(!showPassword);
	const navigate = useNavigate();
	const handleSignUpClick = useCallback(() => navigate('/signup', { replace: true }), [navigate]);

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			justifyContent="center"
			alignItems="center">
			<NavBar />
			<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center" >
				<FaComments color="#66ddaa" size='80' />
				<Box minW={{ base: "90%", md: "468px" }}>
					<Stack
						spacing={4}
						p="1rem"
						backgroundColor="whiteAlpha.100"
						boxShadow='lg'
						borderRadius='lg'>
						<FormControl>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<CFaUserAlt color="gray.300" />}
								/>
								<Input
									onChange={(e) => { setEmail(e) }}
									type="email"
									placeholder="Email Address" />
							</InputGroup>
						</FormControl>
						<FormControl>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									color="gray.300"
									children={<CFaLock color="gray.300" />}
								/>
								<Input
									onChange={(e) => { setPassword(e) }}
									type={showPassword ? "text" : "password"}
									placeholder="Password"
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem" size="sm"
										onClick={handleShowClick}
										variant='link'
										leftIcon={showPassword ? <CFaEye /> : <CFaEyeSlash />} />
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack direction='row'>
							<Button
								borderRadius={5}
								variant="solid"
								width="50%"
								shadow='lg'
								onClick={handleSignUpClick} >
								Sign up
							</Button>
							{token ? (<Button
								borderRadius={5}
								variant="solid"
								colorScheme="teal"
								width="50%"
								shadow='lg'
								onClick={() => {
									if (logoutUser()) {
										setToken("");
									};
								}}>
								Logout
							</Button>)
								: (<Button
									borderRadius={5}
									variant="solid"
									colorScheme="teal"
									width="50%"
									shadow='lg'
									onClick={() => {
										loginUser(email, password);
									}}>
									Login
								</Button>)
							}
						</Stack>
					</Stack>
				</Box>
			</Stack>
			<Box>
				Forgot Password?{" "}
				<Link color="teal.500" href="#">
					Click here
				</Link>
			</Box>
		</Flex>
	);
};

export default App;