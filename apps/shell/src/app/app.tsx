import * as React from 'react';
//import NxWelcome from './nx-welcome';
import { Route, Routes } from 'react-router-dom';

const Visitor = React.lazy(() => import('visitor/Module'));

const Tourist = React.lazy(() => import('tourist/Module'));

const Contributor = React.lazy(() => import('contributor/Module'));

const Partner = React.lazy(() => import('partner/Module'));

const Admin = React.lazy(() => import('admin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/tourist" element={<Tourist />} />
        <Route path="/tourist/*" element={<Tourist />} />

        <Route path="/partner" element={<Partner />} />
        <Route path="/partner/*" element={<Partner />} />

        <Route path="/contributor" element={<Contributor />} />
        <Route path="/contributor/*" element={<Contributor />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />

        <Route path="*" element={<Visitor />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
