import React, { useContext, useEffect } from "react";
import { Flex, Avatar, Text } from "@chakra-ui/react";

import UserContext from "../../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  /* ======== Helper Functions ================================================================================*/
  function getUsernameFromEmail(user) {
    if (!user || !user.email) {
      return "NO USERNAME FOUND";
    }

    const email = user.email;
    const username = email.split("@")[0];

    return username;
  }

  return (
    <Flex w="100%">
      <Avatar marginLeft="1" marginTop="1" size="sm" />
      <Flex flexDirection="column" mx="3" justify="center">
        <Text fontSize="sm" fontWeight="bold">
          <p>{getUsernameFromEmail(user)}</p>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
