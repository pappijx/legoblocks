import React from 'react';
import { NestedStructureProps } from './types';

export function NestedStructure({
  recurringNode,
  recurringData,
  updatedRecurringData,
}: NestedStructureProps<any[]>) {
  // deleteNode
  const deleteNode = (accessPath: number[]) => {
    const newTreeData = structuredClone(recurringData);

    // Case 1: deleting at root level
    if (accessPath.length === 1) {
      newTreeData.splice(accessPath[0], 1);
      updatedRecurringData && updatedRecurringData(newTreeData); // ✅ use newTreeData
      return;
    }

    // Traverse to the parent of the target node
    let currentNode = newTreeData[accessPath[0]];
    for (let i = 1; i < accessPath.length - 1; i++) {
      if (!currentNode.children) {
        return; // nothing to delete
      }
      currentNode = currentNode.children[accessPath[i]];
    }

    // Delete the target node
    const targetIndex = accessPath[accessPath.length - 1];
    if (currentNode.children) {
      currentNode.children.splice(targetIndex, 1);
      updatedRecurringData && updatedRecurringData(newTreeData); // ✅ always set newTreeData
    }
  };

  const addNode = (
    targetPath: number[],
    newNode: any,
    position: 'child' | 'before' | 'after' = 'child'
  ) => {
    const newTree = structuredClone(recurringData);

    if (targetPath.length === 0) {
      newTree.push(newNode);
      updatedRecurringData && updatedRecurringData(newTree);
    }

    // Navigate to parent node
    let parent = newTree[targetPath[0]];
    for (
      let i = 1;
      i < targetPath.length - (position === 'child' ? 0 : 1);
      i++
    ) {
      parent = parent.children && parent.children[targetPath[i]];
    }

    if (position === 'child') {
      parent.children = parent.children || [];
      parent.children.push(newNode);
    } else {
      const index = targetPath.at(-1)!;
      parent.children = parent.children || [];
      const insertIndex = position === 'before' ? index : index + 1;
      parent.children.splice(insertIndex, 0, newNode);
    }

    updatedRecurringData && updatedRecurringData(newTree);
  };

  function updateNode(accessPath: number[], partialNode: any) {
    const newTree = structuredClone(recurringData);

    // Navigate to target node
    let currentNode = newTree[accessPath[0]];
    for (let i = 1; i < accessPath.length; i++) {
      if (!currentNode.children) return; // Invalid path
      currentNode = currentNode.children[accessPath[i]];
    }

    // Merge updates immutably
    Object.assign(currentNode, partialNode);

    updatedRecurringData && updatedRecurringData(newTree);
  }

  const renderRecursive = (
    nodes: any[],
    parentAccessPath?: number[]
  ): React.ReactNode[] => {
    return nodes.map((node, index) => {
      const accessPath = parentAccessPath
        ? [...parentAccessPath, index]
        : [index];
      return React.cloneElement(
        recurringNode,
        {
          key: index,
          node: { ...node, billo: 'hey' },
          accessPath: accessPath,
          deleteNode: () => deleteNode(accessPath) ?? null,
          addNode: (
            newNode: any,
            position: 'child' | 'before' | 'after' = 'child'
          ) => addNode(accessPath, newNode, position),
          updateNode: (updatedNode: any) => updateNode(accessPath, updatedNode),
        },
        node.children ? renderRecursive(node.children, accessPath) : null
      );
    });
  };

  return <>{renderRecursive(recurringData)}</>;
}
