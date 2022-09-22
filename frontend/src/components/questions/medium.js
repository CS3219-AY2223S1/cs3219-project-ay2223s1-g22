import { useState } from "react";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
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
	"Add Two Numbers",
	"Minimum Add to Make Parentheses Valid",
	"Find All Duplicates in an Array"
]

const problem_desc = [
	`You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
	You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,

	`A parentheses string is valid if and only if:
	It is the empty string,
	It can be written as AB (A concatenated with B), where A and B are valid strings, or
	It can be written as (A), where A is a valid string.
	You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.
	For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
	Return the minimum number of moves required to make s valid.`,

	`Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice. 
	You must write an algorithm that runs in O(n) time and uses only constant extra space.`
];
const example_input= [
	["l1 = [2,4,3], l2 = [5,6,4]", "l1 = [0], l2 = [0]", "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]"],
	[`s = "())"`, `s = "((("`],
	["nums = [4,3,2,7,8,2,3,1]", "nums = [1,1,2]", "nums = [1]"]
]
const example_output = [
	["[7,0,8]", "[0]", "[8,9,9,9,0,0,0,1]"],
	["1", "3"],
	["[2,3]", "[1]", "[]"]
]


const Medium = () => {
	const [problemNum, setProblemNum] = useState(2);

	return (
		<Flex flexDir='column' height='100%' width='100%' overflowY='scroll'>
			<Heading size='md' as='u'>
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

export default Medium;