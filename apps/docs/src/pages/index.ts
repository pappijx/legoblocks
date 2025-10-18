import { lazy } from 'react';

const Introduction = lazy(() => import('./Introduction'));
const NestedStructurePage = lazy(() => import('../pages/NestedStructurePage'));
const SearchbarPage = lazy(() => import('./SearchbarPage'));

export { NestedStructurePage, Introduction, SearchbarPage };
