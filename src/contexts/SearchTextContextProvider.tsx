import React, { createContext, useState } from "react";
import { useDebounced } from "../lib/hooks";

type TSearchText = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<TSearchText | null>(null);

type SearchTextProviderProps = {
  children: React.ReactNode;
};

export default function SearchTextProvider({
  children,
}: SearchTextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
