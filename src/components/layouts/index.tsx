import type { LandingLayoutProps } from '@/helpers/types/common.types';
import Bot from '../bot';

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* header (if needed) */}
      <main className='flex-1'>{children}</main>
      {/* footer (if needed) */}
      <Bot />
    </div>
  );
};

export default LandingLayout;
