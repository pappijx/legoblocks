# @legoblocks/ui

A headless React library for rendering and managing nested tree structures with immutable updates. Perfect for building file explorers, nested menus, organizational charts, and any hierarchical data visualization.

**Live Documentation & Examples:** https://legoblocks.ayushpapnai.in/

## Features

- 🌳 **Headless Design**: Complete control over UI/UX while the library handles recursion and state management
- 🔄 **Immutable Updates**: All operations return new tree instances, perfect for React state management
- ⚡ **Performance Optimized**: Path-based targeting and single clone operations for efficient updates
- 🎯 **Flexible Data Structure**: Works with any tree data shape, not locked into specific schemas
- 🛠️ **Rich Operations**: Add, delete, update nodes with support for complex operations like bulk updates
- 📍 **Path-based Navigation**: Each node knows its exact location in the tree for precise operations
- 🔧 **TypeScript Support**: Full type safety with comprehensive interfaces

## Installation

```bash
npm install @legoblocks/ui
# or
yarn add @legoblocks/ui
# or
pnpm add @legoblocks/ui
```

## Quick Start

```tsx
import { NestedStructure, RecurringNodeProps } from '@legoblocks/ui';
import { useState } from 'react';

type Node = {
  name: string;
  type: 'file' | 'folder';
  children?: Node[];
};

function FileNode({ node, children, addNode, deleteNode }: RecurringNodeProps<Node>) {
  return (
    <div>
      <span>{node?.name}</span>
      {node?.type === 'folder' && <button onClick={() => addNode && addNode({ name: 'new-file.ts', type: 'file' })}>+</button>}
      <button onClick={deleteNode}>Delete</button>
      {children}
    </div>
  );
}

export default function App() {
  const [tree, setTree] = useState<Node[]>([{ name: 'src', type: 'folder', children: [{ name: 'index.ts', type: 'file' }] }]);

  return <NestedStructure recurringNode={<FileNode />} recurringData={tree} updatedRecurringData={setTree} />;
}
```

## Core Concepts

### Headless Rendering

You provide a React component that defines how each node should look and behave. The library handles the recursion and state management, cloning your component at each tree level.

### Immutable Updates

All operations (add, delete, update) work on cloned data structures, ensuring your React state remains predictable and your components re-render efficiently.

### Path-based Operations

Each node receives an `accessPath` (array of indices) that describes its exact location in the tree, enabling precise operations without searching the entire tree.

## API Reference

### `<NestedStructure />`

The main component that renders your tree structure.

**Props:**

- `recurringNode: ReactElement<RecurringNodeProps<T>>` - Your component that will be rendered for each node
- `recurringData: any[]` - Root array of nodes (each can have optional `children` array)
- `updatedRecurringData?: (updatedData: any[]) => void` - Callback fired when tree is modified

### `RecurringNodeProps<T>`

Props injected into your component at each node:

```typescript
interface RecurringNodeProps<T> {
  node?: T; // Current node data
  children?: React.ReactNode; // Rendered subtree
  accessPath?: number[]; // Path to this node [0, 2, 1]
  deleteNode?: () => void; // Delete this node
  addNode?: (newNode: T, position?: 'child' | 'before' | 'after') => void;
  updateNode?: (updatedNode: T) => void;
  updateAllChildrenNode?: (
    payload: Partial<T> | ((node: T) => T),
    options?: {
      includeSelf?: boolean; // Include current node (default: true)
      depth?: number; // Max depth to update (default: Infinity)
      predicate?: (node: T) => boolean; // Only update matching nodes
      childrenField?: keyof T & string; // Custom children field (default: 'children')
    }
  ) => void;
}
```

## Use Cases

### 1. File Explorer

Perfect for building file system browsers, code editors, or project explorers.

### 2. Nested Filters with Cascade Selection

Build filter systems where selecting a parent automatically selects all children, or use `updateAllChildrenNode` to bulk update entire subtrees.

### 3. Organizational Charts

Build company hierarchies, family trees, or any organizational structure.

### 4. Nested Menus

Create multi-level navigation menus with dynamic content.

### 5. Comment Threads

Render nested comment structures with reply functionality.

## Advanced Features

- **Bulk Operations**: Use `updateAllChildrenNode` to update entire subtrees with predicates and depth limits
- **Custom Children Field**: Specify custom field names for children (default: 'children')
- **Path-based Operations**: Each node knows its exact location via `accessPath`
- **Position-aware Adding**: Insert nodes as children, before, or after current node

## Performance Considerations

- **Path-based targeting**: Operations are O(depth) rather than O(tree size)
- **Single clone per operation**: Only one `structuredClone` per update
- **Localized updates**: Only affected subtrees are modified
- **Stable references**: Unchanged parts maintain referential equality

## TypeScript Support

The library is fully typed with comprehensive interfaces. Your node types will be properly inferred throughout your component tree, providing full type safety for all operations.

## License

MIT © [Ayush Papnai](https://www.ayushpapnai.in)

## Contributing

Issues and pull requests are welcome! Please check the documentation in the `/apps/docs` directory for more examples and detailed usage patterns.
