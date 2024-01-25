import { Box, Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box pt={20} px="5%" pb={10}>
      <Stack mt={10} w="2xl" spacing={5}>
        {Array.from(Array(10)).map((value, index) => (
          <Stack key={index}>
            <Skeleton h={6} />
            <Skeleton h={4} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
