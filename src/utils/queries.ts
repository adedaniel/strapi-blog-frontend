import { QueryClient } from "@tanstack/react-query";
import { toastError } from "./helpers";

/** The code is creating a new instance of the `QueryClient` class and configuring its default options. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours
      retry: false,
    },
    mutations: {
      onError({ response }: any, variables, context) {
        toastError(null, response);
      },
    },
  },
});

export default queryClient;
