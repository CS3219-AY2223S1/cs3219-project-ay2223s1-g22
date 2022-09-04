import { useContext } from "react";
import { VStack, HStack, Button, Heading } from "@chakra-ui/react";

import { MatchContext } from "./MatchContext";

function MatchSelector() {
  const { requestMatch, hasOngoingRequest } = useContext(MatchContext);

  return (
    <VStack bg="gray.600" p="5" borderRadius="15">
      <HStack w="100%" align="left">
        <Heading as="h4" size="md" color="white">
          Start a match!
        </Heading>
      </HStack>
      <HStack mt="20%" align="center">
        <Button
          colorScheme="green"
          disabled={hasOngoingRequest}
          onClick={() => requestMatch("easy")}
        >
          Easy
        </Button>

        <Button
          colorScheme="yellow"
          disabled={hasOngoingRequest}
          onClick={() => requestMatch("medium")}
        >
          Medium
        </Button>

        <Button
          colorScheme="red"
          disabled={hasOngoingRequest}
          onClick={() => requestMatch("hard")}
        >
          Hard
        </Button>
      </HStack>
    </VStack>
  );
}

export default MatchSelector;
