import React, { useContext, useEffect } from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";

import UserContext from "../../UserContext";

const Header = ({opponentName}) => {
  return (
    <Flex w="100%">
      <Avatar marginLeft="1" marginTop="1" size="sm" />
      <Flex flexDirection="column" mx="3" justify="center">
        <Text fontSize="sm" fontWeight="bold">
          <p>{opponentName}</p>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
