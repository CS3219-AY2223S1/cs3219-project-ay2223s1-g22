import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import Easy from "./questions/easy";
import Medium from "./questions/medium";
import Hard from "./questions/hard";

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
        {/* Solve this to get job. No solve means no job. Solve already also maybe
        no job. See how. */}
        {/* <Easy/> */}
        {/* <Medium/> */}
        <Hard/>
      </Container>
    </Flex>
  );
};

export default Question;
