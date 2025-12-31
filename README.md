# Events Management - Frontend

React-based frontend application for events management with role-based access control. Features a modern three-column layout with warm color palette (red, orange, peach) and fully functional interactive components.

## 🎨 Design Theme

- **Primary Colors**: Red (#DC2626) and Orange (#F97316)
- **Accent Colors**: Peach (#FDBA74) and warm tones
- **Background**: White and Light Gray (#F3F4F6)
- **Design Style**: Three-column layout similar to FoodMeal design pattern

## 📁 Project Structure

```
src/
├── app/                    # App-level setup
│   └── App.jsx            # Main app component with providers
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   │   ├── LoginPortal.jsx    # Role selection login page
│   │   └── RoleBadge.jsx      # User role display badge
│   ├── common/          # Common UI components
│   │   ├── Button.jsx         # Reusable button component
│   │   ├── Input.jsx          # Form input component
│   │   ├── Loader.jsx         # Loading spinner
│   │   ├── Navbar.jsx         # Navigation bar (legacy)
│   │   ├── Sidebar.jsx        # Left sidebar navigation
│   │   ├── TopBar.jsx         # Top bar with search and notifications
│   │   └── EmptyState.jsx     # Empty state component
│   └── events/          # Event-related components
│       ├── EventList.jsx      # Events grid list
│       ├── EventCard.jsx      # Individual event card
│       ├── EventFilters.jsx   # Filter controls
│       └── CreateEventModal.jsx # Create event modal (Admin)
├── context/             # Global state management
│   ├── AuthContext.jsx  # Authentication state
│   └── EventContext.jsx # Events state
├── hooks/               # Custom React hooks
│   ├── useAuth.js      # Auth context hook
│   ├── useEvents.js    # Events context hook
│   └── useLocalStorage.js # LocalStorage hook
├── pages/               # Page-level components
│   └── Dashboard.jsx   # Main dashboard with three-column layout
├── services/            # API service layer
│   ├── authService.js  # Auth API calls (ready for backend)
│   └── eventsService.js # Events API calls (ready for backend)
├── styles/              # Global styles
│   └── index.css       # Tailwind CSS imports
└── utils/               # Utility functions
    ├── constants.js    # App constants
    ├── dateUtils.js    # Date formatting utilities
    └── validators.js   # Form validation functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the frontend directory (optional):

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Features

### Authentication
- ✅ Role-based login (User/Admin)
- ✅ Session persistence across page refreshes
- ✅ Clean logout with state reset
- ✅ Beautiful login portal with role selection

### Events Management
- ✅ View events in responsive grid layout
- ✅ Filter by category (Workshop, Talk, Campaign)
- ✅ Filter by time (All, Upcoming, Past)
- ✅ Create events (Admin only) with validation
- ✅ Delete events (Admin only) with confirmation
- ✅ Real-time filter updates
- ✅ Clear all filters functionality

### UI/UX Features
- ✅ **Three-column layout**:
  - Left sidebar with navigation menu
  - Central content area with events
  - Right sidebar with stats and quick filters
- ✅ **Interactive sidebar navigation** with active state tracking
- ✅ **Search functionality** in top bar
- ✅ **Notification and message buttons** with badge counts
- ✅ **Category quick filters** in right sidebar
- ✅ **Clickable event cards** for future detail views
- ✅ **Smooth transitions** and hover effects
- ✅ **Loading states** for async operations
- ✅ **Error handling** with user-friendly messages
- ✅ **Empty states** with helpful messages

### Design Features
- ✅ Warm color palette (red, orange, peach)
- ✅ Gradient backgrounds and accents
- ✅ Rounded corners and modern shadows
- ✅ Responsive design for all screen sizes
- ✅ Consistent spacing and typography
- ✅ Custom scrollbar styling

### Accessibility
- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly

## 🔌 Backend Integration

The frontend is designed to easily integrate with the backend. Here's what you need to do:

### 1. Update Service Files

The service files (`authService.js` and `eventsService.js`) currently have mock implementations. When the backend is ready:

1. **Uncomment the API calls** in `src/services/authService.js`:
   - Remove mock implementations
   - Uncomment the axios calls

2. **Uncomment the API calls** in `src/services/eventsService.js`:
   - Remove mock implementations
   - Uncomment the axios calls

### 2. API Endpoints Expected

The frontend expects the following backend endpoints:

#### Authentication
- `POST /api/auth/login` - Login with role
  - Body: `{ role: 'user' | 'admin' }`
  - Response: `{ sessionId: string, role: string }`
- `GET /api/auth/me` - Get current user (requires `X-Session-Id` header)
  - Response: `{ role: string }`
- `POST /api/auth/logout` - Logout (requires `X-Session-Id` header)

#### Events
- `GET /api/events?category=...&timeFilter=...` - Get events
  - Headers: `X-Session-Id`, `X-User-Role`
  - Query params: `category` (optional), `timeFilter` (optional)
  - Response: `Array<Event>`
- `POST /api/events` - Create event (Admin only)
  - Headers: `X-Session-Id`, `X-User-Role`
  - Body: `{ title: string, date: string, location: string, category: string }`
  - Response: `Event`
- `DELETE /api/events/:id` - Delete event (Admin only)
  - Headers: `X-Session-Id`, `X-User-Role`
  - Response: `{ message: string }`

### 3. Headers Required

All API requests should include:
- `X-Session-Id`: Session ID from localStorage
- `X-User-Role`: User role (for admin-only endpoints)

## 🎨 Color Palette

The application uses a warm color scheme:

- **Primary Red**: `#DC2626` - Main brand color, sidebar background
- **Primary Red Light**: `#FEE2E2` - Light backgrounds
- **Primary Red Dark**: `#B91C1C` - Hover states
- **Secondary Orange**: `#F97316` - Accent color, buttons
- **Secondary Orange Light**: `#FFEDD5` - Light backgrounds, highlights
- **Secondary Orange Dark**: `#EA580C` - Darker accents
- **Accent Peach**: `#FDBA74` - Warm accent tones
- **Accent Coral**: `#FF8A80` - Coral accents

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Component Functionality

#### Sidebar (`components/common/Sidebar.jsx`)
- ✅ Active menu item tracking
- ✅ Click handlers for navigation
- ✅ Logout functionality
- ✅ Role badge display

#### Top Bar (`components/common/TopBar.jsx`)
- ✅ User greeting with role
- ✅ Search bar with submit handler
- ✅ Notification button with badge
- ✅ Message button with badge
- ✅ User profile avatar

#### Event Filters (`components/events/EventFilters.jsx`)
- ✅ Category dropdown filter
- ✅ Time filter (All/Upcoming/Past)
- ✅ Clear all filters button
- ✅ Real-time filter updates

#### Event Cards (`components/events/EventCard.jsx`)
- ✅ Clickable cards (ready for detail view)
- ✅ Delete button (Admin only)
- ✅ Category badges with colors
- ✅ Past event indicators
- ✅ Keyboard navigation support

#### Dashboard (`pages/Dashboard.jsx`)
- ✅ Three-column layout
- ✅ Category quick filters in right sidebar
- ✅ Real-time stats calculation
- ✅ Active filter highlighting

#### Create Event Modal (`components/events/CreateEventModal.jsx`)
- ✅ Form validation
- ✅ Date validation (no past dates)
- ✅ Category selection
- ✅ Error display
- ✅ Keyboard support (Escape to close)

## 📝 State Management

### Authentication State (`AuthContext`)
- Manages user role and session
- Persists to localStorage
- Provides login/logout functions
- Exposes `isAdmin`, `isUser`, `isAuthenticated` flags

### Events State (`EventContext`)
- Manages events list
- Handles filtering
- Provides create/delete functions
- Manages loading and error states

### Local Storage
- `sessionId` - Current session ID
- `role` - User role (user/admin)

## 🎯 User Roles & Capabilities

| Feature | User | Admin |
|---------|------|-------|
| View events | ✅ | ✅ |
| Filter events | ✅ | ✅ |
| Create events | ❌ | ✅ |
| Delete events | ❌ | ✅ |
| Search events | ✅ | ✅ |
| View stats | ✅ | ✅ |

## 🔄 Recent Changes

### Design Updates
- ✅ Changed color palette to warm tones (red, orange, peach)
- ✅ Implemented three-column layout (Sidebar, Content, Stats)
- ✅ Added sidebar navigation with active states
- ✅ Added top bar with search functionality
- ✅ Added right sidebar with stats and quick filters

### Functionality Updates
- ✅ Made all navigation items clickable with active state tracking
- ✅ Implemented "Clear All" filters button
- ✅ Added search bar in top bar
- ✅ Made category items in right sidebar clickable filters
- ✅ Added click handlers to event cards
- ✅ Enhanced notification and message buttons
- ✅ Improved keyboard navigation throughout

### Component Updates
- ✅ Created new `Sidebar.jsx` component
- ✅ Created new `TopBar.jsx` component
- ✅ Enhanced `EventFilters.jsx` with clear functionality
- ✅ Enhanced `EventCard.jsx` with click handlers
- ✅ Updated `Dashboard.jsx` with three-column layout

## 🐛 Known Issues / Future Enhancements

### Planned Features
- [ ] Event detail view/modal
- [ ] Search functionality implementation (currently shows alert)
- [ ] Notification system integration
- [ ] Message system integration
- [ ] Favorites functionality
- [ ] Event history view
- [ ] Reports generation
- [ ] Settings page

### Backend Integration
- [ ] Connect to real API endpoints
- [ ] Implement proper error handling
- [ ] Add request retry logic
- [ ] Implement request caching

## 📚 Code Structure

- **Context API**: Used for global state management (Auth and Events)
- **Custom Hooks**: Encapsulate reusable logic
- **Service Layer**: Abstracts API calls for easy backend integration
- **Component Organization**: Grouped by feature (auth, events, common)
- **Utility Functions**: Separated pure functions for reusability

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Extended Tailwind with app-specific color palette
- **Responsive Design**: Mobile-first approach
- **Custom Scrollbar**: Styled scrollbars matching theme

## 📝 Notes

- The app currently uses mock data for development
- All API calls are ready to be uncommented when backend is available
- State management is separated (Auth vs Events) for clarity
- All components are designed to be accessible and keyboard-navigable
- The design follows a three-column layout pattern similar to modern dashboard designs

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Environment Variables for Production

Set `REACT_APP_API_URL` to your production API URL before building.

## 📄 License

This project is created for evaluation purposes.
