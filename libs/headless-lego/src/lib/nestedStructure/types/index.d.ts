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
}

export type NestedStructureProps<T> = {
  recurringNode: ReactElement<RecurringNodeProps<T>>;
  recurringData: any[];
  updatedRecurringData?: (udpatedData: any[]) => void;
};
