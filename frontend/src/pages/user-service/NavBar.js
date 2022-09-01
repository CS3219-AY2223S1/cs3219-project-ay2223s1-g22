import { useState } from "react";
import { HStack, Heading, Avatar } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function NavBar() {
    const [darkMode, setDarkMode] = useState(true);
    const handleDarkModeClick = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#f2f2f2" : "#3e3e5b";
    }

    return (
    <HStack w="100%" px="3%" py="1%" justifyContent="space-between">
        <Heading color="#66ddaa">PeerPrep</Heading>
        <HStack>
        <Button
            leftIcon={darkMode ? <MoonIcon/> : <SunIcon/> } 
            variant='link'
            onClick={handleDarkModeClick} />
        <Avatar name="Sasuke Uchiha" src="https://bit.ly/broken-link" />
        </HStack>
    </HStack>
    );
}

export default NavBar;
