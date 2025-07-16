import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { BackToTop } from './components/BackToTop';
import { queryClient } from './configs/queryClient';
import { Colors } from './helpers/constants/color';
import router from './routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Colors.colors.primary,
          },
        }}
      >
        <RouterProvider router={router} />
        <Toaster position='top-right' richColors />
        <BackToTop />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
