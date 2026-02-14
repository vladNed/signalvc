import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = (baseUrl: string, onPrepareHeaders?: (headers: Headers) => Promise<Headers>) => {
  return createApi({
    reducerPath: "baseApi",
    tagTypes: ["Startups"],
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: async (headers) => {
        if (onPrepareHeaders) {
          headers = await onPrepareHeaders(headers);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({}),
  });
};

export { baseApi };
