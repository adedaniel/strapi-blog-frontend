import { fetcher } from "@/utils/helpers";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { getUser } from "../actions";
import AddComment from "@/components/AddComment";

// export const dynamic = "force-dynamic";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetcher("/blogs");

  return posts.data.map(({ attributes }: any) => ({
    slug: attributes.slug,
  }));
}

export default async function EachPost({ params }: any) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const user = await getUser();
  const post = await fetcher(`/slugify/slugs/blog/${params.slug}`, null, {
    populate: "author",
  });

  if (post?.error?.status === 404) notFound();
  if (!post?.data?.id) throw new Error("Unable to fetch post data");

  return (
    <Box pt={20} px="5%" pb={10}>
      <HStack pt={10}>
        <Heading>{post.data.attributes.title}</Heading>
      </HStack>

      <Stack spacing={5} maxW="3xl" mt={10}>
        <Box key={post.data.id}>
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            by <b>{post.data.attributes.author.data.attributes.name}</b> on{" "}
            {new Date(post.data.attributes.createdAt).toUTCString()}
          </Text>
          <Box mt={6} fontSize="md">
            <BlocksRenderer content={post.data.attributes.body} />
          </Box>
        </Box>
      </Stack>

      {user.id && (
        <AddComment user={user} slug={params.slug} postId={post.data.id} />
      )}
    </Box>
  );
}
