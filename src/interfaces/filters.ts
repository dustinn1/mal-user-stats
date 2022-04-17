export type Filters = {
  genres: {
    includes: string[];
    excludes: string[];
  };
  studios: {
    includes: string[];
    excludes: string[];
  };
  statuses: {
    includes: string[];
    excludes: string[];
  };
  formats: {
    includes: string[];
    excludes: string[];
  };
};
