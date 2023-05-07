import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Messages"],
  endpoints: (build) => ({
    getMessage: build.query({
      query: () => ({
        url: "/chat",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Messages"],
    }),
    postMessage: build.mutation({
      query: (obj) => ({
        url: "/chat",
        method: "POST",
        body: obj,
        credentials: "include",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const { useGetMessageQuery, usePostMessageMutation } = messageApi;
