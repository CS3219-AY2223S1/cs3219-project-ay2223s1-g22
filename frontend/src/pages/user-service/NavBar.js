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
import { useContext } from "react";
import { logoutUser } from "../../controller/user-controller";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  // const { token, user, storeUserData, clearUserData }
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    user.clearUserData();
    navigate("/");
  };

  console.log(user.token);

  return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
      <Heading color="#66ddaa">PeerPrep</Heading>
      <HStack>
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
              {user.token ? (
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
