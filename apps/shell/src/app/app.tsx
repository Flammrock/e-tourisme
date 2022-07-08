import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Tourist = React.lazy(() => import('tourist/Module'));

const Partner = React.lazy(() => import('partner/Module'));

const Contributor = React.lazy(() => import('contributor/Module'));

const Admin = React.lazy(() => import('admin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/tourist">Tourist</Link>
        </li>

        <li>
          <Link to="/partner">Partner</Link>
        </li>

        <li>
          <Link to="/contributor">Contributor</Link>
        </li>

        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />

        <Route path="/tourist" element={<Tourist />} />

        <Route path="/partner" element={<Partner />} />

        <Route path="/contributor" element={<Contributor />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
