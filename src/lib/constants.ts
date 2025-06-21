export const BASE_API_URL =
  "https://bytegrad.com/course-assets/projects/rmtdev/api/data";

export const REACT_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 10, // 10 minutes
  refetchOnWindowFocus: true, // Do not refetch on window focus
  refetchOnReconnect: true, // Do not refetch on reconnect
  refetchOnMount: false, // Do not refetch on mount
  retry: false, // Do not retry failed requests
  retryDelay: 2000, // Wait 2 seconds before retrying
  keepPreviousData: false, // Keep previous data while loading new data
};

export const MAX_PER_PAGE = 7; // Maximum items per page for pagination
