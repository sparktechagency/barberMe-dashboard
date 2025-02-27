import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: (data) => {
        return {
          url: `/faq`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["FAQS"],
    }),
    getFaq: builder.query({
      query: () => {
        return {
          url: `/faq`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      providesTags: ["FAQS"],
    }),
    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["FAQS"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["FAQS"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqSlice;
