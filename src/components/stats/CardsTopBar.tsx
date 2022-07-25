import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { StatCardsContext } from "../../contexts/cards/StatCardsContext";
import { DebounceInput } from "react-debounce-input";
import Button from "../Button";
import {
  faArrowDown91,
  faArrowDownAZ,
  faBook,
  faCalendar,
  faClock,
  faDivide,
  faHeart,
  faTv,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { TitleCardsContext } from "../../contexts/cards/TitleCardsContext";
import FilterTags from "./Filters/FilterTags";
import FiltersContainer from "./Filters/FiltersContainer";
import { UserCardsContext } from "../../contexts/cards/UserCardsContext";

type Props = {
  context: {
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    searchQuery: string;
  };
  sortButtons: {
    id: string;
    name: string;
    icon: IconDefinition;
  }[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
  hasFilters?: boolean;
  favorites?: ReactNode;
};

function CardsTopBar({
  context,
  sortButtons,
  search,
  hasFilters,
  favorites,
}: Props) {
  const { sort, setSort, searchQuery } = context;
  return (
    <>
      <div className="mb-2 py-1">
        <div className="flex flex-wrap justify-center gap-2 lg:justify-between">
          <div className="flex grow gap-2 lg:w-1/3 lg:grow-0">
            <DebounceInput
              type="search"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              className="h-8 w-full appearance-none rounded border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:focus:border-blue-400 lg:h-auto"
              debounceTimeout={300}
              value={searchQuery}
              onChange={search}
            />
            {favorites}
          </div>
          <div className="flex gap-2 overflow-x-scroll">
            {sortButtons.map((button) => (
              <Button
                key={button.id}
                onClick={() => setSort(button.id)}
                size="sm"
                startIcon={button.icon}
                text={button.name}
                active={sort === button.id}
              />
            ))}
          </div>
        </div>
        {hasFilters && <FiltersContainer />}
      </div>
      {hasFilters && <FilterTags />}
    </>
  );
}

export function StatCardsTopBar() {
  const { sort, setSort, searchQuery, setSearchQuery } =
    useContext(StatCardsContext);
  return (
    <CardsTopBar
      context={{
        sort,
        setSort,
        searchQuery,
      }}
      sortButtons={[
        {
          id: "count",
          name: "Count",
          icon: faArrowDown91,
        },
        {
          id: "length",
          name: "Time Watched",
          icon: faClock,
        },
        {
          id: "mean_score",
          name: "Mean Score",
          icon: faDivide,
        },
      ]}
      search={(event) => {
        setSearchQuery(event.target.value);
      }}
    />
  );
}

export function TitleCardsTopBar() {
  const {
    type,
    listFilter: {
      sort,
      setSort,
      searchQuery,
      setSearchQuery,
      addFilter,
      removeFilter,
    },
  } = useContext(TitleCardsContext);
  return (
    <CardsTopBar
      context={{
        sort,
        setSort,
        searchQuery,
      }}
      sortButtons={[
        {
          id: "title",
          name: "Title",
          icon: faArrowDownAZ,
        },
        {
          id: "score",
          name: "Score",
          icon: faArrowDown91,
        },
        {
          id: "count",
          name: type == "anime" ? "Episodes Count" : "Chapters Count",
          icon: type === "anime" ? faTv : faBook,
        },
        {
          id: "release_year",
          name: "Release Year",
          icon: faCalendar,
        },
        {
          id: "start_year",
          name: "Start Year",
          icon: faCalendar,
        },
      ]}
      search={(event) => {
        setSearchQuery(event.target.value);
      }}
      hasFilters
    />
  );
}

export function UserCardsTopBar() {
  const {
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    showFavorites,
    setShowFavorites,
  } = useContext(UserCardsContext);
  return (
    <CardsTopBar
      context={{
        sort,
        setSort,
        searchQuery,
      }}
      sortButtons={[
        {
          id: "username",
          name: "Username",
          icon: faArrowDownAZ,
        },
        {
          id: "date",
          name: "Date Updated",
          icon: faClock,
        },
      ]}
      search={(event) => {
        setSearchQuery(event.target.value);
      }}
      favorites={
        <Button
          onClick={() => setShowFavorites(!showFavorites)}
          size="sm"
          startIcon={faHeart}
          text={showFavorites ? "Hide Favorites" : "Show Favorites"}
          active={showFavorites}
        />
      }
    />
  );
}
