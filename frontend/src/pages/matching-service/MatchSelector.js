import { VStack, HStack, Button, Heading } from "@chakra-ui/react";

function MatchSelector() {
  return (
    <VStack bg="gray.600" p="5" borderRadius="15">
      <HStack w="100%" align="left">
        <Heading as="h4" size="md" color="white">
          Start a match!
        </Heading>
      </HStack>
      <HStack mt="20%" align="center">
        <Button colorScheme="green">Easy</Button>

        <Button colorScheme="yellow">Medium</Button>

        <Button colorScheme="red">Hard</Button>
      </HStack>
    </VStack>
  );
}

export default MatchSelector;
