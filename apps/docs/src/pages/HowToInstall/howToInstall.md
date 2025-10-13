# 📦 Installation Guide

Get started with **@legoblocks/ui** in your React project with this comprehensive installation guide.

---

## 🚀 Quick Start

### Step 1: Install the Package

Install **@legoblocks/ui** from npm:

```bash
npm install @legoblocks/ui
```

Or if you're using Yarn:

```bash
yarn add @legoblocks/ui
```

Or with pnpm:

```bash
pnpm add @legoblocks/ui
```

---

## 📋 Prerequisites

Before installing **@legoblocks/ui**, ensure you have:

- **Node.js** version 16 or higher
- **React** version 18 or higher
- **TypeScript** (recommended for better developer experience)

---

## 🛠️ Basic Setup

### Step 2: Import Components

Import the components you need in your React component:

```tsx
import { NestedStructure } from '@legoblocks/ui';
import type { NestedStructureProps, RecurringNodeProps } from '@legoblocks/ui';
```

### Step 3: Define Your Data Structure

Create your hierarchical data structure:

```tsx
interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const fileTreeData: FileNode[] = [
  {
    name: 'Documents',
    type: 'folder',
    children: [
      {
        name: 'Work',
        type: 'folder',
        children: [
          { name: 'project.pdf', type: 'file' },
          { name: 'report.docx', type: 'file' },
        ],
      },
      { name: 'personal.txt', type: 'file' },
    ],
  },
  {
    name: 'Pictures',
    type: 'folder',
    children: [
      { name: 'vacation.jpg', type: 'file' },
      { name: 'family.png', type: 'file' },
    ],
  },
  { name: 'readme.md', type: 'file' },
];
```

### Step 4: Create Your Node Component

Design how each node should look and behave:

```tsx
import React from 'react';

const FileNodeComponent: React.FC<RecurringNodeProps<FileNode>> = ({ node, children, accessPath, deleteNode, addNode }) => {
  if (!node) return null;

  const handleDelete = () => {
    if (deleteNode) {
      deleteNode();
    }
  };

  const handleAddFile = () => {
    if (addNode) {
      addNode(
        {
          name: `New File ${Date.now()}`,
          type: 'file',
        },
        'child'
      );
    }
  };

  const handleAddFolder = () => {
    if (addNode) {
      addNode(
        {
          name: `New Folder ${Date.now()}`,
          type: 'folder',
          children: [],
        },
        'child'
      );
    }
  };

  return (
    <div className="ml-4 p-2 border-l-2 border-gray-300 hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <span className="text-lg">{node.type === 'folder' ? '📁' : '📄'}</span>
        <span className="font-medium">{node.name}</span>
        <div className="flex gap-1">
          {node.type === 'folder' && (
            <>
              <button onClick={handleAddFile} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                + File
              </button>
              <button onClick={handleAddFolder} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                + Folder
              </button>
            </>
          )}
          <button onClick={handleDelete} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
            Delete
          </button>
        </div>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
```

### Step 5: Use the NestedStructure Component

Put it all together in your main component:

```tsx
import React, { useState } from 'react';
import { NestedStructure } from '@legoblocks/ui';
import { FileNodeComponent } from './FileNodeComponent';

const FileTreeApp: React.FC = () => {
  const [fileTree, setFileTree] = useState(fileTreeData);

  const handleDataUpdate = (updatedData: FileNode[]) => {
    setFileTree(updatedData);
    console.log('Tree updated:', updatedData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">File Tree Manager</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <NestedStructure recurringNode={<FileNodeComponent />} recurringData={fileTree} updatedRecurringData={handleDataUpdate} />
      </div>
    </div>
  );
};

export default FileTreeApp;
```

---

## 🎯 Advanced Usage

### Custom Styling with CSS Modules

```tsx
// FileNodeComponent.module.css
.node {
  padding: 8px;
  margin-left: 16px;
  border-left: 2px solid #e5e7eb;
  transition: background-color 0.2s;
}

.node:hover {
  background-color: #f9fafb;
}

.nodeContent {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 16px;
}

.name {
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.button {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.addFile {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.addFile:hover {
  background-color: #bfdbfe;
}
```

```tsx
import styles from './FileNodeComponent.module.css';

const FileNodeComponent: React.FC<RecurringNodeProps<FileNode>> = ({ node, children, deleteNode, addNode }) => {
  // ... component logic

  return (
    <div className={styles.node}>
      <div className={styles.nodeContent}>
        <span className={styles.icon}>{node?.type === 'folder' ? '📁' : '📄'}</span>
        <span className={styles.name}>{node?.name}</span>
        <div className={styles.actions}>{/* Action buttons */}</div>
      </div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};
```
