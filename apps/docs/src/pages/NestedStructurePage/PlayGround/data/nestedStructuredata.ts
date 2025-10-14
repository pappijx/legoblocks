export interface NestedDataProps {
  name: string;
  type: 'file' | 'folder';
  children?: any[];
}

export const nestedData: NestedDataProps[] = [
  {
    name: 'Root',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              {
                name: 'ui',
                type: 'folder',
                children: [
                  { name: 'Button.tsx', type: 'file' },
                  { name: 'Input.tsx', type: 'file' },
                ],
              },
              { name: 'Header.tsx', type: 'file' },
              { name: 'Footer.tsx', type: 'file' },
            ],
          },
          { name: 'index.tsx', type: 'file' },
          { name: 'App.tsx', type: 'file' },
          {
            name: 'utils',
            type: 'folder',
            children: [
              { name: 'format.ts', type: 'file' },
              { name: 'debounce.ts', type: 'file' },
            ],
          },
        ],
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          { name: 'index.html', type: 'file' },
          {
            name: 'images',
            type: 'folder',
            children: [
              { name: 'logo.png', type: 'file' },
              {
                name: 'icons',
                type: 'folder',
                children: [
                  { name: 'search.svg', type: 'file' },
                  { name: 'close.svg', type: 'file' },
                ],
              },
            ],
          },
        ],
      },
      { name: 'package.json', type: 'file' },
      { name: 'tsconfig.json', type: 'file' },
    ],
  },

  {
    name: 'Docs',
    type: 'folder',
    children: [
      { name: 'README.md', type: 'file' },
      {
        name: 'guides',
        type: 'folder',
        children: [
          { name: 'getting-started.md', type: 'file' },
          {
            name: 'advanced',
            type: 'folder',
            children: [
              { name: 'performance.md', type: 'file' },
              { name: 'security.md', type: 'file' },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'Examples',
    type: 'folder',
    children: [
      {
        name: 'todo-app',
        type: 'folder',
        children: [
          { name: 'README.md', type: 'file' },
          { name: 'index.html', type: 'file' },
          {
            name: 'assets',
            type: 'folder',
            children: [{ name: 'screenshot.png', type: 'file' }],
          },
        ],
      },
      {
        name: 'chat-widget',
        type: 'folder',
        children: [{ name: 'widget.js', type: 'file' }],
      },
    ],
  },

  { name: 'LICENSE', type: 'file' },
  { name: '.gitignore', type: 'file' },
];
