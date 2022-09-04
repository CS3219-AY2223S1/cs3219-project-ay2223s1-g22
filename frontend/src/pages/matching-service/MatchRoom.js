import { Flex } from "@chakra-ui/react";
import NavBar from "../user-service/NavBar";
import Chat from "../chat";
 
const MatchRoomPage = () => {
    return (
        <Flex direction='column'>
            <NavBar/>
            <Chat/>
        </Flex>
    )
}

export default MatchRoomPage;