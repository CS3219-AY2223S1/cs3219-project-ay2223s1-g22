import {
  HStack,
  Heading,
  Avatar,
  useColorMode,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import UserContext from "../../UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import LeaveRoomOverlay from "../matching-service/LeaveRoomOverlay";

function NavBar() {
    const location = useLocation()
    const { colorMode, toggleColorMode } = useColorMode();

    const { idToken, clearUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        clearUserData();
        navigate("/");
    };

    const toggleOverlay = (e) => {
        setIsOpen(e);
    }

    return (
        <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
        <LeaveRoomOverlay isVisible={isOpen} toggleOverlay={toggleOverlay} />
        <Heading color="#66ddaa">PeerPrep</Heading>
        {location.pathname === "/matchroom" && <Heading>XX:XX</Heading>}
        <HStack>
            {location.pathname === "/matchroom" && 
                <Button colorScheme="red" onClick={() => {
                    toggleOverlay(true);
                    }}>
                Leave Match
                </Button>
            }
            <Button variant="link" onClick={() => toggleColorMode()}>
            {colorMode === "dark" ? (
                <SunIcon color="orange.200" />
            ) : (
                <MoonIcon color="blue.800" />
            )}
            </Button>
            <Popover>
            <PopoverTrigger>
                <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
            </PopoverTrigger>
            <PopoverContent width="30">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                {idToken ? (
                    <Button colorScheme="teal" onClick={handleLogout}>
                    Logout
                    </Button>
                ) : (
                    <Button colorScheme="teal" onClick={handleLogin}>
                    Login
                    </Button>
                )}
                </PopoverBody>
            </PopoverContent>
            </Popover>
        </HStack>
        </HStack>
    );
}

export default NavBar;
