import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import { Header, HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { Sidebar, SidebarTop } from "./Sidebar";
import { useDebounced, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { MAX_PER_PAGE } from "../lib/constants";
import { TPageDirection, TSortBy } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  const totalItems = jobItems?.length || 0;
  const totalPages = Math.ceil(totalItems / MAX_PER_PAGE);
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsSortedAndSlice =
    jobItemsSorted?.slice(
      currentPage * MAX_PER_PAGE - MAX_PER_PAGE,
      currentPage * MAX_PER_PAGE
    ) || [];

  const handleChangePage = (direction: TPageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (newSortBy: TSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalItems={totalItems} />
            <SortingControls sortBy={sortBy} onClick={handleSortChange} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSlice} isLoading={isLoading} />

          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
