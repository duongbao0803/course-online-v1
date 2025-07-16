import LandingLayout from '@/components/layouts';
import { PATH_NAME } from '@/helpers/constants/pathname';
import NotFound from '@/pages/notfound';
import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/home'));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense
    fallback={
      <div className='flex items-center justify-center min-h-screen'>
        <Spin size='large' />
      </div>
    }
  >
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: (
      <LandingLayout>
        <Outlet />
      </LandingLayout>
    ),
    children: [
      {
        path: PATH_NAME.HOME,
        element: withSuspense(HomePage),
      },
    ],
  },

  {
    path: PATH_NAME.NOT_FOUND,
    element: <NotFound />,
  },
]);

export default router;
