import { lazy } from 'react';

const NestedStructurePage = lazy(() => import('../pages/NestedStructurePage'));
const Introduction = lazy(() => import('./Introduction'));

export { NestedStructurePage, Introduction };
