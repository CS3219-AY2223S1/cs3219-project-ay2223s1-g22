import { useState, useEffect, useContext } from "react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import MatchSelector from "./MatchSelector";
import FindingMatchModal from "./FindingMatchModal";
import { MatchContext } from "./MatchContext";
import { SocketContext } from "./SocketContext";

const DEFAULT_TIMEOUT_LIMIT = 30; // cancel search after 30 seconds

function MatchSelectionPage() {
  const { socket } = useContext(SocketContext);

  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomNumber, setRoomNumber] = useState(null);

  let navigate = useNavigate();

  let timer = useTimer({
    expiryTimestamp: getEndTime(),
    onExpire: () => handleCancelRequest(),
    autoStart: false,
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room-number", (roomNumber) => {
      setRoomNumber(roomNumber);
      hideFindingMatchModal();
      navigate("/match");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room-number");
    };
  }, []);

  const handleRequestMatch = (difficulty) => {
    showFindingMatchModal();

    // TODO: send match request to backend
    sendLevel(difficulty);
  };

  const handleCancelRequest = () => {
    hideFindingMatchModal();

    // TODO: send cancellation request to backend
  };

  const sendLevel = (difficulty) => {
    socket.emit("level", difficulty);
  };

  const showFindingMatchModal = () => {
    setIsFindingMatch(true);
    startTimer(timer);
  };

  const hideFindingMatchModal = () => {
    setIsFindingMatch(false);
    stopTimer(timer);
  };

  const hasOngoingRequest = timer.isRunning;
  const hasBeenMatched = roomNumber !== null;

  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <NavBar />

      <MatchContext.Provider
        value={{
          requestMatch: handleRequestMatch,
          cancelRequest: handleCancelRequest,
          hasOngoingRequest: hasOngoingRequest,
          hasBeenMatched: hasBeenMatched,
        }}
      >
        <MatchSelector />

        {isFindingMatch && <FindingMatchModal countDown={timer.seconds} />}

        {roomNumber && <Text>{roomNumber}</Text>}
      </MatchContext.Provider>

      <Text>{String(isConnected)}</Text>
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
