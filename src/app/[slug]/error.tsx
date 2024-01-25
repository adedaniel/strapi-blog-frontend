"use client";

import {
  Box,
  Center,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound({ error, reset }: any) {
  console.log(error);
  return (
    <Box pt={20}>
      <Center w="full">
        <VStack spacing={4}>
          <Heading>Unable to fetch post</Heading>
          <Text textAlign="center">Something weird happened</Text>
          <ChakraLink color="primary.600" fontWeight={600} as={Link} href="/">
            Return Home
          </ChakraLink>
        </VStack>
      </Center>
    </Box>
  );
}
