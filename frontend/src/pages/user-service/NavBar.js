import {
	HStack,
	Stack,
	Heading,
	Avatar,
	useColorMode,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
	useToast,
	Badge
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext, useState, useRef } from "react";
import UserContext from "../../UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import LeaveRoomOverlay from "../matching-service/LeaveRoomOverlay";
import { deleteUserAccount } from "../../controller/user-controller";
import { revokeRefreshToken } from "../../controller/token-controller";

function NavBar() {
	const location = useLocation();
	const { colorMode, toggleColorMode } = useColorMode();
	const { idToken, user, clearUserData } = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const cancelRef = useRef();
	const navigate = useNavigate();

	const deleteSuccessToast = useToast();
	const showDeleteSuccessToast = () =>
		deleteSuccessToast({
			title: "Account deletion successful",
			description: "Nooooooooo :(",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const deleteFailureToast = useToast();
	const showDeleteFailureToast = () =>
		deleteFailureToast({
			title: "Account deletetion unsuccessful",
			description: "Something went wrong, please try again later.",
			status: "error",
			duration: 3000,
			isClosable: true,
		});

	const logoutSuccessToast = useToast();
	const showLogoutSuccessToast = () =>
		logoutSuccessToast({
			title: "Logout successful",
			description: "Goodbye, see you again!",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const logoutFailureToast = useToast();
	const showLogoutFailureToast = () =>
		logoutFailureToast({
			title: "Logout unsuccessful",
			description: "Something went wrong, please try again later.",
			status: "error",
			duration: 3000,
			isClosable: true,
		});

	const handleLogin = () => {
		navigate("/login");
	};

	const handleLogout = () => {
		const resp = revokeRefreshToken(user.uid);
		resp.then((res) => {
			if (res) {
				showLogoutSuccessToast();
				clearUserData();
				navigate("/");
			} else {
				showLogoutFailureToast();
			}
		})
	};

	const handleDeleteAccount = () => {
		const resp = deleteUserAccount(user.uid);
		resp.then((res) => {
			if (res) {
				onClose();
				showDeleteSuccessToast();
				clearUserData();
				navigate("/");
			} else {
				showDeleteFailureToast();
			}
		})
	}

	const toggleOverlay = (e) => {
		setIsOverlayOpen(e);
	};

	/* ======== Helper Functions ================================================================================*/
	function getUsernameFromEmail(user) {
		if (!user || !user.email) {
			return "NO USERNAME FOUND";
		}

		const email = user.email;
		const username = email.split("@")[0];
		return username;
	}

	return (
		<HStack w="100%" px="3%" py="1%" justifyContent="space-between">
			<LeaveRoomOverlay isVisible={isOverlayOpen} toggleOverlay={toggleOverlay} />
			<Heading color="#66ddaa">PeerPrep</Heading>
			<HStack>
				{location.pathname === "/matchroom" && (
					<Button
						colorScheme="red"
						onClick={() => {
							toggleOverlay(true);
						}}
					>
						Leave Match
					</Button>
				)}
				{
					idToken && (user.emailVerified ? (
						<Badge variant="solid" colorScheme="green">verified</Badge>
					) : (
						<Badge variant="solid" colorScheme="red">Not verified</Badge>
					))
				}
				<Button variant="link" onClick={() => toggleColorMode()}>
					{colorMode === "dark" ? (
						<SunIcon color="orange.200" />
					) : (
						<MoonIcon color="blue.800" />
					)}
				</Button>
				{idToken && (
					<Popover>
						<PopoverTrigger>
							<Avatar
								name={getUsernameFromEmail(user)}
								src="https://bit.ly/broken-link"
							/>
						</PopoverTrigger>
						<PopoverContent width="30">
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverBody>
								{idToken ? (
									<Stack>
										<Button colorScheme="red" onClick={onOpen}>
											Delete Account
										</Button>
										<Button colorScheme="teal" onClick={handleLogout}>
											Logout
										</Button>
									</Stack>
								) : (
									<Button colorScheme="teal" onClick={handleLogin}>
										Login
									</Button>
								)}
							</PopoverBody>
						</PopoverContent>
					</Popover>
				)
				}
				<>
					<AlertDialog
						isOpen={isOpen}
						leastDestructiveRef={cancelRef}
						onClose={onClose}
					>
						<AlertDialogOverlay>
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									Delete Account
								</AlertDialogHeader>

								<AlertDialogBody>
									Are you sure? You can't undo this action afterwards.
								</AlertDialogBody>

								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										Cancel
									</Button>
									<Button colorScheme='red' onClick={handleDeleteAccount} ml={3}>
										Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
				</>
			</HStack >
		</HStack >
	);
}

export default NavBar;
