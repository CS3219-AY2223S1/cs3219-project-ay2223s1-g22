import { useContext } from "react";
import {
  Spinner,
  Heading,
  VStack,
  HStack,
  Button,
  ModalBody,
  ModalContent,
  Box,
} from "@chakra-ui/react";

import { MatchContext } from "./MatchContext";

function FindingMatchModal({ countDown }) {
  const { cancelRequest } = useContext(MatchContext);

  return (
    <ModalContent p={10} borderRadius={20}>
      <ModalBody>
        <HStack alignContent="center" spacing={10}>
          <Box>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>

          <VStack spacing={5}>
            <Heading as="h4" size="md">
              Hang on while we find a peer prep buddy for you...
            </Heading>

            <HStack justify="space-between" w="100%">
              <Heading>{countDown}</Heading>
              <Button colorScheme="red" onClick={cancelRequest}>
                Stop Search
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </ModalBody>
    </ModalContent>
  );
}

export default FindingMatchModal;
