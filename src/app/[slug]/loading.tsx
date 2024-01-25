import { Box, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box pt={20} px="5%" pb={10}>
      <Skeleton h={10} mt={10} />
      <Skeleton h={4} mt={10} />
      <Skeleton h={4} mt={6} />
    </Box>
  );
}
