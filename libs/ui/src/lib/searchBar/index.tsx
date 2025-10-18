import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { SearchBarProps, SearchBarRenderProps, SearchFilter } from './types';

function defaultFilter<T>(item: T, query: string) {
  try {
    const text = JSON.stringify(item).toLowerCase();
    return text.includes(query.toLowerCase());
  } catch {
    return false;
  }
}

export function SearchBar<T>({
  data,
  onChange,
  onResults,
  children,
  options,
}: SearchBarProps<T>) {
  const {
    debounceMs = 200,
    filter = defaultFilter as SearchFilter<T>,
    showSearchButton = false,
    searchButtonText = 'Search',
    onSearch,
  } = options || {};

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(data);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQueryRef = useRef<string | null>(null);
  const lastResultsRef = useRef<T[] | null>(null);

  // Perform search function
  const resultsEqual = useCallback((a: T[], b: T[]) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      const ai: unknown = a[i];
      const bi: unknown = b[i];
      if (ai === bi) continue;
      // If both have an `id` field, compare by id
      if (
        ai &&
        bi &&
        typeof ai === 'object' &&
        typeof bi === 'object' &&
        !Array.isArray(ai) &&
        !Array.isArray(bi)
      ) {
        const aObj = ai as Record<string, unknown>;
        const bObj = bi as Record<string, unknown>;
        if ('id' in aObj && 'id' in bObj && aObj.id === bObj.id) continue;
        // fall back to string compare for stability in docs/demo usage
        try {
          if (JSON.stringify(aObj) === JSON.stringify(bObj)) continue;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }, []);

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults(data);

        // Only notify parent if query/results changed to avoid redundant re-renders
        const resultsChanged =
          lastQueryRef.current !== searchQuery ||
          !resultsEqual(lastResultsRef.current || [], data);
        if (resultsChanged) {
          onResults && onResults(data);
          onChange && onChange(searchQuery, data);
          onSearch && onSearch(searchQuery, data);
          lastQueryRef.current = searchQuery;
          lastResultsRef.current = data;
        }

        return;
      }

      const filtered = data.filter((item) => filter(item, searchQuery));
      setResults(filtered);

      // Only notify parent if query/results changed to avoid redundant re-renders
      const resultsChanged =
        lastQueryRef.current !== searchQuery ||
        !resultsEqual(lastResultsRef.current || [], filtered);
      if (resultsChanged) {
        onResults && onResults(filtered);
        onChange && onChange(searchQuery, filtered);
        onSearch && onSearch(searchQuery, filtered);
        lastQueryRef.current = searchQuery;
        lastResultsRef.current = filtered;
      }
    },
    [data, filter, onResults, onChange, onSearch, resultsEqual]
  );

  // Trigger search manually (for search button)
  const triggerSearch = useCallback(() => {
    setIsSearching(true);
    performSearch(query);
    setIsSearching(false);
  }, [query, performSearch]);

  const clear = useCallback(() => {
    setQuery('');
    setResults(data);
    onResults && onResults(data);
    onChange && onChange('', data);
  }, [data, onResults, onChange]);

  // Re-run search when underlying data changes
  useEffect(() => {
    performSearch(query);
    // Only re-run when `data` changes. `performSearch` and `query` are stable enough
    // for this use-case and the debounced effect handles query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Debounced search when query changes
  useEffect(() => {
    setIsSearching(true);
    if (timerRef.current) {
      globalThis.clearTimeout(timerRef.current);
    }

    timerRef.current = globalThis.setTimeout(() => {
      performSearch(query);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        globalThis.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [query, debounceMs, performSearch]);

  // Render search button based on configuration
  const searchButton = useMemo(() => {
    if (!showSearchButton) return null;

    if (typeof showSearchButton === 'boolean') {
      return (
        <button
          onClick={triggerSearch}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSearching ? 'Searching...' : searchButtonText}
        </button>
      );
    }

    // Custom React node
    return showSearchButton;
  }, [showSearchButton, triggerSearch, isSearching, searchButtonText]);

  const renderProps: SearchBarRenderProps<T> = useMemo(
    () => ({
      query,
      setQuery,
      results,
      clear,
      isSearching,
      triggerSearch,
      searchButton,
    }),
    [query, results, clear, isSearching, triggerSearch, searchButton]
  );

  return <>{children(renderProps)}</>;
}

export default SearchBar;
