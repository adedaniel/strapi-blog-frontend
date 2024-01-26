"use server";

import { fetcher } from "@/utils/helpers";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const refetch = async (tag?: string) => {
  "use server";

  if (!tag) return;
  revalidateTag(tag);
};

export const saveCookie = async (name: string, value: string) => {
  "use server";

  cookies().set(name, value, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
};

export const deleteCookie = async (name: string) => {
  "use server";
  cookies().delete(name);
};

export const getUser = () => {
  "use server";

  const token = cookies().get("token")?.value;

  return fetcher("/users/me", {
    next: { revalidate: 5000 },
    // cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendComment = (payload: any) => {
  "use server";

  const token = cookies().get("token")?.value;

  return fetcher("/comments", {
    // next: { revalidate: 5000 },
    // cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const updateUserDetails = async (userId: number, payload: any) => {
  "use server";

  const token = cookies().get("token")?.value;

  const response = fetcher(`/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  revalidatePath("/profile");

  return response;
};
