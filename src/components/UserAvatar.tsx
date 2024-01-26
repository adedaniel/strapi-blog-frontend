"use client";

import { updateUserDetails } from "@/app/actions";
import { toastError } from "@/utils/helpers";
import {
  Avatar,
  AvatarBadge,
  Center,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "sonner";

export default function UserAvatar({ user }: any) {
  const sendImageAndSave = async (formData: FormData) => {
    return await new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`/api/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        console.log(data);

        const response = await updateUserDetails(user.id, {
          avatar: data.secure_url,
        });

        if (!response.id) reject(response.error?.message);

        resolve(response);
      } catch (error: any) {
        reject(error?.response?.data?.error);
      }
    });
  };

  const handleUploadImage = async ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    const imageFile = target.files?.[0];
    if (!imageFile) {
      return;
    }

    const imageSizeInMB = imageFile.size / 1024 / 1024;
    if (imageSizeInMB > 5) {
      toastError(null, null, "Please upload an image that is less than 5MB");
      return;
    }

    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("inputFile", imageFile);

    // await sendImageAndSave(formData);

    toast.promise(sendImageAndSave(formData), {
      loading: "Uploading...",
      success: "Avatar uploaded successfully!",
      error: (error) => {
        console.log(error);
        return `Unable to upload avatar: ${error}`;
      },
    });

    // sendImageforUpload({ file: imageFile });
    // setUserDetails((prev) => ({ ...prev, file: imageFile }));
    // toast.success("Avatar uploaded successfully!");
    target.value = "";
  };

  const removeFile = async () => {
    toast.promise(
      async () => {
        return await new Promise(async (resolve, reject) => {
          const response = await updateUserDetails(user.id, {
            avatar: null,
          });

          if (!response.id) reject(response.error?.message);

          resolve(response);
        });
      },
      {
        loading: "Removing...",
        success: "Avatar removed!",
        error: (error) => {
          console.log(error);
          return `Unable to removed avatar: ${error}`;
        },
      }
    );
  };

  return (
    <HStack justify="center">
      <Avatar
        size="xl"
        pos="relative"
        name={user.name}
        src={user.avatar}
        border="4px solid"
        borderColor="gray.200 !important"
      >
        <Center
          pos="absolute"
          w="full"
          rounded="full"
          opacity={0}
          transition="0.3s all"
          cursor="pointer"
          _hover={{ opacity: 0.6 }}
          h="full"
          bg="black"
          fontSize="2xl"
        >
          <Center boxSize="full" pos="relative">
            <Input
              as="input"
              zIndex={5}
              rounded="full"
              opacity={0}
              w="full"
              h="full"
              pos="absolute"
              top={0}
              cursor="pointer"
              type="file"
              onChange={handleUploadImage}
              accept="image/png,image/jpeg,image/jpg"
            />
            <Text fontSize="xs" color="white">
              Change
            </Text>
          </Center>
        </Center>
        {user.avatar && (
          <AvatarBadge
            cursor="pointer"
            as={Center}
            boxSize="1em"
            onClick={removeFile}
            borderWidth={4}
            bg="red.600"
          >
            <Text fontSize="xs" color="white">
              X
            </Text>
          </AvatarBadge>
        )}
      </Avatar>
    </HStack>
  );
}
