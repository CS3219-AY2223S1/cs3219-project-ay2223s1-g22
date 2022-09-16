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
  PopoverBody,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useContext, useState } from "react";
import { logoutUser } from "../../controller/user-controller";
import UserContext from "../../UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import LeaveRoomOverlay from "../matching-service/LeaveRoomOverlay";

function NavBar({}) {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  // const { token, user, storeUserData, clearUserData }
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    user.clearUserData();
    navigate("/");
  };

  const toggleOverlay = (e) => {
    setIsOpen(e);
  };

  /* ======== Helper Functions ================================================================================*/
  function getUsernameFromEmail(user) {
    console.log(user);
    if (!user || !user.email) {
      return "NO USERNAME FOUND";
    }

    const email = user.email;
    const username = email.split("@")[0];

    console.log(username);

    return username;
  }
  return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
      <LeaveRoomOverlay isVisible={isOpen} toggleOverlay={toggleOverlay} />
      <Heading color="#66ddaa">PeerPrep</Heading>
      <HStack>
        {location.pathname === "/matchroom" && (
          <Button
            colorScheme="red"
            onClick={() => {
              toggleOverlay(true);
            }}
          >
            Leave Match
          </Button>
        )}
        <Button variant="link" onClick={() => toggleColorMode()}>
          {colorMode === "dark" ? (
            <SunIcon color="orange.200" />
          ) : (
            <MoonIcon color="blue.800" />
          )}
        </Button>
        {token && (
          <Popover>
            <PopoverTrigger>
              <Avatar
                name={getUsernameFromEmail(user)}
                src="https://bit.ly/broken-link"
              />
            </PopoverTrigger>
            <PopoverContent width="30">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {token ? (
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
        )}
      </HStack>
    </HStack>
  );
}

export default NavBar;
