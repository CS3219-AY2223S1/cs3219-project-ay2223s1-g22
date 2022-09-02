import { Flex } from "@chakra-ui/react";

import NavBar from "../user-service/NavBar";
import MatchSelector from "./MatchSelector";
import FindingMatchModal from "./FindingMatchModal";

function MatchSelectionPage() {
  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center" >
      
      <NavBar />
      <MatchSelector />

      <FindingMatchModal />
    </Flex>
  );
}

export default MatchSelectionPage;
