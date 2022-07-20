import { Dispatch, SetStateAction } from "react";

export type Pagination = {
  pageCount: number;
  page: number;
  range: number[];
  setPage: Dispatch<SetStateAction<number>>;
  hasPrevious: boolean;
  hasNext: boolean;
};
