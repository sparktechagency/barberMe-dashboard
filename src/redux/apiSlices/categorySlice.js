import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/category/admin-category",
        };
      },
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          body: data,
          url: "/category",
        };
      },
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          method: "PATCH",
          url: `/category/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/category/${id}`,
        };
      },
      invalidatesTags: ["Category"],
    }),

    //subCategory

    getAllSubCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/subCategory",
        };
      },
      providesTags: ["SubCategory"],
    }),

    createSubCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          body: data,
          url: "/subCategory",
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          method: "PATCH",
          url: `/subCategory/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/subCategory/${id}`,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  //subCategory
  useGetAllSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categorySlice;
