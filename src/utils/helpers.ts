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

  const data = await res.json();

  return data;
}

export const toastError = (
  title?: string | null,
  error?: any,
  description?: string
) => {
  // Trigger Chakra UI error toast
  toast.error(title || "Uhh...", {
    style: {
      background: theme.colors.primary[900],
      borderColor: theme.colors.primary[700],
      color: "white",
    },
    description:
      description ||
      error?.error?.message ||
      "Something went wrong. Please try again later.",
  });
};
