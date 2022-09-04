import { HStack, Heading, Avatar, useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
        <Heading color="#66ddaa">PeerPrep</Heading>
        <HStack>
            <Button 
            variant='link'
            onClick={() => toggleColorMode()}>
                {colorMode === "dark" ? <SunIcon color='orange.200'/> : <MoonIcon color='blue.800'/> }
            </Button>
        <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
        </HStack>
    </HStack>
    );
}

export default NavBar;
