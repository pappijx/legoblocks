import { SearchBar } from '@legoblock/ui';
import { Item, sampleData } from './data/staticData';
import { useState, useCallback, useMemo, useRef } from 'react';

export default function PlayGround() {
  const searchHistoryRef = useRef<
    Array<{ query: string; results: number; timestamp: Date }>
  >([]);
  const [, setDisplayTick] = useState(0);

  const handleOnChange = useCallback((query: string, results: Item[]) => {
    console.log('onChange triggered:', { query, results });
    searchHistoryRef.current = [
      ...searchHistoryRef.current,
      { query, results: results.length, timestamp: new Date() },
    ].slice(-5);
    setDisplayTick((t) => t + 1);
  }, []);

  const handleOnResults = useCallback((r: Item[]) => {
    console.log('onResults:', r);
  }, []);

  const handleOnSearch = useCallback((query: string, results: Item[]) => {
    console.log('Manual search triggered:', { query, results });
  }, []);

  const optionsWithButton = useMemo(
    () => ({
      debounceMs: 300,
      placeholder: 'Search fruits and vegetables...',
      showSearchButton: true,
      searchButtonText: 'Find',
      onSearch: handleOnSearch,
    }),
    [handleOnSearch]
  );

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced SearchBar with all new features */}
      <div className="bg-surface text-text p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          Enhanced SearchBar with All Features
        </h3>

        <SearchBar
          data={sampleData}
          onChange={handleOnChange}
          onResults={handleOnResults}
          options={optionsWithButton}
        >
          {({
            query,
            setQuery,
            results,
            clear,
            isSearching,
            triggerSearch,
            searchButton,
          }) => (
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fruits and vegetables..."
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-blue-500"
                />
                {searchButton}
                <button
                  onClick={() => clear()}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>

              <div className="min-h-[100px] border rounded p-4 bg-gray-50">
                {isSearching ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Searching...
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Found {results.length} result
                      {results.length !== 1 ? 's' : ''}
                    </p>
                    <ul className="space-y-1">
                      {results.map((item: Item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-2 p-2 bg-white rounded border"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500">
                            — {item.category}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </SearchBar>

        {/* Recent search history */}
        {searchHistoryRef.current.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>Recent searches:</strong>
            <ul className="mt-2">
              {searchHistoryRef.current.map((h) => (
                <li key={h.timestamp.toISOString()}>
                  {h.query} — {h.results} results (
                  {h.timestamp.toLocaleTimeString()})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Custom Search Button Example */}
      <div className="bg-surface text-text p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Custom Search Button</h3>

        <SearchBar
          data={sampleData}
          options={{
            debounceMs: 500,
            showSearchButton: (
              <button className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                <span role="img" aria-label="search">
                  🔍
                </span>{' '}
                Custom Search
              </button>
            ),
          }}
        >
          {({ query, setQuery, results, clear, isSearching, searchButton }) => (
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type and use custom search button..."
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-green-500"
                />
                {searchButton}
                <button
                  onClick={() => clear()}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>

              <div className="min-h-[80px] border rounded p-4 bg-gray-50">
                {results.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Results:</p>
                    <div className="flex flex-wrap gap-2">
                      {results.map((item: Item) => (
                        <span
                          key={item.id}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No results yet. Try searching!
                  </p>
                )}
              </div>
            </div>
          )}
        </SearchBar>
      </div>
    </div>
  );
}
