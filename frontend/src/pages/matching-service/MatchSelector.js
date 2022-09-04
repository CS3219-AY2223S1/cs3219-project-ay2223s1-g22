import { useContext } from "react";
import { VStack, HStack, Button, Heading } from "@chakra-ui/react";

import { MatchContext } from "./MatchContext";

function MatchSelector() {
  const { requestMatch, hasOngoingRequest, hasConnectionToMatchingService } =
    useContext(MatchContext);

  const isDisabled = hasOngoingRequest || !hasConnectionToMatchingService;

  return (
    <VStack bg="gray.600" p="5" borderRadius="15">
      <HStack w="100%" align="left">
        <Heading as="h4" size="md">
          Start a match!
        </Heading>
      </HStack>
      <HStack mt="20%" align="center">
        <Button
          colorScheme="green"
          disabled={isDisabled}
          onClick={() => requestMatch("easy")}
        >
          Easy
        </Button>

        <Button
          colorScheme="yellow"
          disabled={isDisabled}
          onClick={() => requestMatch("medium")}
        >
          Medium
        </Button>

        <Button
          colorScheme="red"
          disabled={isDisabled}
          onClick={() => requestMatch("hard")}
        >
          Hard
        </Button>
      </HStack>
    </VStack>
  );
}

export default MatchSelector;
