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
	Link,
	FormControl,
	InputRightElement,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import {
	FaUserAlt,
	FaLock,
	FaRegEye,
	FaRegEyeSlash,
	FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";
import NavBar from "../user-service/NavBar";
import {
	loginUser,
	resetPassword
} from "../../controller/user-controller";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye);
const CFaEyeSlash = chakra(FaRegEyeSlash);

const LoginPage = () => {
	const { storeUserData } = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const navigate = useNavigate();

	const handleShowClick = () => setShowPassword(!showPassword);

	const handleSignUpClick = useCallback(
		() => navigate("/signup", { replace: true }),
		[navigate]
	);

	const loginSuccessToast = useToast();
	const showLoginSuccessToast = () =>
		loginSuccessToast({
			title: "Login successful!",
			description: "Let's gooooo.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const loginFailureToast = useToast();
	const showLoginFailureToast = () =>
		loginFailureToast({
			title: "Login unsuccessful.",
			description: "Is your email or password correct?",
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
					<Stack
						spacing={4}
						p="1rem"
						backgroundColor="whiteAlpha.100"
						boxShadow="lg"
						borderRadius="lg"
					>
						<FormControl>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<CFaUserAlt color="gray.300" />}
								/>
								<Input
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									type="email"
									placeholder="Email Address"
								/>
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
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type={showPassword ? "text" : "password"}
									placeholder="Password"
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
						</FormControl>
						<Stack direction="row">
							<Button
								borderRadius={5}
								variant="solid"
								width="50%"
								shadow="lg"
								onClick={handleSignUpClick}
							>
								Sign up
							</Button>
							<Button
								borderRadius={5}
								variant="solid"
								colorScheme="teal"
								width="50%"
								shadow="lg"
								onClick={() => {
									const promise = loginUser(email, password);
									promise.then((res) => {
										if (res) {
											storeUserData(res.data.accessToken, res.data.refreshToken, res.data.user);
											showLoginSuccessToast();
											navigate("/matchselection");
										} else {
											showLoginFailureToast();
										}
									});
								}}
							>
								Login
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
			<Box>
				Forgot Password?{" "}
				<Link
					color="teal.500"
					href="#"
					onClick={() => {
						setEmail("");
						onOpen();
					}}
				>
					Click here
				</Link>
			</Box>
			<Modal
				onClose={() => {
					setEmail("");
					onClose();
				}}
				size="md"
				isOpen={isOpen}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Reset Password</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack direction="row">
							<Input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								placeholder="Email Address"
							/>
							<Button
								borderRadius={5}
								variant="solid"
								colorScheme="teal"
								width="20%"
								shadow="lg"
								onClick={() => {
									resetPassword(email);
								}}
							>
								Send
							</Button>
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default LoginPage;
