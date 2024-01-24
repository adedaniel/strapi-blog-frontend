import { fetcher } from "@/utils/helpers";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default async function Home({ searchParams }: any) {
  const blogPosts = await fetcher("/blogs", null, {
    "pagination[page]": searchParams.page || 1,
    populate: "comments,author",
  });

  return (
    <Box px="5%" py={6}>
      <Stack spacing={5} maxW="3xl" mt={10}>
        {blogPosts?.data.map(({ id, attributes, slug }: any) => (
          <Box key={id}>
            <Link href={`/${attributes.slug}`}>
              <Heading _hover={{ textDecoration: "underline" }} fontSize="xl">
                {attributes.title}
              </Heading>
            </Link>
            <Text fontSize="sm" color="gray.500" fontStyle="italic">
              by <b>{attributes.author.data.attributes.name}</b> on{" "}
              {new Date(attributes.createdAt).toUTCString()}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
