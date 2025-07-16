import { CustomModal } from '@/components/common';
import { Colors } from '@/helpers/constants/color';
import { COMMON_CONSTANT } from '@/helpers/constants/common';
import { formatCurrency } from '@/helpers/libs';
import { showToast } from '@/helpers/libs/showToast';
import type { CourseModalProps } from '@/helpers/types/course.types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Clock, MessageCircle, Play, Smartphone, Star, Target, Trophy, Users } from 'lucide-react';
import React, { memo } from 'react';
import InfoRow from './components/InfoRow';
import SectionTitle from './components/SectionTitle';
import { COURSE_MODAL_TRANSLATE } from './translate';

const CourseModal: React.FC<CourseModalProps> = memo(
  ({ course, visible, isFavorite, onClose, onFavoriteToggle }) => {
    const { EMPTY_STRING } = COMMON_CONSTANT;
    const { CONTENT } = COURSE_MODAL_TRANSLATE;
    if (!course) return null;

    const features = [
      {
        icon: <Target className='w-5 h-5 text-blue-600' />,
        title: COURSE_MODAL_TRANSLATE.CONTENT.FEATURES.PRACTICE,
        desc: 'Dự án thực tế',
        bgColor: 'bg-blue-50',
      },
      {
        icon: <Trophy className='w-5 h-5 text-yellow-600' />,
        title: CONTENT.FEATURES.CERTIFICATE,
        desc: 'Được công nhận',
        bgColor: 'bg-yellow-50',
      },
      {
        icon: <MessageCircle className='w-5 h-5 text-green-600' />,
        title: CONTENT.FEATURES.SUPPORT,
        desc: 'Giải đáp 24/7',
        bgColor: 'bg-green-50',
      },
      {
        icon: <Smartphone className='w-5 h-5 text-purple-600' />,
        title: CONTENT.FEATURES.FLEXIBILITY,
        desc: 'Học mọi lúc',
        bgColor: 'bg-purple-50',
      },
    ];

    const courseStats = [
      {
        icon: <Clock className='w-4 h-4 text-white' />,
        label: CONTENT.STATS.DURATION,
        value: course.duration || EMPTY_STRING,
      },
      {
        icon: <Users className='w-4 h-4 text-white' />,
        label: CONTENT.STATS.STUDENTS,
        value: course.studentCount || EMPTY_STRING,
      },
      {
        icon: <Play className='w-4 h-4 text-white' />,
        label: CONTENT.STATS.LESSONS,
        value: course.lessonCount || EMPTY_STRING,
      },
    ];

    return (
      <CustomModal
        title={null}
        visible={visible}
        onCancel={onClose}
        centered
        width={1200}
        footer={null}
        className='course-modal'
      >
        <div className='h-full flex flex-col overflow-hidden bg-white rounded-2xl'>
          <div className='relative h-56 flex-shrink-0 overflow-hidden'>
            <img src={course.image} alt={course.name} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />
            <div className='absolute top-6 left-6'>
              <div className='bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg'>
                <span className='text-gray-800 font-semibold text-sm'>{course.category}</span>
              </div>
            </div>
            <div className='absolute bottom-6 left-6 right-6 text-white'>
              <div className='flex gap-2 items-center'>
                <h2 className='text-3xl font-bold mb-2 leading-tight drop-shadow-lg'>
                  {course.name}
                </h2>
                <div className=''>
                  <div className='bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg'>
                    <Star className='w-4 h-4 text-yellow-500 fill-current' />
                    <span className='text-gray-800 font-semibold text-sm'>{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 text-sm'>
                {courseStats.map((stat, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1'
                  >
                    {stat.icon}
                    <span className='font-medium'>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <div className='p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 space-y-8'>
                  <div>
                    <SectionTitle title={CONTENT.INTRO_COURSE} />
                    <div className='bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-2xl border border-green-100/50'>
                      <p className='text-gray-700 leading-relaxed text-base'>
                        {course.fullDescription}
                      </p>
                    </div>
                  </div>
                  <div>
                    <SectionTitle title={CONTENT.SPECIAL_FEATURES} />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className='group bg-white cursor-pointer p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1'
                        >
                          <div className='flex items-center gap-4'>
                            <div
                              className={`${feature.bgColor} rounded-2xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              {feature.icon}
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-bold text-lg text-gray-800 mb-1 group-hover:text-green-600 transition-colors'>
                                {feature.title}
                              </h4>
                              <p className='text-sm text-gray-600 leading-relaxed'>
                                {feature.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <SectionTitle title={CONTENT.RELATE_TOPICS} />
                    <div className='flex flex-wrap gap-3'>
                      {course.tags.map((tag: string) => (
                        <Tag
                          key={tag}
                          className='px-4 py-2 text-green bg-secondary rounded-full !border-0 font-medium text-sm hover:scale-105 transition-transform duration-200 cursor-pointer'
                        >
                          #{tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-1'>
                  <div className='sticky top-0'>
                    <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden'>
                      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/10 to-green-500/10 rounded-full -translate-y-8 translate-x-8' />
                      <div className='text-center mb-8 relative z-10'>
                        <p className='text-sm text-gray-500 mb-2 font-medium'>
                          {CONTENT.COURSE_PRICE}
                        </p>
                        <div className='flex items-center justify-center gap-2 mb-4'>
                          <span className='text-4xl font-bold text-[#16b53b] bg-clip-text'>
                            {formatCurrency(course.price)}
                          </span>
                        </div>
                      </div>
                      <div className='space-y-2 mb-6'>
                        <InfoRow
                          label={CONTENT.STATS.DURATION}
                          value={course?.duration ?? EMPTY_STRING}
                        />
                        <InfoRow
                          label={CONTENT.STATS.LESSONS}
                          value={`${course?.lessonCount ?? EMPTY_STRING} bài`}
                        />
                        <InfoRow
                          label={CONTENT.STATS.LEVEL}
                          value={course?.level ?? EMPTY_STRING}
                        />
                        <InfoRow
                          label={CONTENT.STATS.LANGUAGE}
                          value={course?.language ?? EMPTY_STRING}
                        />
                      </div>
                      <div className='space-y-4 relative z-10'>
                        <Button
                          type='primary'
                          size='large'
                          block
                          className='h-14 font-bold rounded-2xl text-base shadow-lg hover:shadow-xl transition-all duration-300 border-0'
                          onClick={() => showToast('info', 'Chức năng này đang được phát triển')}
                        >
                          <span className='flex items-center justify-center gap-2'>
                            {CONTENT.ENROLL_BUTTON}
                          </span>
                        </Button>
                        <Button
                          size='large'
                          block
                          icon={
                            isFavorite ? (
                              <HeartFilled className='text-red-500' />
                            ) : (
                              <HeartOutlined />
                            )
                          }
                          onClick={e => onFavoriteToggle(course.id, e)}
                          className='h-14 font-bold rounded-2xl text-base transition-all duration-300 hover:scale-105'
                          style={{
                            borderColor: isFavorite ? Colors.colors.red : Colors.colors.lightGray,
                            color: isFavorite ? Colors.colors.red : Colors.colors.gray,
                            borderWidth: '1px',
                          }}
                        >
                          {isFavorite ? CONTENT.FAVORITED_BUTTON : CONTENT.FAVORITE_BUTTON}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    );
  },
);

export default CourseModal;
