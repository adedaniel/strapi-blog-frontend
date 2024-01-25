import {
  Box,
  Center,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box>
      <Center w="full" minH="100vh">
        <VStack spacing={4}>
          <Heading>Post Not Found</Heading>
          <Text textAlign="center">Could not find requested post.</Text>
          <ChakraLink color="primary.600" fontWeight={600} as={Link} href="/">
            Return Home
          </ChakraLink>
        </VStack>
      </Center>
    </Box>
  );
}
