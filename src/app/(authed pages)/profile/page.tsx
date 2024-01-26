import { getUser } from "@/app/actions";
import UserAvatar from "@/components/UserAvatar";
import { Box, HStack, Heading, Text } from "@chakra-ui/react";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <Box px="5%" pt={28} pb={10}>
      <Heading>
        Welcome Back,{" "}
        <Box as="span" color="primary.500">
          {user.name}
        </Box>
        !
      </Heading>

      <Box mt={16}>
        <HStack>
          <Text>
            <b>Email:</b> {user.email}
          </Text>
        </HStack>
        <HStack>
          <Text>
            <b>Username:</b> {user.username}
          </Text>
        </HStack>
        <HStack>
          <Text>
            <b>Name:</b> {user.name}
          </Text>
        </HStack>

        <HStack spacing={10} mt={10} align="center">
          <Text>
            <b>Avatar:</b>
          </Text>

          <UserAvatar user={user} />
        </HStack>
      </Box>
    </Box>
  );
}
