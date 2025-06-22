import React, { createContext, useEffect, useState } from "react";
import { useJobItemsByIds } from "../lib/hooks";
import { TJobItemContent } from "../lib/types";

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleBookmarkToggle: (jobId: number) => void;
  bookmarkedJobItems: TJobItemContent[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  // Initialize bookmarkedIds from localStorage or set to an empty array
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItemsByIds(bookmarkedIds);

  const handleBookmarkToggle = (jobId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleBookmarkToggle,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
