# NestedStructure

A headless recursive renderer for arbitrary tree data. You provide a "recurring" node component; the library walks your tree and clones that component at each node, wiring in helpers like `addNode` and `deleteNode`.

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
- **Recursion with context**: Each node instance receives `node`, `children` (the rendered subtree), and helpers (`addNode`, `deleteNode`, `accessPath`).

---

## Public API

### `<NestedStructure />`

- **Props**
  - `recurringNode: ReactElement<RecurringNodeProps<T>>`
    - A React element (e.g., `<YourNodeComponent />`) that will be cloned at each node.
  - `recurringData: any[]`
    - Your root array of nodes. Each node can optionally contain a `children: any[]`.
  - `updatedRecurringData?: (updatedData: any[]) => void`
    - Called with a new, cloned tree whenever a node is added or deleted.
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

Notes:

- Sibling insertions (`before`/`after`) are no-ops for root items (no parent). For root-level insertion, call `addNode` on a root sibling or manage via the parent list in your app state.

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
