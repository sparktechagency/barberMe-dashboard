import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/count-summary",
        };
      },
    }),
    revenueStastics: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/revenue-statistics",
        };
      },
    }),

    userStatistics: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user-statistics",
        };
      },
    }),

    vendorsConversionData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/vendor-order-conversion-rate",
        };
      },
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useRevenueStasticsQuery,
  useUserStatisticsQuery,
  useVendorsConversionDataQuery,
} = dashboardSlice;
