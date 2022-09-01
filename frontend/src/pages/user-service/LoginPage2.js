import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye)
const CFaEyeSlash = chakra(FaRegEyeSlash)

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.300"
      justifyContent="center"
      alignItems="center">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center" >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">PeerPrep</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md" >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="Email Address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem" size="sm" 
                        onClick={handleShowClick}
                        variant='ghost'
                        leftIcon={showPassword? <CFaEye/> : <CFaEyeSlash/>}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack direction='row'>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    width="50%">
                        Register
                  </Button>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="50%">
                        Login
                    </Button>
              </Stack>
              
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Forgot Password?{" "}
        <Link color="teal.500" href="#">
          Click here
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
