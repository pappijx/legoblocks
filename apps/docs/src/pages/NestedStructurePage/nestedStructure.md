# NestedStructure

A headless recursive renderer for arbitrary tree data. You provide a "recurring" node component; the library walks your tree and clones that component at each node, wiring in helpers like `addNode`, `deleteNode`, `updateNode`, and `updateAllChildrenNode`.

### When to use

- You need to render nested or hierarchical data (e.g., folders/files, menus, org charts).
- You want full control over visuals/UX, and only need traversal + immutable updates handled for you.

---

## Installation

```bash
# in an app that consumes the headless library
pnpm add headless-lego
# or
npm i headless-lego
# or
yarn add headless-lego
```

---

## Quick Start

```tsx
import { NestedStructure, RecurringNodeProps } from 'headless-lego';
import { useState } from 'react';

type Node = {
  name: string;
  type: 'file' | 'folder';
  children?: Node[];
};

const initialTree: Node[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'index.ts', type: 'file' },
      { name: 'components', type: 'folder', children: [] },
    ],
  },
];

function Item({ node, children, addNode, deleteNode }: RecurringNodeProps<Node>) {
  return (
    <div style={{ paddingLeft: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span>{node?.name}</span>
        {node?.type === 'folder' && (
          <>
            <button onClick={deleteNode}>Delete</button>
            <button onClick={() => addNode && addNode({ name: 'new-file.ts', type: 'file' })}>Add child</button>
          </>
        )}
      </div>
      {children}
    </div>
  );
}

export default function Example() {
  const [tree, setTree] = useState<Node[]>(initialTree);

  return <NestedStructure recurringNode={<Item />} recurringData={tree} updatedRecurringData={setTree} />;
}
```

---

## Core Concepts

- **Headless rendering**: You control markup/styles via your `recurringNode` component. The library only handles recursion and immutable updates.
- **Recursion with context**: Each node instance receives `node`, `children` (the rendered subtree), and helpers (`addNode`, `deleteNode`, `updateNode`, `updateAllChildrenNode`, `accessPath`).

---

## Public API

### `<NestedStructure />`

- **Props**
  - `recurringNode: ReactElement<RecurringNodeProps<T>>`
    - A React element (e.g., `<YourNodeComponent />`) that will be cloned at each node.
  - `recurringData: any[]`
    - Your root array of nodes. Each node can optionally contain a `children: any[]`.
  - `updatedRecurringData?: (updatedData: any[]) => void`
    - Called with a new, cloned tree whenever a node is added, deleted, or updated.
- **Returns**
  - A fragment with your tree rendered by repeatedly cloning `recurringNode`.

Example:

```tsx
<NestedStructure recurringNode={<Item />} recurringData={tree} updatedRecurringData={setTree} />
```

### `RecurringNodeProps<T>`

These props are injected into your `recurringNode` at each level.

```ts
export interface RecurringNodeProps<T> {
  node?: T;
  children?: React.ReactNode;
  accessPath?: number[];
  deleteNode?: () => void | null;
  addNode?: (newNode: T, position?: 'child' | 'before' | 'after') => void;
  updateNode?: (updatedNode: T) => void;
  updateAllChildrenNode?: (
    payload: Partial<T> | ((node: T) => T),
    options?: {
      includeSelf?: boolean; // default true
      depth?: number; // default Infinity
      predicate?: (node: T) => boolean;
      childrenField?: keyof T & string; // default 'children'
    }
  ) => void;
}
```

- **node**: The current node data of type `T`.
- **children**: The rendered subtree for the current node. Render it where you want nesting to appear.
- **accessPath**: An array of indices describing the node’s location in the tree (e.g., `[0, 2, 1]`).
- **deleteNode()**: Removes the current node and triggers `updatedRecurringData`.
- **addNode(newNode, position?)**:
  - Inserts a `newNode` relative to the current node.
  - `position`
    - `'child'` (default): Appends to the current node’s `children`.
    - `'before'`: Inserts as a sibling before the current node.
    - `'after'`: Inserts as a sibling after the current node.
- **updateNode(updatedNode)**: Shallowly updates the current node and triggers `updatedRecurringData`.
- **updateAllChildrenNode(payload, options?)**: Applies `payload` to the current node (by default) and all descendants in one immutable update.
  - `payload`: either a partial object merged into each affected node, or a function that returns a transformed node.
  - `options.includeSelf` (default `true`): whether to update the current node too.
  - `options.depth` (default `Infinity`): limit how deep to recurse; `0` means only self.
  - `options.predicate`: only apply on nodes where this returns `true`.
  - `options.childrenField` (default `'children'`): customize the children key if your data differs.

Notes:

- Sibling insertions (`before`/`after`) are no-ops for root items (no parent). For root-level insertion, call `addNode` on a root sibling or manage via the parent list in your app state.

---

## Example: Nested filters (cascade selection)

```tsx
type FilterNode = {
  label: string;
  selected: boolean;
  children?: FilterNode[];
};

function FilterItem({ node, children, updateAllChildrenNode }: RecurringNodeProps<FilterNode>) {
  const onToggle = (checked: boolean) => {
    updateAllChildrenNode && updateAllChildrenNode({ selected: checked }, { includeSelf: true });
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={!!node?.selected} onChange={(e) => onToggle(e.target.checked)} />
        {node?.label}
      </label>
      <div style={{ paddingLeft: 12 }}>{children}</div>
    </div>
  );
}

// Usage
<NestedStructure recurringNode={<FilterItem />} recurringData={filters} updatedRecurringData={setFilters} />;
```

---

## Data Shape

- `recurringData` is an array.
- Each node is your own shape, but sibling/child operations expect:
  - `node.children?: T[]` when the node has children.
- Example:

```ts
type Node = {
  id?: string;
  name: string;
  type: 'file' | 'folder';
  children?: Node[];
};
```

---

## How updates and deletes are optimized (theory)

- Path-based targeting (not global search): Each node carries an `accessPath` (array of indices) that pinpoints its location. Update and delete operations first navigate via this path to reach the exact node or its parent in O(depth) time, avoiding a full-tree search.
- Single immutable clone per operation: We take one `structuredClone` of the current tree at the start of an operation. All changes are applied to this cloned structure, preventing accidental mutation and ensuring referential integrity for React reconciliation.
- Localized work only:
  - Delete uses the parent from the `accessPath` and performs a single splice on the appropriate children array.
  - Add computes the correct insertion point (child/before/after) and mutates only the relevant sibling list.
  - Update merges fields into just the targeted node.
  - Subtree updates (like cascading selection) first navigate to the subtree root by `accessPath`, then perform a depth-first traversal limited to that subtree (optionally bounded by `depth` and filtered by `predicate`).
- Single emission, predictable renders: We call `updatedRecurringData` once per operation with the fully-updated, cloned tree. Consumers keep the tree as controlled state, so React reconciles only the parts that changed. No intermediate emissions, no repeated clones.
- Stable recursion for rendering; path for precision: Rendering is handled via a simple recursive walk that clones your recurring node component at each level. Mutations use index paths for precision and performance, combining both models for clarity and speed.
- No schema lock-in: The library assumes `children` by default but lets behaviors like subtree updates customize the children key. This keeps the algorithm efficient without constraining your node shape.
- Practical complexity:
  - Targeting a node by path is O(depth).
  - Deleting or adding is O(siblings) due to array insertion/removal.
  - Updating a subtree is O(size of the affected subtree), not O(size of the whole tree).
