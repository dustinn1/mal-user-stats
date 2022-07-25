import { useContext } from "react";
import { UserCardsContext } from "../../contexts/cards/UserCardsContext";
import UserCard from ".";

export default function UserCardsContainer() {
  const {
    usersData,
    pagination: { range },
  } = useContext(UserCardsContext);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {usersData.slice(range[0], range[1]).map((user, index) => (
        <UserCard key={user.username} user={user} />
      ))}
    </div>
  );
}
