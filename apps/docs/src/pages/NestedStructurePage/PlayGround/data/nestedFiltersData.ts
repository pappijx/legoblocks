export type FilterNode = {
  label: string;
  selected: boolean;
  children?: FilterNode[];
};

export const nestedFiltersData: FilterNode[] = [
  {
    label: 'Frameworks',
    selected: false,
    children: [
      { label: 'React', selected: false },
      { label: 'Vue', selected: false },
      {
        label: 'Svelte',
        selected: false,
        children: [
          { label: 'Typescript', selected: false },
          { label: 'ESlint', selected: false },
          { label: 'Husky', selected: false },
        ],
      },
    ],
  },
  {
    label: 'Language',
    selected: false,
    children: [
      { label: 'TypeScript', selected: false },
      { label: 'JavaScript', selected: false },
    ],
  },
  {
    label: 'Styling',
    selected: false,
    children: [
      { label: 'Tailwind', selected: false },
      { label: 'CSS Modules', selected: false },
      { label: 'Styled Components', selected: false },
    ],
  },
];
