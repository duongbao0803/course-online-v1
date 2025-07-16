import { useAppQuery } from '@/helpers/hooks/useAppQuery';
import { showToast } from '@/helpers/libs/showToast';
import type { Course } from '@/helpers/types/course.types';
import { getAll } from '@/services/course';
import { message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useHomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useAppQuery(['courses'], getAll);
  const courses = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [priceFilter, setPriceFilter] = useState<string>(searchParams.get('price') || 'all');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<Course[]>([]);
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'all');

  const updateUrlParams = (newSearchTerm: string, newPriceFilter: string, newActiveTab: string) => {
    const params = new URLSearchParams();

    if (newSearchTerm) {
      params.set('search', newSearchTerm);
    }

    if (newPriceFilter !== 'all') {
      params.set('price', newPriceFilter);
    }

    if (newActiveTab !== 'all') {
      params.set('tab', newActiveTab);
    }

    setSearchParams(params);
  };

  const filterCourses = (searchTerm: string, priceFilter: string, courseList: Course[]) => {
    let filtered = courseList;

    if (searchTerm) {
      filtered = filtered.filter(
        (course: Course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter((course: Course) => {
        switch (priceFilter) {
          case 'under500k':
            return course.price < 500000;
          case '500k-1m':
            return course.price >= 500000 && course.price <= 1000000;
          case 'over1m':
            return course.price > 1000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  useEffect(() => {
    if (courses.length > 0) {
      const urlSearchTerm = searchParams.get('search') || '';
      const urlPriceFilter = searchParams.get('price') || 'all';
      const urlActiveTab = searchParams.get('tab') || 'all';

      setSearchTerm(urlSearchTerm);
      setPriceFilter(urlPriceFilter);
      setActiveTab(urlActiveTab);

      if (urlSearchTerm || urlPriceFilter !== 'all') {
        const filtered = filterCourses(urlSearchTerm, urlPriceFilter, courses);
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses(courses);
      }
    }
  }, [courses, searchParams]);

  useEffect(() => {
    if (courses.length === 0) return;

    const urlSearchTerm = searchParams.get('search') || '';
    const urlPriceFilter = searchParams.get('price') || 'all';
    const urlActiveTab = searchParams.get('tab') || 'all';

    if (urlSearchTerm !== searchTerm) {
      setSearchTerm(urlSearchTerm);
    }
    if (urlPriceFilter !== priceFilter) {
      setPriceFilter(urlPriceFilter);
    }
    if (urlActiveTab !== activeTab) {
      setActiveTab(urlActiveTab);
    }

    const filtered = filterCourses(urlSearchTerm, urlPriceFilter, courses);
    setFilteredCourses(filtered);
  }, [searchParams, courses]);

  const handleSearch = () => {
    setSearchLoading(true);
    const currentActiveTab = 'all';
    setActiveTab(currentActiveTab);

    updateUrlParams(searchTerm, priceFilter, currentActiveTab);

    setTimeout(() => {
      const filtered = filterCourses(searchTerm, priceFilter, courses);
      setFilteredCourses(filtered);
      setSearchLoading(false);
    }, 1200);
  };

  const handleViewDetail = (course: Course) => {
    setSelectedCourse(course);
    setModalVisible(true);

    if (!viewHistory.find(item => item.id === course.id)) {
      setViewHistory((prev: Course[]) => [course, ...prev.slice(0, 9)]);
    }
  };

  const handleFavoriteToggle = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev: string[]) => {
      if (prev.includes(courseId)) {
        showToast('success', 'Đã bỏ khỏi danh sách yêu thích');
        return prev.filter(id => id !== courseId);
      } else {
        showToast('success', 'Đã thêm vào danh sách yêu thích');
        return [...prev, courseId];
      }
    });
  };

  const handleSuggestions = async () => {
    setSuggestionsLoading(true);
    setActiveTab('suggestions');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const userCategories = viewHistory.map((course: Course) =>
        typeof course.category === 'string' ? course.category : '',
      );
      const favoriteCategories = favorites
        .map(fav => {
          const found = courses.find((c: Course) => c.id === fav) as Course | undefined;
          return found && typeof found.category === 'string' ? found.category : '';
        })
        .filter(Boolean) as string[];

      const allInterests = [...userCategories, ...favoriteCategories];

      let suggested = courses.filter(
        (course: Course) =>
          allInterests.includes(course.category) && !favorites.includes(course.id),
      );

      if (suggested.length === 0) {
        suggested = courses.filter((course: Course) => course.rating >= 4.5).slice(0, 3);
      }

      setSuggestions(suggested.slice(0, 4));
      message.success('Đã tải gợi ý thành công');
    } catch {
      message.error('Lỗi hệ thống');
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const getDisplayCourses = () => {
    switch (activeTab) {
      case 'favorites':
        return courses.filter((course: Course) => favorites.includes(course.id));
      case 'history':
        return viewHistory;
      case 'suggestions':
        return suggestions;
      default:
        return filteredCourses;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'favorites':
        return 'Chưa có khóa học yêu thích';
      case 'history':
        return 'Chưa có lịch sử xem';
      case 'suggestions':
        return 'Nhấn nút "Gợi ý AI" để nhận gợi ý phù hợp';
      default:
        return 'Không tìm thấy khóa học nào';
    }
  };

  const handleSetSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  const handleSetPriceFilter = (value: string) => {
    setPriceFilter(value);
    updateUrlParams(searchTerm, value, activeTab);

    const filtered = filterCourses(searchTerm, value, courses);
    setFilteredCourses(filtered);
  };

  const handleSetActiveTab = (value: string) => {
    setActiveTab(value);
    updateUrlParams(searchTerm, priceFilter, value);
  };

  return {
    state: {
      courses,
      isLoading,
      filteredCourses,
      searchTerm,
      priceFilter,
      searchLoading,
      selectedCourse,
      modalVisible,
      favorites,
      viewHistory,
      suggestions,
      suggestionsLoading,
      activeTab,
    },
    handler: {
      setSearchTerm: handleSetSearchTerm,
      setPriceFilter: handleSetPriceFilter,
      setActiveTab: handleSetActiveTab,
      setModalVisible,
      handleSearch,
      handleViewDetail,
      handleFavoriteToggle,
      handleSuggestions,
      getDisplayCourses,
      getEmptyMessage,
    },
  };
};

export { useHomePage };
