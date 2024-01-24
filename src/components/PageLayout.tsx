"use client";
import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import React, { ReactNode } from "react";
import { toastError } from "@/utils/helpers";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queries";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <HStack
          pos="fixed"
          top={0}
          as="header"
          py={5}
          w="full"
          bg="gray.900"
          px="5%"
          shadow="lg"
          justify="space-between"
        >
          <Heading as={NextLink} href="/">
            Blog
          </Heading>

          <HStack spacing={8}>
            <Link href="/login">Login</Link>
            <Button onClick={() => toastError()} variant="link">
              Sign out
            </Button>
            <Link fontWeight={500} color="primary.500" href="/register">
              Register
            </Link>
            <Link fontWeight={500} color="primary.500" href="/profile">
              Profile
            </Link>
          </HStack>
        </HStack>
        <Box pt={10}>{children}</Box>
      </Box>
    </QueryClientProvider>
  );
}
