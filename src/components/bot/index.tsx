import { MessageCircle } from 'lucide-react';
import { memo } from 'react';
import ChatBot from './ChatBot';
import { useBot } from './useBot';

const Bot = () => {
  const { state, handler } = useBot();

  return (
    <section className='z-[999]'>
      {!state.open && (
        <button
          className='z-50 fixed bottom-6 right-6  w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-200'
          onClick={handler.handleOpen}
          aria-label='Mở chat bot'
        >
          <MessageCircle className='text-white text-3xl drop-shadow-lg' />
        </button>
      )}
      <div
        className={`fixed z-50 transition-all duration-300 ${state.open ? '' : 'hidden'}
          w-full max-w-md sm:max-w-md h-[70vh] max-h-[800px] bottom-6 right-6 rounded-none shadow-2xl border border-gray-200 flex flex-col overflow-hidden
          sm:bottom-6 sm:right-6 sm:rounded-3xl sm:w-full sm:h-[70vh] sm:max-h-[800px]
          mobile:inset-0 mobile:w-full mobile:h-full mobile:rounded-none mobile:max-w-none mobile:max-h-none
        `}
        style={{
          ...(state.isXS
            ? {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                maxWidth: 'none',
                maxHeight: 'none',
              }
            : {}),
        }}
      >
        <div className='flex-1 min-h-0'>
          <ChatBot onClose={handler.handleClose} />
        </div>
      </div>
    </section>
  );
};

export default memo(Bot);
