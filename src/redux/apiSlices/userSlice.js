import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user",
        };
      },
      providesTags: ["User"],
    }),

    getAllCustomers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-list?role=CUSTOMER",
        };
      },
      providesTags: ["User"],
    }),

    getAllBerbers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-list?role=BARBER",
        };
      },
      providesTags: ["User"],
    }),

    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useGetAllCustomersQuery,
  useGetAllBerbersQuery,
  useUserByIdQuery,
} = userSlice;
