import { Box, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box pt={20} px="5%" pb={10}>
      <Text textAlign="center">Loading comments...</Text>
    </Box>
  );
}
