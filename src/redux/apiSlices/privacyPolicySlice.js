import { api } from "../api/baseApi";

const privacyPolicySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePricyPolicy: builder.mutation({
      query: (data) => {
        return {
          url: `/rule/privacy-policy`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    privacyPolicy: builder.query({
      query: () => {
        return {
          url: `/rule/privacy-policy`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    //about us

    createAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: `rule/about`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    aboutUs: builder.query({
      query: () => {
        return {
          url: `rule/about`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
  }),
});

export const {
  useUpdatePricyPolicyMutation,
  usePrivacyPolicyQuery,
  useCreateAboutUsMutation,
  useAboutUsQuery,
} = privacyPolicySlice;
