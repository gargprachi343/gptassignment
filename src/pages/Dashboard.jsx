import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import Icon from '../components/common/Icon';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import useEvents from '../hooks/useEvents';
import EventList from '../components/events/EventList';
import EventFilters from '../components/events/EventFilters';
import CreateEventModal from '../components/events/CreateEventModal';
import Button from '../components/common/Button';
import FavoritesView from '../components/pages/FavoritesView';
import MessagesView from '../components/pages/MessagesView';
import HistoryView from '../components/pages/HistoryView';
import ReportsView from '../components/pages/ReportsView';
import SettingsView from '../components/pages/SettingsView';
import { getUpcomingEventsCount, getPastEventsCount, getThisMonthEventsCount, getCategoryCount } from '../utils/statsUtils';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const { events, loading, error, filters, updateFilters, deleteEvent, toggleFavorite } = useEvents();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [rightSidebarHovered, setRightSidebarHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    updateFilters({ category });
  };

  const filteredEvents = events.filter(event => {
    const query = searchQuery.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.category?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className={`min-h-screen flex relative ${isDarkMode ? 'dark bg-gray-900' : 'bg-neutral-gray'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeItem={activeMenuItem}
        onMenuClick={setActiveMenuItem}
      />

      <div className="flex-1 lg:ml-64 p-3 sm:p-4 lg:p-6 w-full relative group">
        <button
          data-menu-toggle
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-primary-red text-white rounded-lg shadow-lg hover:bg-primary-red-dark transition-colors"
          aria-label="Open menu"
        >
          <Icon name="menu" className="w-6 h-6" />
        </button>

        <TopBar onSearch={setSearchQuery} />

        {activeMenuItem === 'Dashboard' && (
          <>
            <EventFilters filters={filters} onFilterChange={updateFilters} />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-lg p-6 text-white flex-1 shadow-lg">
                <h2 className="text-2xl font-bold">Events</h2>
                <p className="text-white text-opacity-90 text-sm mt-1">Manage and explore all your events</p>
              </div>
              {isAdmin && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-red to-secondary-orange text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  aria-label="Create new event"
                >
                  <span className="flex items-center justify-center">
                    <Icon name="add" className="w-5 h-5 mr-2" />
                    <span>Create Event</span>
                  </span>
                </Button>
              )}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <EventList events={filteredEvents} loading={loading} onDelete={deleteEvent} onToggleFavorite={toggleFavorite} />

            {isAdmin && (
              <div className="xl:hidden mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-red">{filteredEvents.length}</div>
                    <div className="text-xs text-gray-600 mt-1">Total</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-orange">
                      {getUpcomingEventsCount(filteredEvents)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Upcoming</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-700">
                      {getPastEventsCount(filteredEvents)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Past</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeMenuItem === 'Events' && (
          <>
            <EventFilters filters={filters} onFilterChange={updateFilters} />
            <div className="mb-6 bg-gradient-to-r from-secondary-orange to-primary-red rounded-lg p-6 text-white shadow-lg">
              <h2 className="text-2xl font-bold">All Events</h2>
              <p className="text-white text-opacity-90 text-sm mt-1">Browse and manage your event collection</p>
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg" role="alert">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}
            <EventList events={filteredEvents} loading={loading} onDelete={deleteEvent} onToggleFavorite={toggleFavorite} />
          </>
        )}

        {activeMenuItem === 'Favorites' && <FavoritesView />}
        {activeMenuItem === 'Messages' && <MessagesView />}
        {activeMenuItem === 'History' && isAdmin && <HistoryView />}
        {activeMenuItem === 'Reports' && isAdmin && <ReportsView />}
        {activeMenuItem === 'Settings' && <SettingsView />}

        {showCreateModal && (
          <CreateEventModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => setShowCreateModal(false)}
          />
        )}
      </div>

      {isAdmin && (
        <>
          <div 
            onMouseEnter={() => setRightSidebarHovered(true)}
            className="hidden xl:flex fixed right-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <button
              onMouseEnter={() => setRightSidebarHovered(true)}
              className="bg-primary-red text-white p-3 rounded-l-lg shadow-lg hover:bg-primary-red-dark transition-all duration-200 flex items-center justify-center group"
              title="Click or hover to view stats"
              aria-label="View statistics"
            >
              <Icon name="info" className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          <div 
            onMouseEnter={() => setRightSidebarHovered(true)}
            onMouseLeave={() => setRightSidebarHovered(false)}
            className={`
              hidden xl:flex flex-col xl:w-80 bg-white border-l border-gray-200 p-4 xl:p-6 overflow-y-auto fixed right-0 top-0 h-screen
              transition-transform duration-300 ease-in-out z-20 shadow-lg
              ${rightSidebarHovered ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="space-y-4 xl:space-y-6">
              <div className="bg-gradient-to-br from-primary-red-light to-secondary-orange-light rounded-lg p-3 xl:p-4">
                <h3 className="text-xs xl:text-sm font-medium text-primary-red mb-2">Total Events</h3>
                <p className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary-red to-secondary-orange bg-clip-text text-transparent">{filteredEvents.length}</p>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 mb-3 xl:mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Upcoming</span>
                    <span className="font-semibold text-gray-900">
                      {getUpcomingEventsCount(filteredEvents)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Past</span>
                    <span className="font-semibold text-gray-900">
                      {getPastEventsCount(filteredEvents)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold text-gray-900">
                      {getThisMonthEventsCount(filteredEvents)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 mb-3 xl:mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Workshop', 'Talk', 'Campaign'].map((category) => {
                    const count = getCategoryCount(filteredEvents, category);
                    const isActive = filters.category === category;
                    return (
                      <div 
                        key={category} 
                        onClick={() => handleCategoryClick(category)}
                        className={`
                          flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors
                          ${isActive 
                            ? 'bg-secondary-orange-light' 
                            : 'hover:bg-gray-50'
                          }
                        `}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCategoryClick(category);
                          }
                        }}
                        aria-label={`Filter by ${category} category`}
                      >
                        <span className={`text-gray-700 ${isActive ? 'font-medium' : ''}`}>{category}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isActive 
                            ? 'bg-secondary-orange text-white' 
                            : 'bg-secondary-orange-light text-secondary-orange-dark'
                        }`}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
