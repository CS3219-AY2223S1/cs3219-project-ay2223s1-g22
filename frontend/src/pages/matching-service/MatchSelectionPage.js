import { useState, useEffect, useContext } from "react";
import {
	Flex,
	Heading,
	HStack,
	Modal,
	ModalOverlay,
	useToast,
	Text,
	VStack,
	StackDivider,
	Button
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon, RepeatIcon } from "@chakra-ui/icons";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import MatchSelector from "./MatchSelector";
import FindingMatchModal from "./FindingMatchModal";
import { MatchContext } from "./MatchContext";
import { SocketContext } from "./SocketContext";
import UserContext from "../../UserContext";
import { getUser } from "../../controller/user-controller";

const DEFAULT_TIMEOUT_LIMIT = 30; // cancel search after 30 seconds

function MatchSelectionPage() {
	const { socket, sendLevel } = useContext(SocketContext);
	const { user, idToken, refreshToken, storeUserData } = useContext(UserContext);
	const [isFindingMatch, setIsFindingMatch] = useState(false);
	const [isConnected, setIsConnected] = useState(socket.connected);
	const isVerified = user.emailVerified;

	let navigate = useNavigate();

	let timer = useTimer({
		expiryTimestamp: getEndTime(),
		onExpire: () => {
			handleCancelRequest();
			showTimeoutToast();
		},
		autoStart: false,
	});

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
			socket.connect();
		});

		socket.on("room-number", (roomNumber) => {
			hideFindingMatchModal();
			showMatchFoundToast();
			navigate("/matchroom", { state: roomNumber });
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("room-number");
		};
	}, []);

	const refreshUserInfo = () => {
		const promise = getUser(user.uid);
		promise.then((res) => {
			storeUserData(idToken, refreshToken, res.data);
		})
	}

	const handleRequestMatch = (difficulty) => {
		showFindingMatchModal();

		sendLevel(difficulty);
	};

	const handleCancelRequest = () => {
		hideFindingMatchModal();

		// TODO: send cancellation request to backend
	};

	const showFindingMatchModal = () => {
		setIsFindingMatch(true);
		startTimer(timer);
	};

	const hideFindingMatchModal = () => {
		setIsFindingMatch(false);
		stopTimer(timer);
	};

	const timeoutToast = useToast();
	const showTimeoutToast = () =>
		timeoutToast({
			title: "No match found.",
			description: "Seems like no one else is here. Try again later?",
			status: "warning",
			duration: 3000,
			isClosable: true,
		});

	const matchFoundToast = useToast();
	const showMatchFoundToast = () =>
		matchFoundToast({
			title: "Found a buddy for you!",
			description: "Have fun!",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const hasOngoingRequest = timer.isRunning;

	return (
		<Flex
			w="100%"
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<NavBar />

			<HStack bg="gray.600" p={3} borderRadius={10} m={5} minHeight="100px">
				{!isVerified ? (
					<VStack
						divider={<StackDivider borderColor='white.100' />}
						spacing={2}>
						<HStack>
							<Heading as="h5" size="md" color="white">
								Email account not verified
							</Heading>
							<WarningTwoIcon color="red.200" />
						</HStack>
						<HStack
							spacing={2}>
							<Text fontSize="14px">Please verify your email before refreshing</Text>
							<Button
								variant="solid"
								border='2px'
  								borderColor='green.300'
								width="60px"
								height="35px"
								fontSize="14px"
								onClick={refreshUserInfo}>
									Refresh
							</Button>
						</HStack>
					</VStack>
				) : (isConnected ? (
					<>
						<Heading as="h5" size="md" color="white">
							Connected to matching service
						</Heading>
						<CheckCircleIcon color="green.300" />
					</>
				) : (
					<>
						<Heading as="h5" size="md" color="white">
							No connection to matching service
						</Heading>
						<WarningTwoIcon color="orange.300" />
					</>
				))}
			</HStack>

			<MatchContext.Provider
				value={{
					requestMatch: handleRequestMatch,
					cancelRequest: handleCancelRequest,
					hasConnectionToMatchingService: isConnected,
					hasEmailVerified: isVerified,
					hasOngoingRequest: hasOngoingRequest,
				}}
			>
				<MatchSelector />

				{isFindingMatch && (
					<Modal
						closeOnOverlayClick={false}
						isOpen={isFindingMatch}
						motionPreset="slideInBottom"
						isCentered
					>
						<ModalOverlay>
							<FindingMatchModal countDown={timer.seconds} />
						</ModalOverlay>
					</Modal>
				)}
			</MatchContext.Provider>
		</Flex>
	);
}

// helper functions

const getEndTime = () => {
	let time = new Date();
	time.setSeconds(time.getSeconds() + DEFAULT_TIMEOUT_LIMIT);

	return time;
};

const startTimer = (timer) => {
	timer.start();
};

const stopTimer = (timer) => {
	timer.pause();
	timer.restart(getEndTime(), false);
};

export default MatchSelectionPage;
