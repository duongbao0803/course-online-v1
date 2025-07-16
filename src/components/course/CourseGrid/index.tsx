import type { Course, CourseGridProps } from '@/helpers/types/course.types';
import { Card, Skeleton } from 'antd';
import { BookOpen } from 'lucide-react';
import React, { memo } from 'react';
import { CourseCard } from '../CourseCard';

const CourseGrid: React.FC<CourseGridProps> = memo(
  ({
    courses,
    favorites,
    isLoading,
    activeTab,
    searchLoading,
    suggestionsLoading,
    emptyMessage,
    onViewDetail,
    onFavoriteToggle,
  }) => {
    const showSkeleton =
      (suggestionsLoading && activeTab === 'suggestions') ||
      isLoading ||
      (searchLoading && activeTab === 'all');

    if (showSkeleton) {
      return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <Skeleton.Image active className='!w-full mb-3' />
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      );
    }

    if (courses.length === 0) {
      return (
        <div className='col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-inner'>
          <BookOpen className='h-12 w-12 text-green mb-4' strokeWidth={1.2} />
          <h2 className='text-base font-semibold text-gray-700 mb-2'>Không có khóa học nào</h2>
          <p className='text-gray-500 mb-6 text-center text-md max-w-xs'>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {courses.map((course: Course) => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={favorites.includes(course.id)}
            onViewDetail={onViewDetail}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    );
  },
);

export default CourseGrid;
