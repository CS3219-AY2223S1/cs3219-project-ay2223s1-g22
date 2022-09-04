import { useState, useEffect, useContext } from "react";
import { Flex, Text, Modal, ModalOverlay } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

import NavBar from "../user-service/NavBar";
import MatchSelector from "./MatchSelector";
import FindingMatchModal from "./FindingMatchModal";
import { MatchContext } from "./MatchContext";
import { SocketContext } from "./SocketContext";

const DEFAULT_TIMEOUT_LIMIT = 30; // cancel search after 30 seconds

function MatchSelectionPage() {
  const { socket, sendLevel } = useContext(SocketContext);

  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);

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
      hideFindingMatchModal();
      navigate("/match", { state: roomNumber });
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

  const showFindingMatchModal = () => {
    setIsFindingMatch(true);
    startTimer(timer);
  };

  const hideFindingMatchModal = () => {
    setIsFindingMatch(false);
    stopTimer(timer);
  };

  const hasOngoingRequest = timer.isRunning;

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
