"use client";

import { refetch, sendComment } from "@/app/actions";
import { fetcher, toastError } from "@/utils/helpers";
import { Box, Button, HStack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddComment({ user, postId, slug }: any) {
  const [text, setText] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = await sendComment({
      data: { text, blog: postId, author: user.id, stars: 5 },
    });

    if (!data?.data?.id) {
      toastError("Unable to add comment");
      return;
    }

    await refetch(slug);

    setText("");
    toast.success("Comment added");
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={10} maxW="xl">
      <Text>
        <b>You</b> . <i>Write a comment</i>
      </Text>
      <Textarea
        isRequired
        value={text}
        onChange={({ target }) => setText(target.value)}
        name="text"
        minH={28}
        mt={3}
        placeholder="Write a comment"
      />
      <HStack mt={3} justify="flex-end">
        <Button type="submit" w="2xs" variant="outline" colorScheme="primary">
          Submit
        </Button>
      </HStack>
    </Box>
  );
}
