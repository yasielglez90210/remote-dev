import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalItems } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalItems}</span>
      <></> results
    </p>
  );
}
