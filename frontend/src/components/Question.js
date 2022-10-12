import React from "react";
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

const Question = ({question}) => {
  return (
    <Flex
      h="100%"
      p="2"
      backgroundColor="whiteAlpha.100"
      borderRadius="10"
      overflowY="scroll"
    >
      <Container>
        {console.info("checking question", {question})}
        <Heading size='lg' as='u'>
          {question.title}
        </Heading>
        <Text>
          {question.description}
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
                {question.input.map(line =>
                  <Tr>{line}</Tr>
                  )}
              </Td>
              <Td>
                {question.output.map(line =>
                  <Tr>{line}</Tr>
                  )}
              </Td>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Flex>
  );
};

export default Question;
