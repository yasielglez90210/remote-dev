import { useJobItemsContext } from "../lib/hooks";
import { type TSortBy } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleSortChange } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => handleSortChange("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>

      <SortingButton
        onClick={() => handleSortChange("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: (sortBy: TSortBy) => void;
  isActive: boolean;
};

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick("recent")}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}
