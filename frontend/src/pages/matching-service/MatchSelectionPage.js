import { useState, useEffect, useContext, useRef } from "react";
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
  IconButton,
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
  const { getSocket, sendUserId } = useContext(SocketContext);
  const { user, idToken, refreshToken, storeUserData } =
    useContext(UserContext);
  const socketRef = useRef(null);
  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyConnected, setIsAlreadyConnected] = useState(false);
  const [userName, setUserName] = useState(user["email"].split("@")[0]);
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

  // useEffect(() => {
  //   const socket = getSocket(idToken, user.uid);
  //   socketRef.current = socket;
  // }, []);

  useEffect(() => {
    console.log(`socket creation with user id : ${user["uid"]}`)
    const userId = user["uid"];
    const socket = getSocket(idToken, userId);
    socketRef.current = socket;

    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on("connect", () => {
      console.log(`emitting user-id event, sending ${user["uid"]}`);
      sendUserId(user["uid"], userName);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      socket.connect();
    });

    socket.on("room-number", (roomNumber, question, opponent) => {
      const opponentUid = opponent.filter(uuid => uuid !== userId).toString();
      console.log(`creating room with opponent ${opponentUid}`);
      hideFindingMatchModal();
      showMatchFoundToast();
      navigate("/matchroom",
        { state: {
            roomNumber,
            question,
            opponentUid
          }
        }
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room-number");
    };
  }, [isConnected]);

  const refreshUserInfo = () => {
    setIsLoading(true);
    const promise = getUser(user.uid, idToken);
    promise.then((res) => {
      console.log(res);
      storeUserData(idToken, refreshToken, res.data);
      setIsLoading(false);
    });
  };

  const cancelQueueRequest = () => {
    console.log("emitting cancel queue event");
    socketRef.current.emit("cancel-queue");
  }

  const handleRequestMatch = (difficulty) => {
    socketRef.current.emit("level", difficulty, inQueue => {
      if (inQueue) {
        showAlreadyQueuedToast();
      } else {
        showFindingMatchModal();
      }
    })
  };

  const handleCancelRequest = () => {
    hideFindingMatchModal();
    cancelQueueRequest();
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
  const alreadyQueuedToast = useToast();
  const showAlreadyQueuedToast = () =>
    alreadyQueuedToast({
      title: "Unable to join queue.",
      description:
        "You are already queued on another window!",
      status: "error",
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

      <HStack bg="gray.600" p={3} borderRadius={10} m={5}>
        {!isVerified ? (
          <VStack
            divider={<StackDivider borderColor="white.100" />}
            spacing={2}
          >
            <HStack>
              <Heading as="h5" size="md" color="white">
                Email account not verified
              </Heading>
              <WarningTwoIcon color="red.200" />
            </HStack>
            <HStack spacing={2}>
              <Text color="white" fontSize="14px">
                Please verify your email before refreshing
              </Text>
              {isLoading ? (
                <IconButton
                  isLoading
                  variant="solid"
                  colorScheme="teal"
                  aria-label="Refresh user"
                  size="md"
                  icon={<RepeatIcon />}
                  onClick={refreshUserInfo}
                />
              ) : (
                <IconButton
                  variant="solid"
                  colorScheme="teal"
                  aria-label="Refresh user"
                  size="md"
                  icon={<RepeatIcon />}
                  onClick={refreshUserInfo}
                />
              )}
            </HStack>
          </VStack>
        ) : isConnected && !isAlreadyConnected ? (
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
        )}
      </HStack>

      <MatchContext.Provider
        value={{
          requestMatch: handleRequestMatch,
          cancelRequest: handleCancelRequest,
          hasConnectionToMatchingService: isConnected && !isAlreadyConnected,
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
