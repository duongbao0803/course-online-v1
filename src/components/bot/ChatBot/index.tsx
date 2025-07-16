import { Colors } from '@/helpers/constants/color';
import type { ChatBotProps } from '@/helpers/types/bot.types';
import { BookOpen, SendIcon, User } from 'lucide-react';
import { type FC } from 'react';
import QuickOptions from '../QuickOptions';
import { useChatBot } from './hooks/useChatBot';

const ChatBot: FC<ChatBotProps> = ({ onClose }) => {
  const { state, handler } = useChatBot();

  return (
    <div className='w-full h-full max-w-4xl mx-auto'>
      <div className='bg-white rounded-none sm:rounded-3xl shadow-2xl w-full h-full flex flex-col overflow-hidden border-0'>
        <div className='relative bg-green p-6'>
          <div className='relative flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30'>
                  <BookOpen className='text-white text-xl' />
                </div>
                <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center'>
                  <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></div>
                </div>
              </div>
              <div>
                <h3 className='font-bold text-white text-xl tracking-wide'>EduBot</h3>
                <p className='text-sm text-white/90 flex items-center gap-2 mt-1'>
                  Tư vấn khóa học online 24/7
                </p>
              </div>
            </div>
            {onClose && (
              <button
                className='p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20'
                onClick={onClose}
                aria-label='Đóng chat bot'
              >
                <svg
                  className='w-5 h-5 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div
          ref={state.chatContainerRef}
          className='flex-1 overflow-y-auto space-y-4 bg-white cursor-text'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: Colors.colors.lightGray,
          }}
        >
          {state.showQuickOptions && (
            <div className='mt-4'>
              <QuickOptions
                show={true}
                onOptionClick={handler.handleQuickOption}
                quickOptions={state.QUICK_OPTIONS}
              />
            </div>
          )}
          <div className='px-6 pb-3'>
            {state.messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`flex items-start gap-3 mt-5 ${
                    item.sender === 'me' ? 'flex-row-reverse' : ''
                  } group`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      item.sender === 'me' ? 'bg-gray-400' : 'bg-green-600'
                    }`}
                  >
                    {item.sender === 'me' ? (
                      <User className='text-white text-xs' />
                    ) : (
                      <BookOpen className='text-white text-xs' />
                    )}
                  </div>

                  <div className={`max-w-[75%] ${item.sender === 'me' ? 'text-right' : ''}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
                        item.sender === 'me'
                          ? 'bg-primary text-white rounded-tr-md'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-md'
                      }`}
                    >
                      <p className='text-sm leading-relaxed break-words text-left'>{item.text}</p>
                    </div>
                    <div
                      className={`text-xs text-gray mt-1 px-2 ${
                        item.sender === 'me' ? 'text-right' : ''
                      }`}
                    >
                      {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {state.isTyping && (
            <div className='px-6'>
              <div className='flex items-start gap-3 animate-fade-in'>
                <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md'>
                  <BookOpen className='text-white text-sm' />
                </div>
                <div className='bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm'>
                  <div className='flex gap-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100'>
          <div className='flex gap-3 items-center bg-white rounded-2xl p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
            <textarea
              ref={state.textareaRef}
              className='flex-1 max-h-28 min-h-6 bg-transparent resize-none outline-none text-sm text-gray-700 placeholder-gray-500 leading-relaxed'
              value={state.input}
              onChange={e => handler.setInput(e.target.value)}
              onKeyDown={handler.handleKeyPress}
              placeholder='Nhập câu hỏi về khóa học...'
              rows={1}
              autoFocus
            />

            <button
              className={`p-3 rounded-2xl transition-all duration-300 ${
                state.input.trim() && !state.isLoading
                  ? 'bg-primary text-white hover:shadow-lg cursor-pointer hover:scale-105'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handler.handleSend}
              disabled={!state.input.trim() || state.isLoading}
              type='button'
            >
              {state.isLoading ? (
                <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                <SendIcon className='text-sm' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
