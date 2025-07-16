import type { CourseTabsProps } from '@/helpers/types/course.types';
import { BulbOutlined, EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { memo } from 'react';
import { COURSE_TABS_TRANSLATE } from './translate';

const CourseTabs: React.FC<CourseTabsProps> = memo(
  ({
    activeTab,
    filteredCoursesCount,
    favoritesCount,
    historyCount,
    suggestionsCount,
    onTabChange,
  }) => {
    const tabItems = [
      {
        key: 'all',
        label: (
          <span className='flex items-center gap-2'>
            <ShoppingCartOutlined />
            {COURSE_TABS_TRANSLATE.ALL} ({filteredCoursesCount})
          </span>
        ),
      },
      {
        key: 'favorites',
        label: (
          <span className='flex items-center gap-2'>
            <HeartOutlined />
            {COURSE_TABS_TRANSLATE.FAVORITES} ({favoritesCount})
          </span>
        ),
      },
      {
        key: 'history',
        label: (
          <span className='flex items-center gap-2'>
            <EyeOutlined />
            {COURSE_TABS_TRANSLATE.HISTORY} ({historyCount})
          </span>
        ),
      },
      {
        key: 'suggestions',
        label: (
          <span className='flex items-center gap-2'>
            <BulbOutlined />
            {COURSE_TABS_TRANSLATE.SUGGESTIONS} ({suggestionsCount})
          </span>
        ),
      },
    ];

    return <Tabs activeKey={activeTab} onChange={onTabChange} className='mb-8' items={tabItems} />;
  },
);

export default CourseTabs;
