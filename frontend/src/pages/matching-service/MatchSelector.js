import { useContext } from "react";
import { VStack, HStack, Stack, Button, Heading, Text } from "@chakra-ui/react";

import { MatchContext } from "./MatchContext";

function MatchSelector() {
	const { requestMatch, hasOngoingRequest, hasConnectionToMatchingService, hasEmailVerified } =
		useContext(MatchContext);

	const isDisabled = !hasEmailVerified || hasOngoingRequest || !hasConnectionToMatchingService;

	return (
		<VStack
			bg="gray.600"
			p="5"
			borderRadius="15"
			mt="3%"
			minWidth="400px"
			minHeight="200px"
			width="480px"
			justifyContent="center"
			spacing="5%">
			<Stack w="100%" justifyContent="center" alignItems="center" direction="column">
				<Heading as="h4" size="lg" color='white'>
					Start a match!
				</Heading>
				<Text fontSize="15px" color='whiteAlpha.600'>
					Select your difficulty below
				</Text>
			</Stack>
			<HStack w="100%" spacing="10%" justifyContent="center">
				<Button
					colorScheme="green"
					disabled={isDisabled}
					onClick={() => requestMatch("easy")}
					color='black'
					fontSize="20px"
					height="50px"
				>
					Easy
				</Button>

				<Button
					colorScheme="yellow"
					disabled={isDisabled}
					onClick={() => requestMatch("medium")}
					color='black'
					fontSize="20px"
					height="50px"
				>
					Medium
				</Button>

				<Button
					colorScheme="red"
					disabled={isDisabled}
					onClick={() => requestMatch("hard")}
					color='black'
					fontSize="20px"
					height="50px"
				>
					Hard
				</Button>
			</HStack>
		</VStack>
	);
}

export default MatchSelector;
