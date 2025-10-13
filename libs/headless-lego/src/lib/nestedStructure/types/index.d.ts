import { ReactElement } from 'react';

export interface RecurringNodeProps<T> {
  node?: T;
  children?: React.ReactNode;
  accessPath?: number[];
  deleteNode?: () => void | null;
  addNode?: (
    newNode: T,
    position: 'child' | 'before' | 'after' = 'child'
  ) => void;
  updateNode?: (updatedNode: T) => void;
  updateNodeDeep?: (transform: (node: T) => T) => void;
  updateAllChildrenNode?: (
    payload: Partial<T> | ((node: T) => T),
    options?: {
      includeSelf?: boolean;
      depth?: number; // Infinity by default
      predicate?: (node: T) => boolean;
      childrenField?: keyof T & string; // defaults to 'children'
    }
  ) => void;
}

export type NestedStructureProps<T> = {
  recurringNode: ReactElement<RecurringNodeProps<T>>;
  recurringData: any[];
  updatedRecurringData?: (updatedData: any[]) => void;
};
