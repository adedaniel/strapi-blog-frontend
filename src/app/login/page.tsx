"use client";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authlessFetch } from "@/utils/api";
import { cookies } from "next/headers";
import { saveCookie } from "../actions";

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    identifier: "",
    password: "",
  });
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: any) => {
      return authlessFetch.post(`/auth/local/`, payload);
    },
    onSuccess: ({ data }: any) => {
      localStorage.setItem("blog_acccess_token", data.jwt);
      saveCookie("token", data.jwt);
      router.push("/");
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    mutate(loginDetails);
  };

  return (
    <Box>
      <Center w="full" minH="100VH">
        <Box
          onSubmit={handleSubmit}
          as="form"
          w={464}
          rounded={16}
          py={10}
          px={10}
          border="1px solid"
          borderColor="gray.500"
          bg="blackAlpha.800"
        >
          <Heading>Login</Heading>

          <Box mt={6}>
            <Text>Email</Text>
            <Input
              placeholder="Please enter your organisation email"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="identifier"
              value={loginDetails.identifier}
              type="email"
            />
          </Box>

          <Box mt={4}>
            <Text>Password</Text>
            <Input
              placeholder="Please enter your password"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="password"
              value={loginDetails.password}
              type="password"
            />
          </Box>

          <Button
            isLoading={isPending}
            loadingText="Loading..."
            mt={5}
            colorScheme="primary"
            w="full"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </Center>
    </Box>
  );
}
