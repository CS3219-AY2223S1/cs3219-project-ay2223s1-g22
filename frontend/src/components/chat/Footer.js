import React from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Spacer,
  HStack,
} from "@chakra-ui/react";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="2">
      <HStack paddingBottom="1">
        <Input
          placeholder="Type Something..."
          borderRadius="10"
          border="none"
          _focus={{
            border: "1px solid black",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />

        <Button
          bg="teal"
          color="black"
          borderRadius="10"
          _hover={{
            color: "black",
          }}
          disabled={inputMessage.trim().length <= 0}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </HStack>
    </Flex>
  );
};

export default Footer;
