import { fetcher } from "@/utils/helpers";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ReactMarkdown from "react-markdown";

export default async function EachPost({ params }: any) {
  const post = await fetcher(`/slugify/slugs/blog/${params.slug}`, null, {
    populate: "comments,author",
  });

  return (
    <Box px="5%" py={6}>
      <HStack pt={10}>
        <Heading>{post.data.attributes.title}</Heading>
      </HStack>

      <Stack spacing={5} maxW="3xl" mt={10}>
        <Box key={post.data.id}>
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            by <b>{post.data.attributes.author.data.attributes.name}</b> on{" "}
            {new Date(post.data.attributes.createdAt).toUTCString()}
          </Text>
          <Box mt={6} fontSize="sm">
            <BlocksRenderer content={post.data.attributes.body} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
