"use client";
import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import React, { ReactNode, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queries";
import { deleteCookie, getUser } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function PageLayout({
  user,
  children,
}: {
  children: ReactNode;
  user: any;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("blog_acccess_token");
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <HStack
          pos="fixed"
          top={0}
          zIndex="50"
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

          {!user.id && (
            <HStack spacing={8}>
              <Link href="/login">Login</Link>
              <Link fontWeight={500} color="primary.500" href="/register">
                Register
              </Link>
            </HStack>
          )}

          {user.id && (
            <HStack spacing={8}>
              <Button onClick={handleLogout} variant="link">
                Sign out
              </Button>
              <Link fontWeight={500} color="primary.500" href="/profile">
                Profile
              </Link>
            </HStack>
          )}
        </HStack>
        <Box>{children}</Box>
      </Box>
    </QueryClientProvider>
  );
}
