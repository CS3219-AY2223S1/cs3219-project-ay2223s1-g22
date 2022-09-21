import { useState, useCallback } from "react";
import {
	Flex,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	FormControl,
	InputRightElement,
	useToast,
	FormHelperText,
	FormErrorMessage
} from "@chakra-ui/react";
import {
	FaUserAlt,
	FaLock,
	FaRegEye,
	FaRegEyeSlash,
	FaComments,
} from "react-icons/fa";
import { AtSignIcon } from "@chakra-ui/icons";
import NavBar from "../user-service/NavBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { createUserAccount, sendEmailVerification } from "../../controller/user-controller";
import UserContext from "../../UserContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye);
const CFaEyeSlash = chakra(FaRegEyeSlash);

const SignupPage = () => {
	const { storeUserData } = useContext(UserContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isRequiredName, setIsRequiredName] = useState(false);
	const [isRequiredEmail, setIsRequiredEmail] = useState(false);
	const [isRequiredPassword, setIsRequiredPassword] = useState(false);
	const [isRequiredConfirmPassword, setIsRequiredConfirmPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const navigate = useNavigate();

	const handleBackClick = useCallback(
		() => navigate("/login", { replace: true }),
		[navigate]
	);

	const handleConfirmPassword = () => {
		password === confirmPassword ? setIsRequiredConfirmPassword(false) : setIsRequiredConfirmPassword(true);
	}

	const handleRequiredFields = () => {
		if (email === "") {
			setIsRequiredEmail(true);
		} else {
			setIsRequiredEmail(false);
		}

		if (name === "") {
			setIsRequiredName(true);
		} else {
			setIsRequiredName(false);
		}

		if (password === "") {
			setIsRequiredPassword(true);
		} else {
			setIsRequiredPassword(false);
		}

		handleConfirmPassword();

		return !isRequiredName && !isRequiredEmail && !isRequiredPassword && !isRequiredConfirmPassword;
	}

	const handleResetStates = () => {
		setName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setIsRequiredName(false);
		setIsRequiredEmail(false);
		setIsRequiredPassword(false);
		setIsRequiredConfirmPassword(false);
	}

	const handleSignup = () => {
		if (handleRequiredFields()) {
			const promise = createUserAccount(email, password);
			promise.then((res) => {
				if (res.data) {
					storeUserData(res.data.accessToken, res.data.refreshToken, res.data.user);
					const resp = sendEmailVerification(res.data.accessToken);
					resp.then((output) => {
						if (output) {
							handleResetStates();
							showSignupSuccessToast();
							navigate("/matchselection");
							return;
						}
					});
				} else if (res.message.includes("auth/email-already-in-use")) {
					showSignupFailureToast("Email is already in use!");
				} else {
					showSignupFailureToast("Something went wrong, please try again later!");
				}
			});
		} else {
			showSignupFailureToast("Missing required fields!");
		}
	};

	const signupSuccessToast = useToast();
	const showSignupSuccessToast = () =>
		signupSuccessToast({
			title: "Sign up successful!",
			description: "An email verification has been sent.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const signupFailureToast = useToast();
	const showSignupFailureToast = (desc) =>
		signupFailureToast({
			title: "Sign up unsuccessful.",
			description: desc,
			status: "error",
			duration: 3000,
			isClosable: true,
		});

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			justifyContent="center"
			alignItems="center"
		>
			<NavBar />
			<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center"
			>
				<FaComments color="#66ddaa" size="80" />
				<Box minW={{ base: "90%", md: "468px" }}>
					<form>
						<Stack
							spacing={4}
							p="1rem"
							backgroundColor="whiteAlpha.100"
							boxShadow="lg"
							borderRadius="lg"
						>
							<FormControl isInvalid={isRequiredName}>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<CFaUserAlt color="gray.500" />}
									/>
									<Input
										onChange={(e) => setName(e.target.value)}
										type="text"
										placeholder="Full name" />
								</InputGroup>
								{!isRequiredName ? (
									<></>
								) : (
									<FormErrorMessage>Name is required.</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={isRequiredEmail}>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<AtSignIcon color="gray.500" />}
									/>
									<Input
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										placeholder="Email address"
									/>
								</InputGroup>
								{!isRequiredEmail ? (
									<></>
								) : (
									<FormErrorMessage>Email is required.</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={isRequiredPassword}>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										color="gray.500"
										children={<CFaLock color="gray.500" />}
									/>
									<Input
										onChange={(e) => setPassword(e.target.value)}
										type={showPassword ? "text" : "password"}
										placeholder="Enter a password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											variant="link"
											leftIcon={showPassword ? <CFaEye /> : <CFaEyeSlash />}
										/>
									</InputRightElement>
								</InputGroup>
								{!isRequiredPassword ? (
									<></>
								) : (
									<FormErrorMessage>Password is required.</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={isRequiredConfirmPassword}>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										color="gray.500"
										children={<CFaLock color="gray.500" />}
									/>
									<Input
										onChange={(e) => setConfirmPassword(e.target.value)}
										type={showPassword ? "text" : "password"}
										placeholder="Re-enter password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											variant="link"
											leftIcon={showPassword ? <CFaEye /> : <CFaEyeSlash />}
										/>
									</InputRightElement>
								</InputGroup>
								{!isRequiredConfirmPassword ? (
									<></>
								) : (
									<FormErrorMessage>Passwords do not match!</FormErrorMessage>
								)}
							</FormControl>
							<Stack direction="row">
								<Button
									borderRadius={5}
									variant="solid"
									width="50%"
									shadow="lg"
									onClick={handleBackClick}
								>
									Back
								</Button>
								<Button
									borderRadius={5}
									variant="solid"
									colorScheme="teal"
									width="50%"
									shadow="lg"
									onClick={handleSignup}
								>
									Register
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default SignupPage;
