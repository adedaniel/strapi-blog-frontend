import { getUser } from "@/app/actions";
import AddComment from "@/components/AddComment";
import { fetcher } from "@/utils/helpers";
import {
  Box,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
  Textarea,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default async function CommentSection({ params }: any) {
  const comments = await fetcher(
    `/comments`,
    { next: { tags: ["comment", params.slug], revalidate: 100 } },
    {
      populate: "author",
      "filters[blog][slug][$eq]": params.slug,
    }
  );
  const user = await getUser();

  if (!comments?.data) throw new Error("Unable to fetch post data");

  return (
    <Box px="5%" pb={10}>
      <Heading fontSize="2xl">Comments</Heading>

      <Stack mt={3} spacing={4}>
        {comments?.data?.map(({ id, attributes }: any) => (
          <Box key={id}>
            <Text fontSize="sm" color="gray.400">
              <b>{attributes.author?.data?.attributes.name}</b> on{" "}
              {new Date(attributes.createdAt).toUTCString()}
            </Text>
            <Text fontSize="md">{attributes.text}</Text>
          </Box>
        ))}
      </Stack>

      {!user.id && (
        <Text mt={8} fontWeight={600}>
          <ChakraLink color="primary.300" as={Link} href="/register">
            Create an account
          </ChakraLink>{" "}
          or{" "}
          <ChakraLink color="primary.300" as={Link} href="/login">
            Log in
          </ChakraLink>{" "}
          to write a comment
        </Text>
      )}
    </Box>
  );
}
