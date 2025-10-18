import { ReactNode } from 'react';

export type SearchFilter<T> = (item: T, query: string) => boolean;

export interface SearchBarOptions<T> {
  debounceMs?: number;
  filter?: SearchFilter<T>;
  placeholder?: string;
  showSearchButton?: boolean | ReactNode;
  searchButtonText?: string;
  onSearch?: (query: string, results: T[]) => void;
}

export interface SearchBarRenderProps<T> {
  query: string;
  setQuery: (q: string) => void;
  results: T[];
  clear: () => void;
  isSearching: boolean;
  triggerSearch: () => void;
  searchButton: ReactNode | null;
}

export interface SearchBarProps<T> {
  data: T[];
  onChange?: (query: string, results: T[]) => void;
  onResults?: (results: T[]) => void;
  children: (props: SearchBarRenderProps<T>) => React.ReactNode;
  options?: SearchBarOptions<T>;
}
