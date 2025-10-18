import { Route, Routes, Outlet } from 'react-router-dom';
import { Introduction, NestedStructurePage, SearchbarPage } from '../pages';
import { PropsWithChildren, Suspense } from 'react';
import MasterLayout from '../components/layout/MasterLayout';
import HowToInstall from '../pages/HowToInstall';

const SuspenseLoadedElement = (props: PropsWithChildren) => {
  const { children } = props;

  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export function App() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <MasterLayout>
            <Outlet />
          </MasterLayout>
        }
      >
        <Route
          path=""
          element={
            <SuspenseLoadedElement>
              <Introduction />
            </SuspenseLoadedElement>
          }
        />
        <Route
          path="how-to-install"
          element={
            <SuspenseLoadedElement>
              <HowToInstall />
            </SuspenseLoadedElement>
          }
        />
        <Route
          path="nested-structure"
          element={
            <SuspenseLoadedElement>
              <NestedStructurePage />
            </SuspenseLoadedElement>
          }
        />
        <Route
          path="/search-bar"
          element={
            <SuspenseLoadedElement>
              <SearchbarPage />
            </SuspenseLoadedElement>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
