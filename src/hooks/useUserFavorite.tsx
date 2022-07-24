import { useCallback, useState } from "react";

function getFavorite(mal_id: number): boolean {
  const local: string = localStorage.getItem("favorites")!;
  if (local === null) {
    localStorage.setItem("favorites", "[]");
    return false;
  }
  if (JSON.parse(local).includes(mal_id)) {
    return true;
  }
  return false;
}

export function useUserFavorite(mal_id: number): {
  isFavorite: boolean;
  updateFavorite: () => void;
} {
  const [isFavorite, setIsFavorite] = useState(getFavorite(mal_id));

  const updateFavorite = useCallback(() => {
    const local: string = localStorage.getItem("favorites")!;
    let updatedArray: number[] = JSON.parse(local);
    if (!isFavorite) {
      updatedArray.push(mal_id);
      setIsFavorite(true);
    } else {
      updatedArray = updatedArray.filter((favorite) => favorite !== mal_id);
      setIsFavorite(false);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedArray));
  }, [isFavorite, mal_id]);

  return {
    isFavorite,
    updateFavorite,
  };
}
