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
	"Median of Two Sorted Arrays",
	"Longest Valid Parentheses",
	"Best Time to Buy and Sell Stock III"
]

const problem_desc = [
	`Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
	The overall run time complexity should be O(log (m+n)).`,

	`Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.`,

	`You are given an array prices where prices[i] is the price of a given stock on the ith day.
	Find the maximum profit you can achieve. You may complete at most two transactions.
	Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).`
];
const example_input= [
	["nums1 = [1,3], nums2 = [2]", "nums1 = [1,2], nums2 = [3,4]"],
	[`s = "(()"`, `s = ")()())"`, `s = ""`],
	["prices = [3,3,5,0,0,3,1,4]", "prices = [1,2,3,4,5]", "prices = [7,6,4,3,1]"]
]
const example_output = [
	["2.00000", "[0]", "2.50000"],
	["2", "4", "0"],
	["6", "4", "0"]
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