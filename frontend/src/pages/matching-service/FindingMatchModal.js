import { Spinner, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function FindingMatchModal() {
  // Countdown timer in seconds
  let [countDown, setCountDown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <HStack
      alignContent="center"
      bg="yellow.200"
      p={10}
      borderRadius={20}
      spacing={10}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />

      <VStack spacing={5}>
        <Heading as="h4" size="md">
          Hang on while we find a peer prep buddy for you...
        </Heading>

        <HStack justify="space-between" w="100%">
          <Heading>{countDown}</Heading>
          <Button colorScheme="red">Stop Search</Button>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default FindingMatchModal;
