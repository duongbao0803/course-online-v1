import type { QuickOptionsProps } from '@/helpers/types/bot.types';
import type { FC } from 'react';

const QuickOptions: FC<QuickOptionsProps> = ({ show, onOptionClick, quickOptions }) => {
  if (!show) return null;

  return (
    <div className='px-6 py-4 bg-gradient-to-br from-gray-50 via-white to-indigo-50/20'>
      <div className='grid grid-cols-2 gap-3'>
        {quickOptions.map(option => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onOptionClick(option)}
              className='flex items-center gap-3 p-3 bg-white border border-secondary rounded-xl hover:bg-green hover:border-green-300 transition-all duration-200 group shadow-sm hover:shadow-md'
            >
              <div className='flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors'>
                <IconComponent className='text-green-600 text-sm' />
              </div>
              <span className='text-sm font-medium text-gray-700 group-hover:text-primary transition-colors'>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickOptions;
