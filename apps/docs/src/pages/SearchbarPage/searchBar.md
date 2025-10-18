# SearchBar

A powerful, headless SearchBar component that manages query state, debounced filtering, search buttons, and result emission. The component provides complete control over UI/UX while handling all the search logic, debouncing, and state management.

For installation instructions, see [How to install](/how-to-install).

### When to use

- You want a flexible search helper that keeps UI separate from logic
- You need debounced searching over an in-memory array with custom UI
- You want search button functionality (boolean or custom React nodes)
- You need onChange callbacks with debounced search results
- You want to search through children items in nested data structures

---

## Quick Start

```tsx
import { SearchBar } from '@legoblock/ui';
import { useState } from 'react';

type Item = { id: string; name: string; category?: string };

const items: Item[] = [
  { id: '1', name: 'Apple', category: 'fruit' },
  { id: '2', name: 'Banana', category: 'fruit' },
  { id: '3', name: 'Carrot', category: 'vegetable' },
];

export default function Example() {
  return (
    <SearchBar
      data={items}
      onChange={(query, results) => console.log('Search changed:', query, results)}
      options={{
        debounceMs: 300,
        showSearchButton: true,
        searchButtonText: 'Search',
      }}
      onResults={(r) => console.log('Results:', r)}
    >
      {({ query, setQuery, results, clear, isSearching, searchButton }) => (
        <div>
          <div className="flex gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items..." className="flex-1" />
            {searchButton}
            <button onClick={clear}>Clear</button>
          </div>

          {isSearching ? (
            <div>Searching…</div>
          ) : (
            <ul>
              {results.map((it) => (
                <li key={it.id}>
                  {it.name} {it.category && `— ${it.category}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SearchBar>
  );
}
```

---

## Core Concepts

- **Headless**: `SearchBar` doesn't render inputs or lists. You provide the UI via the `children` render-prop and receive state/handlers.
- **Debounced onChange**: The `onChange` callback is debounced (configurable via `options.debounceMs`) to avoid repeated expensive work while users type.
- **Search Button Support**: Add search buttons as boolean (default styling) or custom React nodes for manual search triggering.
- **Custom filter**: By default the component performs a naive JSON-string include search. You can pass a custom `filter` function to control which items match a query.
- **Multiple Callbacks**: `onChange`, `onResults`, and `onSearch` provide different levels of search event handling.
- **Children Item Search**: Works with any data structure, including nested objects with children arrays.

---

## Public API

### `<SearchBar />`

- **Props**

  - `data: T[]`
    - Array of items to search.
  - `onChange?: (query: string, results: T[]) => void`
    - **NEW**: Called whenever the search query changes (debounced). Receives both query and results.
  - `onResults?: (results: T[]) => void`
    - Called whenever the component computes a new result set.
  - `options?: SearchBarOptions<T>`
    - Configuration object with enhanced options (see below).
  - `children: (props: SearchBarRenderProps<T>) => React.ReactNode`
    - A render-prop that receives search state and helpers (see below).

- **Returns**
  - Whatever your `children` render.

### `SearchBarRenderProps<T>`

```ts
export interface SearchBarRenderProps<T> {
  query: string;
  setQuery: (q: string) => void;
  results: T[];
  clear: () => void;
  isSearching: boolean;
} ˛ 
```

- `query`: Current query string.
- `setQuery(q)`: Update the query string (triggers a debounced search).
- `results`: Current array of matching items.
- `clear()`: Clears the query and resets results to `data`.
- `isSearching`: True while the input debounce timer is active.

---

### `SearchBarOptions<T>`

```ts
interface SearchBarOptions<T> {
  debounceMs?: number; // Default: 200ms
  filter?: (item: T, query: string) => boolean; // Custom search filter
  placeholder?: string; // Default: 'Search...'
  showSearchButton?: boolean | ReactNode; // Default: false
  searchButtonText?: string; // Default: 'Search'
  onSearch?: (query: string, results: T[]) => void; // Manual search callback
}
```

### Enhanced Render Props

```ts
interface SearchBarRenderProps<T> {
  query: string; // Current query string
  setQuery: (q: string) => void; // Update query (triggers debounced search)
  results: T[]; // Current array of matching items
  clear: () => void; // Clears query and resets results
  isSearching: boolean; // True while debounce timer is active
  triggerSearch: () => void; // **NEW**: Manually trigger search
  searchButton: ReactNode | null; // **NEW**: Rendered search button (if enabled)
}
```

**New Properties:**

- `triggerSearch()`: **NEW** - Manually trigger search (useful for search buttons).
- `searchButton`: **NEW** - The rendered search button (null if disabled).

---

## Example: Search Button Usage

```tsx
<SearchBar
  data={items}
  options={{
    showSearchButton: true,
    searchButtonText: 'Find Items',
    onSearch: (query, results) => console.log('Manual search:', query, results),
  }}
>
  {({ query, setQuery, results, searchButton, triggerSearch }) => (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {searchButton}
      {/* Or use triggerSearch manually */}
      <button onClick={triggerSearch}>Custom Search</button>
    </div>
  )}
</SearchBar>
```

## Example: Custom Search Button

```tsx
<SearchBar
  data={items}
  options={{
    showSearchButton: <button className="custom-search-btn">🔍 Custom Search</button>,
  }}
>
  {({ query, setQuery, results, searchButton }) => (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {searchButton}
    </div>
  )}
</SearchBar>
```

---

## Example: custom filter

```tsx
<SearchBar data={items} options={{ filter: (item, q) => item.name.toLowerCase().startsWith(q.toLowerCase()) }}>
  {({ query, setQuery, results }) => (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div>{results.length} matches</div>
    </>
  )}
</SearchBar>
```

---

## Data shape

- `data` can be any array of objects. The default filter uses `JSON.stringify` for a simple string-match across the object. For predictable behavior and performance, pass a `filter` that only reads the fields you care about.

---

## Notes on performance

- Use a concise `filter` to avoid repeated expensive serializations on large collections.
- Debounce reduces work during typing; choose `debounceMs` based on UX and dataset size.

---

## Try it

This page demonstrates a minimal UI. Replace the input and list with your app's components to integrate the search logic.
