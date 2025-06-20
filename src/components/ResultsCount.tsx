type ResultsCountProps = {
  totalItems?: number;
};

export default function ResultsCount({ totalItems = 0 }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalItems}</span>
      <></> results
    </p>
  );
}
