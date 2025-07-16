import { UpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 cursor-pointer flex transform items-center justify-center rounded-full bg-green text-white shadow-lg transition-opacity duration-700 ${
          isVisible ? 'animate-bounce opacity-100' : 'opacity-0'
        }`}
      >
        <UpOutlined className='text-2xl' />
      </button>
    </div>
  );
};
