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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText);
  const { jobItems, isLoading, totalItems } = useJobItems(debouncedSearchText);

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
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
