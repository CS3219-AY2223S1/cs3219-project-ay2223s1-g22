import React from 'react'
import { Box, Stack, Input, InputGroup, InputLeftAddon, InputRightElement, Button, Text } from '@chakra-ui/react'


export default function LoginPage() {
    const [show, setShow] = React.useState(false)
    const handlePasswordButtonClick = () => setShow(!show)

	return (
        <Box bg='#606060' w='100%' p={40} color='white' align='center' >
            <Stack spacing={2} align='center' justify='center' w='50%'>
                <InputGroup>
                    {/* <InputLeftAddon children='Email' color='black' w='20%' bgColor='whiteAlpha.600' /> */}
                    <Text padding='2' paddingRight='10' >Email </Text>
                    <Input 
                        placeholder='example@gmail.com' 
                        _placeholder={{ color: 'inherit', opacity:'30%' }}
                        isRequired='true' />
                </InputGroup>
                <InputGroup>
                    {/* <InputLeftAddon children='Password' color='black' w='20%' bgColor='whiteAlpha.600' /> */}
                    <Text padding='2'>Password</Text>
                    <Input 
                        placeholder='Enter password'
                        _placeholder={{ color: 'inherit', opacity: '30%' }}
                        isRequired='true' 
                        type={show ? 'text' : 'password'} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePasswordButtonClick} color='black'>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Stack spacing='10%' direction='row' >
                    <Button colorScheme='whiteAlpha' variant='solid' size='lg'>
                        Register
                    </Button>
                    <Button colorScheme='teal' variant='solid' size='lg' >
                        Log In
                    </Button>
                </Stack>
            </Stack>
        </Box>
	)
}
