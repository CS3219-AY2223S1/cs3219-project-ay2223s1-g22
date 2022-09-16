import React from "react";
import { Textarea, Flex, Container } from "@chakra-ui/react";

const Question = () => {
  return (
    <Flex
      h="100%"
      p="2"
      backgroundColor="whiteAlpha.100"
      borderRadius="10"
      overflowY="scroll"
    >
      <Container>
        Solve this to get job. No solve means no job. Solve already also maybe
        no job. See how.
      </Container>
    </Flex>
  );
};

export default Question;
