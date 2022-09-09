import React from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex w="100%">
      <Avatar marginLeft='1' marginTop='1' size="sm" />
      <Flex flexDirection="column" mx="3" justify="center">
        <Text fontSize="sm" fontWeight="bold">
          <p>{"<Insert Name Here>"}</p>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
