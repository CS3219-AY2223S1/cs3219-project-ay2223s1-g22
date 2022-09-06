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
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();

    return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
        <Heading color="#66ddaa">PeerPrep</Heading>
        <HStack>
            <Button variant='link' onClick={() => toggleColorMode()}>
                { colorMode === "dark" ? <SunIcon color='orange.200'/> : <MoonIcon color='blue.800'/> }
            </Button>
            <Popover>
                <PopoverTrigger>
                    <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
                </PopoverTrigger>
                <PopoverContent width='30'>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Button colorScheme='teal'>Logout</Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </HStack>
    </HStack>
    );
}

export default NavBar;
