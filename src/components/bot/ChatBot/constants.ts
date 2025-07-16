import { BookOpen, Briefcase, DollarSign, MessageCircle } from 'lucide-react';

export const CHAT_BOT_CONSTANTS = {
  BOT_RES: {
    'khóa học':
      'Chúng tôi có các khóa học: Lập trình Web, Mobile App, AI, Digital Marketing, UI/UX Design. Tất cả có chứng chỉ khi hoàn thành.',
    'lập trình':
      'Khóa học lập trình: JavaScript, React, Python, Java. Thời gian 8-12 tuần, có mentor hỗ trợ.',
    giá: 'Giá khóa học từ 500K - 2M VND. Có chương trình ưu đãi và trả góp 0% lãi suất.',
    'thời gian': 'Thời gian học linh hoạt 4-12 tuần. Có thể học part-time hoặc full-time.',
    'chứng chỉ': 'Chứng chỉ được công nhận bởi doanh nghiệp, có thể xác thực online.',
    'việc làm': 'Tỷ lệ có việc làm 95%, hỗ trợ kết nối với 200+ doanh nghiệp đối tác.',
    default:
      'Tôi có thể giúp bạn tìm hiểu về khóa học, giá cả, thời gian học, chứng chỉ và việc làm. Bạn muốn biết gì?',
  },

  QUICK_OPTIONS: [
    {
      id: 'courses',
      text: 'Khóa học có sẵn',
      icon: BookOpen,
      query: 'khóa học',
    },
    {
      id: 'programming',
      text: 'Lập trình',
      icon: MessageCircle,
      query: 'lập trình',
    },
    {
      id: 'price',
      text: 'Giá cả',
      icon: DollarSign,
      query: 'giá',
    },

    {
      id: 'job',
      text: 'Việc làm',
      icon: Briefcase,
      query: 'việc làm',
    },
  ],
};
