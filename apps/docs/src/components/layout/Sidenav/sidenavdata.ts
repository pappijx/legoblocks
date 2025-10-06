export interface SideNavDataProp {
  label: string;
  route?: string;
  children?: SideNavDataProp[];
}

export const sidenavdata: SideNavDataProp[] = [
  {
    label: 'Introduction',
    route: '/',
  },
  {
    label: 'How to install',
    route: '/how-to-install',
  },
  {
    label: 'Components',
    children: [
      {
        label: 'Nested Structures',
        route: '/nested-structure',
      },
      {
        label: 'Search bar',
        route: '/search-bar',
      },
    ],
  },
];
