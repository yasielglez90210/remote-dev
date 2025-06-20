import { useEffect, useState } from "react";
import type { TJobItemContent, TJobItem } from "./types";
import { BASE_API_URL } from "./constants";

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

export function useJobItem(id: number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobItem, setJobItem] = useState<TJobItemContent | null>(null);

  useEffect(() => {
    if (!id) return;

    const getJobItemContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobItem(data.jobItem);
      } catch (error) {
        console.error("Error fetching job item content:", error);
      }
      setIsLoading(false);
    };

    getJobItemContent();
  }, [id]);

  return {
    jobItem,
    isLoading,
  };
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalItems = searchText ? jobItems.length : 0;
  const jobItemsSlice = searchText ? jobItems.slice(0, 7) : [];

  useEffect(() => {
    if (!searchText) return;

    const getRemoteJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setJobItems(data.jobItems);
      } catch (error) {
        console.error("Error fetching remote jobs:", error);
        setJobItems([]);
      }
      setIsLoading(false);
    };

    getRemoteJobs();
  }, [searchText]);

  return {
    jobItems: jobItemsSlice,
    isLoading,
    totalItems,
  };
}

export function useDebounced<T>(value: T, delay: number = 300): T {
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
