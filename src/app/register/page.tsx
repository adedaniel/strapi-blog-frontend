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
import { saveCookie } from "../actions";

export default function LoginPage() {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: any) => {
      return authlessFetch.post(`/auth/local/register`, payload);
    },
    onSuccess: ({ data }: any) => {
      console.log(data);
      localStorage.setItem("blog_acccess_token", data.jwt);
      saveCookie("token", data.jwt);
      router.push("/profile");
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate(registerDetails);
  };

  return (
    <Box pt={32}>
      <Center w="full">
        <Box
          onSubmit={handleSubmit}
          as="form"
          w="full"
          maxW={464}
          rounded={16}
          py={10}
          px={10}
          border="1px solid"
          borderColor="gray.500"
          bg="blackAlpha.800"
        >
          <Heading>Create an account</Heading>

          <Box mt={6}>
            <Text>Enter your full name</Text>
            <Input
              placeholder="Please enter your full name"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="name"
              value={registerDetails.name}
            />
          </Box>

          <Box mt={5}>
            <Text>Enter Username</Text>
            <Input
              placeholder="Please enter your preferred username"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="username"
              value={registerDetails.username}
            />
          </Box>

          <Box mt={5}>
            <Text>Enter Email</Text>
            <Input
              placeholder="Please enter your organisation email"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="email"
              value={registerDetails.email}
              type="email"
            />
          </Box>

          <Box mt={5}>
            <Text>Enter Password</Text>
            <Input
              placeholder="Please enter your password"
              isRequired
              variant="outline"
              onChange={handleChange}
              name="password"
              value={registerDetails.password}
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
            Sign up
          </Button>
        </Box>
      </Center>
    </Box>
  );
}
