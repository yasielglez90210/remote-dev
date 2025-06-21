import React, { createContext, useEffect, useState } from "react";

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleBookmarkToggle: (jobId: number) => void;
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
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
