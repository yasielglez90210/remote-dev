import { useEffect, useState } from "react";
import type { TJobItemContent, TJobItem } from "./types";
import { BASE_API_URL, REACT_QUERY_CONFIG } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1); // Remove the '#' character
      setActiveId(id);
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

// export function useJobItem(id: number | null) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [jobItem, setJobItem] = useState<TJobItemContent | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const getJobItemContent = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${BASE_API_URL}/${id}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setJobItem(data.jobItem);
//       } catch (error) {
//         console.error("Error fetching job item content:", error);
//       }
//       setIsLoading(false);
//     };

//     getJobItemContent();
//   }, [id]);

//   return {
//     jobItem,
//     isLoading,
//   };
// }

// -------------------------------------------------------

const fetchJobItem = async (id: number): Promise<TJobItemContent> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    if (response.status === 404) throw new Error("Job item not found");
    if (response.status === 500) throw new Error("Internal server error");
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.jobItem;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery<TJobItemContent | undefined>(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : undefined),
    {
      ...REACT_QUERY_CONFIG,
      enabled: Boolean(id), // Only run the query if id is not null
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    }
  );

  return {
    jobItem: data,
    isLoading: isInitialLoading,
  } as const;
}

// -------------------------------------------------------

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<TJobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;

//     const getRemoteJobs = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setJobItems(data.jobItems);
//       } catch (error) {
//         console.error("Error fetching remote jobs:", error);
//         setJobItems([]);
//       }
//       setIsLoading(false);
//     };

//     getRemoteJobs();
//   }, [searchText]);

//   return {
//     jobItems,
//     isLoading,
//   };
// }

const fetchJobItems = async (searchText: string): Promise<TJobItem[]> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    if (response.status === 404) throw new Error("No job items found");
    if (response.status === 500) throw new Error("Internal server error");
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.jobItems;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery<TJobItem[]>(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      ...REACT_QUERY_CONFIG,
      enabled: Boolean(searchText), // Only run the query if searchText is not empty
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    }
  );

  return {
    jobItems: data,
    isLoading: isInitialLoading,
  } as const;
}

// -------------------------------------------------------

export function useDebounced<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
