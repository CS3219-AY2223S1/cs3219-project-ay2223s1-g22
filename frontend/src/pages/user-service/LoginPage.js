import { useState, useCallback } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash, FaComments } from "react-icons/fa";
import NavBar from "../user-service/NavBar";
import {useNavigate} from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye)
const CFaEyeSlash = chakra(FaRegEyeSlash)

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const handleSignUpClick = useCallback(() => navigate('/signup', {replace: true}), [navigate]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      justifyContent="center"
      alignItems="center"
      >
      <NavBar/>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center" >
        <FaComments color="#66ddaa" size='80' />
        <Box 
            minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.100"
              boxShadow='lg' 
              borderRadius='lg'>
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
                        variant='link'
                        leftIcon={showPassword? <CFaEye/> : <CFaEyeSlash/>}/>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack direction='row'>
                  <Button
                    borderRadius={5}
                    type="submit"
                    variant="solid"
                    width="50%"
                    shadow='lg'
                    onClick={handleSignUpClick} >
                        Sign up
                  </Button>
                  <Button
                    borderRadius={5}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="50%"
                    shadow='lg'>
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

export default LoginPage;
