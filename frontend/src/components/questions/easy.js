import { useState } from "react";
import { Flex, Heading, Spacer, Container, Text } from "@chakra-ui/layout";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
  } from '@chakra-ui/react'

const problem_title = [
	"Reverse Linked List",
	"Two Sum",
	"Palindrome Number"
]

const problem_desc = [
	"Given the head of a singly linked list, reverse the list, and return the reversed list.",
	`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. 
	You can return the answer in any order.`,
	"Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward. For example, 121 is a palindrome while 123 is not."
];
const example_input= [
	["head = [1,2,3,4,5]", "head = [1,2]", "head = []"],
	["nums = [2,7,11,15], target = 9", "nums = [3,2,4], target = 6", "nums = [3,3], target = 6"],
	["x = 121", "x = -121", "x = 10"]
]
const example_output = [
	["[5,4,3,2,1]", "[2,1]", "[]"],
	["[0,1]", "[1,2]", "[0,1]"],
	["true", "false", "false"]
]


const Easy = () => {
	const [problemNum, setProblemNum] = useState(1);

	return (
		<Flex flexDir='column' height='100%' width='100%' pb='1' overflowY='scroll'>
			<Heading size='lg' as='u'>
				{problem_title[problemNum]}
			</Heading>
			<Text>
				{problem_desc[problemNum]}	
			</Text>
			<Spacer flexDir='column' />
			<TableContainer border='2px' borderColor='gray.500' borderRadius='10'>
				<Table variant='simple' size='md'>
					<Thead>
						<Tr>
							<Th>Input</Th>
							<Th>Output</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Td>
							{example_input[problemNum].map(line =>
								<Tr>{line}</Tr>
							)}
						</Td>
						<Td>
							{example_output[problemNum].map(line => 
								<Tr>{line}</Tr>
							)}
						</Td>
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	)
}

export default Easy;