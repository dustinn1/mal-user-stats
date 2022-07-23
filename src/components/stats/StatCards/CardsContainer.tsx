import { useContext } from "react";
import { StatCardsContext } from "../../../contexts/cards/StatCardsContext";
import StatCard from ".";

export default function StatCardsContainer() {
  const {
    type,
    statsData,
    sort,
    pagination: { range },
  } = useContext(StatCardsContext);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsData.slice(range[0], range[1]).map((stat, index) => (
        <StatCard
          key={stat.id}
          type={type}
          data={stat}
          sort={sort}
          rank={range[0] + index + 1}
        />
      ))}
    </div>
  );
}
