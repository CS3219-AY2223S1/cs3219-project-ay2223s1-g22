import { Flex } from "@chakra-ui/react";

import NavBar from "../user-service/NavBar";
import MatchSelector from "./MatchSelector";

function MatchSelectionPage() {
  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center" >
      
      <NavBar />
      <MatchSelector />
    </Flex>
  );
}

export default MatchSelectionPage;
