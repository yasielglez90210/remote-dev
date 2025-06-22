import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSortedAndSlice, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSlice} isLoading={isLoading} />;
}
