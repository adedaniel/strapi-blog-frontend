import { Box } from "@chakra-ui/react";
import React from "react";
import { getUser } from "../actions";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: any) {
  const user = await getUser();

  if (!user.id) redirect("/login");

  return <Box>{children}</Box>;
}
