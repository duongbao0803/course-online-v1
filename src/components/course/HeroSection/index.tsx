import type { HeroSectionProps } from '@/helpers/types/course.types';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { Sparkles } from 'lucide-react';
import React, { memo } from 'react';
import { HERO_SECTION_CONSTANTS } from './constants';
import { HERO_SECTION_TRANSLATE } from './translate';

const HeroSection: React.FC<HeroSectionProps> = memo(
  ({
    searchTerm,
    priceFilter,
    searchLoading,
    suggestionsLoading,
    onSearchTermChange,
    onPriceFilterChange,
    onSearch,
    onFetchSuggestions,
  }) => {
    const { BACKGROUND_IMAGE } = HERO_SECTION_CONSTANTS;
    const { CONTENT } = HERO_SECTION_TRANSLATE;

    return (
      <div className='relative mb-32'>
        <div
          className='relative h-80 bg-cover bg-center bg-[url(BACKGROUND_IMAGE)]'
          style={{ backgroundImage: BACKGROUND_IMAGE }}
        >
          {/* <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4'>
              {CONTENT.TITLE}
            </h1>
            <p className='text-base sm:text-lg md:text-xl'>{CONTENT.SUB_TITLE}</p>
          </div>
        </div> */}
        </div>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-4xl px-4'>
          <div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Input
                placeholder={CONTENT.SEARCH_PLACEHOLDER}
                size='large'
                prefix={<SearchOutlined style={{ color: '#999' }} />}
                value={searchTerm}
                onChange={e => onSearchTermChange(e.target.value)}
                allowClear
                className='w-full sm:flex-1 !rounded-md'
                onPressEnter={() => {
                  onSearch();
                }}
              />
              <Select
                size='large'
                placeholder={CONTENT.PRICE_FILTER_PLACEHOLDER}
                className='!w-full sm:w-auto !rounded-md sm:!min-w-[160px] sm:!max-w-[200px]'
                value={priceFilter}
                onChange={onPriceFilterChange}
              >
                <Select.Option value='all'>{CONTENT.PRICE_FILTER_OPTIONS.ALL}</Select.Option>
                <Select.Option value='under500k'>
                  {CONTENT.PRICE_FILTER_OPTIONS.UNDER_500K}
                </Select.Option>
                <Select.Option value='500k-1m'>
                  {CONTENT.PRICE_FILTER_OPTIONS.BETWEEN_500K_AND_1M}
                </Select.Option>
                <Select.Option value='over1m'>{CONTENT.PRICE_FILTER_OPTIONS.OVER_1M}</Select.Option>
              </Select>
              <Button
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                className='w-full sm:w-auto'
                loading={searchLoading}
                onClick={onSearch}
              >
                {CONTENT.SEARCH_BUTTON}
              </Button>
              <Button
                size='large'
                icon={<Sparkles size={16} />}
                onClick={onFetchSuggestions}
                loading={suggestionsLoading}
                className='w-full sm:w-auto'
              >
                {CONTENT.SUGGESTION_BUTTON}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default HeroSection;
