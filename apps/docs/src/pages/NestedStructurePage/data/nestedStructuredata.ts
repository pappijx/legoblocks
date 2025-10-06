export interface NestedDataProps {
  name: string;
  type: 'file' | 'folder';
  children?: any[];
}

export const nestedData: NestedDataProps[] = [
  { name: 'Folder', type: 'folder', children: [] },
  { name: 'File', type: 'file' },
];
