import { Navigate, createBrowserRouter } from 'react-router';
import { Layout } from './layout';
import { Overview } from './pages/overview';
import { DealerIntelligence } from './pages/dealer-intelligence';
import { Recommendations } from './pages/recommendations';
import { LoginPage } from './pages/login';

function isAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

function ProtectedLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
}

function GuestOnlyLoginPage() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <LoginPage />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: GuestOnlyLoginPage,
  },
  {
    path: '/',
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Overview },
      { path: 'dealer-intelligence', Component: DealerIntelligence },
      { path: 'recommendations', Component: Recommendations },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to={isAuthenticated() ? '/' : '/login'} replace />,
  },
]);
