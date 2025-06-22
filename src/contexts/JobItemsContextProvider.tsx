import React, { createContext, useCallback, useMemo, useState } from "react";
import { useJobItemsBySearch, useSearchTextContext } from "../lib/hooks";
import { TJobItem, TPageDirection, TSortBy } from "../lib/types";
import { MAX_PER_PAGE } from "../lib/constants";

type TJobItemsContext = {
  jobItems: TJobItem[] | undefined;
  totalItems: number;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  sortBy: TSortBy;
  jobItemsSortedAndSlice: TJobItem[];
  handleChangePage: (direction: TPageDirection) => void;
  handleSortChange: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useJobItemsBySearch(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  const totalItems = jobItems?.length || 0;
  const totalPages = Math.ceil(totalItems / MAX_PER_PAGE);

  const jobItemsSorted: TJobItem[] = useMemo(() => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSortedAndSlice: TJobItem[] = useMemo(() => {
    return (
      jobItemsSorted?.slice(
        currentPage * MAX_PER_PAGE - MAX_PER_PAGE,
        currentPage * MAX_PER_PAGE
      ) || []
    );
  }, [jobItemsSorted, currentPage]);

  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleSortChange = useCallback((newSortBy: TSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      totalItems,
      isLoading,
      currentPage,
      totalPages,
      sortBy,
      jobItemsSortedAndSlice,
      handleChangePage,
      handleSortChange,
    }),
    [
      jobItems,
      totalItems,
      isLoading,
      currentPage,
      totalPages,
      sortBy,
      jobItemsSortedAndSlice,
      handleChangePage,
      handleSortChange,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
