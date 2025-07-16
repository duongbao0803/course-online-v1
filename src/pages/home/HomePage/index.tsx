import CourseGrid from '@/components/course/CourseGrid';
import CourseModal from '@/components/course/CourseModal';
import CourseTabs from '@/components/course/CourseTabs';
import HeroSection from '@/components/course/HeroSection';
import { COMMON_CONSTANT } from '@/helpers/constants/common';
import React from 'react';
import { useHomePage } from './hooks/useHomePage';

const HomePage: React.FC = () => {
  const { state, handler } = useHomePage();
  const { CONDITION } = COMMON_CONSTANT;

  return (
    <section className='min-h-screen bg-gray-50'>
      <HeroSection
        searchTerm={state.searchTerm}
        priceFilter={state.priceFilter}
        searchLoading={state.searchLoading}
        suggestionsLoading={state.suggestionsLoading}
        onSearchTermChange={handler.setSearchTerm}
        onPriceFilterChange={handler.setPriceFilter}
        onSearch={handler.handleSearch}
        onFetchSuggestions={handler.handleSuggestions}
      />

      <div className='container mx-auto px-4 py-8'>
        <CourseTabs
          activeTab={state.activeTab}
          filteredCoursesCount={state.filteredCourses.length}
          favoritesCount={state.favorites.length}
          historyCount={state.viewHistory.length}
          suggestionsCount={state.suggestions.length}
          onTabChange={handler.setActiveTab}
        />

        <CourseGrid
          courses={handler.getDisplayCourses()}
          favorites={state.favorites}
          isLoading={state.isLoading}
          activeTab={state.activeTab}
          searchLoading={state.searchLoading}
          suggestionsLoading={state.suggestionsLoading}
          emptyMessage={handler.getEmptyMessage()}
          onViewDetail={handler.handleViewDetail}
          onFavoriteToggle={handler.handleFavoriteToggle}
        />
      </div>

      <CourseModal
        course={state.selectedCourse}
        visible={state.modalVisible}
        isFavorite={
          state.selectedCourse ? state.favorites.includes(state.selectedCourse.id) : CONDITION.FALSE
        }
        onClose={() => handler.setModalVisible(false)}
        onFavoriteToggle={handler.handleFavoriteToggle}
      />
    </section>
  );
};

export default HomePage;
