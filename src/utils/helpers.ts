import theme from "@/app/theme";
import { toast } from "sonner";

export async function fetcher(url: string, options: any = {}, params = {}) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
      url +
      "?" +
      new URLSearchParams(params),
    {
      next: { revalidate: 300 },
      ...options,
    }
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  const data = await res.json();

  // if (!res.ok) {
  //   console.log(data);

  //   // This will activate the closest `error.js` Error Boundary
  //   // throw new Error("Failed to fetch data");
  //   return;
  // }

  return data;
}

export const toastError = (
  title?: string | null,
  error?: any,
  description?: string
) => {
  // Trigger Chakra UI error toast
  toast.error("Uhh...", {
    style: {
      background: theme.colors.primary[900],
      borderColor: theme.colors.primary[700],
      color: "white",
    },
    description:
      title ||
      description ||
      error?.error?.message ||
      "Something went wrong. Please try again later.",
  });
};
