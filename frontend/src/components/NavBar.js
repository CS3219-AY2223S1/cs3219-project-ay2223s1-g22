import { HStack, Heading, Avatar } from "@chakra-ui/react";

function NavBar() {
  return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
      <Heading>PeerPrep</Heading>
      <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
    </HStack>
  );
}

export default NavBar;
