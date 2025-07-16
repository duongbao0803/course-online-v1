export interface Course {
  studentCount: string;
  language: string;
  level: string;
  lessonCount: string;
  duration: string;
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  tags: string[];
}

export interface HeroSectionProps {
  searchTerm: string;
  priceFilter: string;
  searchLoading: boolean;
  suggestionsLoading: boolean;
  onSearchTermChange: (value: string) => void;
  onPriceFilterChange: (value: string) => void;
  onSearch: () => void;
  onFetchSuggestions: () => void;
}

export interface CourseTabsProps {
  activeTab: string;
  filteredCoursesCount: number;
  favoritesCount: number;
  historyCount: number;
  suggestionsCount: number;
  onTabChange: (key: string) => void;
}

export interface CourseModalProps {
  course: Course | undefined;
  visible: boolean;
  isFavorite: boolean;
  onClose: () => void;
  onFavoriteToggle: (courseId: string, e: React.MouseEvent) => void;
}

export interface CourseGridProps {
  courses: Course[];
  favorites: string[];
  isLoading: boolean;
  activeTab: string;
  searchLoading: boolean;
  suggestionsLoading: boolean;
  emptyMessage: string;
  onViewDetail: (course: Course) => void;
  onFavoriteToggle: (courseId: string, e: React.MouseEvent) => void;
}

export interface CourseCardProps {
  course: Course;
  isFavorite: boolean;
  onViewDetail: (course: Course) => void;
  onFavoriteToggle: (courseId: string, e: React.MouseEvent) => void;
}
