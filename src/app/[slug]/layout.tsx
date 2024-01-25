import { Stack } from "@chakra-ui/react";
import React from "react";

export default function layout({ children, comments }: any) {
  return (
    <Stack spacing={2}>
      {children}
      {comments}
    </Stack>
  );
}
