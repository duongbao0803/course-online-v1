import { formatCurrency } from '@/helpers/libs';
import type { CourseCardProps } from '@/helpers/types/course.types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Rate, Tag } from 'antd';
import React from 'react';

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isFavorite,
  onViewDetail,
  onFavoriteToggle,
}) => {
  return (
    <div
      onClick={() => onViewDetail(course)}
      className='bg-white group rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer flex flex-col overflow-hidden h-full'
    >
      <div className='relative h-48 overflow-hidden'>
        <img
          alt={course.name}
          src={course.image}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute top-3 right-3 z-10'>
          <button
            onClick={e => onFavoriteToggle(course.id, e)}
            className='bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow'
          >
            {isFavorite ? (
              <HeartFilled style={{ color: '#ff4d4f', fontSize: '20px' }} />
            ) : (
              <HeartOutlined style={{ fontSize: '20px', color: '#555' }} />
            )}
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-grow p-4'>
        <h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>{course.name}</h3>

        <div className='flex items-center gap-2 mb-3'>
          <Rate disabled defaultValue={course.rating} allowHalf className='text-sm' />
          <span className='text-sm text-gray-500'>({course.rating})</span>
        </div>

        <p className='text-gray-600 text-sm mb-4 line-clamp-2 text-ellipsis'>
          {course.shortDescription}
        </p>

        <div className='flex flex-wrap items-center mb-4'>
          {course.tags.slice(0, 2).map((tag: string) => (
            <Tag
              key={tag}
              className='px-4 py-2 text-green bg-secondary rounded-full !border-0 font-medium text-sm hover:scale-105 transition-transform duration-200 cursor-pointer'
            >
              #{tag}
            </Tag>
          ))}
          {course.tags.length > 2 && (
            <Tag className='px-4 py-2 !bg-gray-100 rounded-full !border-0 font-medium text-sm hover:scale-105 transition-transform duration-200 cursor-pointer'>
              +{course.tags.length - 2}
            </Tag>
          )}
        </div>

        <div className='mt-auto flex items-center justify-between'>
          <span className='text-2xl font-bold text-green'>{formatCurrency(course.price)}</span>
          <span className='text-sm bg-secondary text-green px-3 py-1 rounded-full'>
            {course.category}
          </span>
        </div>
      </div>
    </div>
  );
};
