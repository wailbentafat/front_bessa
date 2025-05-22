# Front Bessa - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [Development Setup](#development-setup)
6. [Deployment](#deployment)
7. [Architecture](#architecture)
8. [Best Practices](#best-practices)

## Project Overview
Front Bessa is a modern real estate and property management web application built with Next.js 15.1.0. The application provides features for property viewing, land selling, recruitment, and interactive maps.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Database**: Supabase
- **Maps**: Mapbox GL and Leaflet
- **UI Components**: Radix UI
- **Animations**: Framer Motion

### Key Dependencies
- `@supabase/supabase-js`: Database and authentication
- `@tanstack/react-query`: Data fetching and caching
- `react-hook-form`: Form handling
- `zod`: Schema validation
- `mapbox-gl` & `leaflet`: Map functionality
- `recharts`: Data visualization
- `framer-motion`: Animations

## Project Structure

```
front_bessa/
├── app/                    # Next.js app directory
│   ├── recruitment/       # Recruitment section
│   ├── sell-your-land/    # Land selling section
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── map/              # Map functionality
│   └── projects/         # Projects section
├── components/            # React components
│   ├── ui/              # Reusable UI components
│   ├── animations/      # Animation components
│   ├── contact/         # Contact form components
│   ├── home/            # Home page components
│   ├── layout/          # Layout components
│   └── map/             # Map-related components
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
├── styles/              # Global styles
├── types/               # TypeScript type definitions
└── validators/          # Form validation schemas
```

## Key Components

### 1. Layout Components
- `layout.tsx`: Main application layout
  - Handles global layout structure
  - Manages meta tags and SEO
  - Provides global styles and fonts
- `theme-provider.tsx`: Theme management (light/dark mode)
  - Implements next-themes for theme switching
  - Provides theme context to all components
  - Handles theme persistence

### 2. Feature Components

#### Design Showcase (`design-showcase.tsx`)
A sophisticated image gallery component with the following features:
- Tabbed interface for different room categories (Living Spaces, Kitchens, Bedrooms, Bathrooms)
- Auto-rotating image carousel with 3-second intervals
- Interactive navigation controls
- Hover pause functionality
- Smooth transitions using Framer Motion
- Responsive image loading with Next.js Image component
- Accessibility features including ARIA labels
- Gradient overlays for text readability

```typescript
// Key features implementation
const [activeTab, setActiveTab] = useState("living")
const [currentIndex, setCurrentIndex] = useState(0)
const [isHovering, setIsHovering] = useState(false)

// Auto-rotation logic
useEffect(() => {
  if (!isHovering) {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCategory.images.length)
    }, 3000)
    return () => clearTimeout(timer)
  }
}, [currentIndex, activeTab, isHovering])
```

#### Floor Plan Viewer (`floor-plan-viewer.tsx`)
- Interactive floor plan visualization
- Zoom and pan controls
- Room highlighting on hover
- Responsive design for all screen sizes

#### Project Card (`project-card.tsx`)
- Displays property information in a card format
- Image gallery with thumbnails
- Property details and specifications
- Call-to-action buttons
- Responsive layout

### 3. UI Components
Located in `components/ui/`, these are reusable components built with Radix UI and styled with Tailwind CSS:

#### Form Components
- `form.tsx`: Form handling with React Hook Form and Zod validation
- `input.tsx`: Text input with validation and error states
- `textarea.tsx`: Multi-line text input
- `select.tsx`: Dropdown selection with search and multi-select
- `checkbox.tsx`: Checkbox input with custom styling
- `radio-group.tsx`: Radio button group
- `input-otp.tsx`: One-time password input
- `slider.tsx`: Range slider with custom styling

#### Navigation Components
- `navigation-menu.tsx`: Main navigation menu
- `sidebar.tsx`: Responsive sidebar navigation
- `breadcrumb.tsx`: Navigation breadcrumbs
- `pagination.tsx`: Page navigation
- `tabs.tsx`: Tabbed interface
- `menubar.tsx`: Application menu bar
- `dropdown-menu.tsx`: Dropdown menu with submenus
- `context-menu.tsx`: Right-click context menu

#### Feedback Components
- `alert.tsx`: Alert messages
- `alert-dialog.tsx`: Alert dialog with actions
- `toast.tsx`: Toast notifications
- `toaster.tsx`: Toast container
- `progress.tsx`: Progress indicator
- `skeleton.tsx`: Loading skeleton

#### Data Display Components
- `table.tsx`: Data table with sorting and filtering
- `card.tsx`: Content card with header and footer
- `carousel.tsx`: Image carousel with controls
- `chart.tsx`: Data visualization charts
- `badge.tsx`: Status badges
- `avatar.tsx`: User avatar
- `calendar.tsx`: Date picker calendar

#### Layout Components
- `aspect-ratio.tsx`: Maintain aspect ratio
- `separator.tsx`: Visual separator
- `scroll-area.tsx`: Custom scrollable area
- `resizable.tsx`: Resizable panels
- `sheet.tsx`: Bottom sheet
- `drawer.tsx`: Side drawer
- `dialog.tsx`: Modal dialog
- `popover.tsx`: Popover with arrow
- `hover-card.tsx`: Card on hover
- `tooltip.tsx`: Tooltip with arrow

#### Interactive Components
- `button.tsx`: Button with variants
- `toggle.tsx`: Toggle switch
- `toggle-group.tsx`: Group of toggles
- `switch.tsx`: Switch component
- `accordion.tsx`: Collapsible sections
- `collapsible.tsx`: Collapsible content
- `command.tsx`: Command palette

### UI Component Features

#### 1. Accessibility
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

#### 2. Theming
- Dark/light mode support
- Custom color schemes
- Consistent spacing
- Typography system

#### 3. Responsive Design
- Mobile-first approach
- Breakpoint system
- Fluid typography
- Adaptive layouts

#### 4. Performance
- Lazy loading
- Code splitting
- Optimized re-renders
- Bundle size optimization

### UI Component Best Practices

#### 1. Component Structure
```typescript
// Example of a reusable button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
```

#### 2. Form Handling
```typescript
// Example of form component with validation
const Form = ({ schema, onSubmit, defaultValues }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="field"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  )
}
```

#### 3. Theme Integration
```typescript
// Example of theme-aware component
const ThemedComponent = ({ className, ...props }) => {
  const { theme } = useTheme()
  
  return (
    <div
      className={cn(
        "bg-background text-foreground",
        theme === "dark" ? "dark-theme-styles" : "light-theme-styles",
        className
      )}
      {...props}
    />
  )
}
```

#### 4. Responsive Design
```typescript
// Example of responsive component
const ResponsiveComponent = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full",
        "sm:max-w-sm",
        "md:max-w-md",
        "lg:max-w-lg",
        "xl:max-w-xl",
        className
      )}
      {...props}
    />
  )
}
```

### 4. Map Components
Located in `components/map/`:

#### Map Component (`map_comp.tsx`)
A sophisticated property map implementation with the following features:

- Dynamic loading of Leaflet map component
- Interactive property markers
- Property details card with:
  - Property image
  - Name and location
  - Status badge
  - Key details (price, type, size, bedrooms)
  - Call-to-action button
- Responsive design for all screen sizes
- Smooth animations and transitions

```typescript
// Dynamic map loading with loading state
const LeafletMap = dynamic(() => import("./leafletmap").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full rounded-lg overflow-hidden border bg-slate-100 flex items-center justify-center">
      <div className="animate-pulse">Chargement de la carte...</div>
    </div>
  ),
})

// Property details card implementation
<Card className="shadow-lg">
  <CardContent className="p-4">
    <div className="flex gap-3">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-bold">{project.name}</h3>
        <div className="text-sm text-muted-foreground flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {project.location}
        </div>
        <Badge className="mt-1" variant="outline">
          {project.status}
        </Badge>
      </div>
    </div>
  </CardContent>
</Card>
```

#### Leaflet Map Implementation (`leafletmap.tsx`)
- Custom Leaflet map implementation
- Property marker clustering
- Custom marker icons
- Interactive popups
- Zoom and pan controls
- Geolocation support

#### Map Styling (`leaflet-styles.css`)
- Custom map styles
- Marker animations
- Popup styling
- Control button styling

### Map Component Features

#### 1. Property Filtering
- Filter properties by:
  - Price range
  - Property type
  - Number of bedrooms
  - Location
  - Status

#### 2. Interactive Features
- Click on markers to view property details
- Hover effects on markers
- Smooth transitions between states
- Responsive design for mobile and desktop

#### 3. Performance Optimizations
- Dynamic loading of map component
- Lazy loading of property images
- Efficient marker clustering
- Optimized re-renders

#### 4. Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### 5. Animation Components
Located in `components/animations/`:

#### Fade In Animation (`fade-in.tsx`)
- Smooth fade-in effect for elements
- Configurable delay and duration
- Support for different animation directions
- Intersection Observer integration

```typescript
// Fade in animation implementation
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
      },
    },
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
```

#### Stats Counter (`statscounter.tsx`)
- Animated number counter
- Smooth counting animation
- Configurable duration and easing
- Support for different number formats

#### Feature Scroll (`feature-scroll.tsx`)
- Scroll-triggered animations
- Staggered reveal effects
- Responsive design
- Performance optimized

#### Horizontal Scroll (`horizontalscrol.tsx`)
- Smooth horizontal scrolling
- Touch and mouse support
- Momentum scrolling
- Responsive design

#### Image Gallery (`image-gallerie.tsx`)
- Image carousel with animations
- Touch and swipe support
- Lazy loading
- Responsive design

#### Parallax Scroll (`parallax-scroll.tsx`)
- Smooth parallax scrolling effect
- Configurable speed and direction
- Performance optimized
- Mobile-friendly

#### Scroll Reveal (`scrollreveal.tsx`)
- Elements reveal on scroll
- Configurable threshold
- Multiple animation variants
- Intersection Observer based

#### Sequential Reveal (`sequnatielreveal.tsx`)
- Staggered reveal of elements
- Configurable delay between items
- Multiple animation variants
- Responsive design

#### Stagger In (`stagger-in.tsx`)
- Staggered entrance animation
- Configurable delay and duration
- Multiple animation variants
- Performance optimized

### Animation Features

#### 1. Performance Optimizations
- Uses `will-change` for better performance
- Implements `transform` instead of position properties
- Lazy loads animations when in viewport
- Optimizes re-renders

#### 2. Accessibility
- Respects reduced motion preferences
- Provides fallbacks for no-JS environments
- Maintains focus management
- Screen reader friendly

#### 3. Responsive Design
- Adapts to different screen sizes
- Touch-friendly on mobile devices
- Maintains performance across devices
- Graceful degradation

#### 4. Customization
- Configurable animation parameters
- Multiple animation variants
- Easy to extend and modify
- Theme integration

### Animation Best Practices

#### 1. Performance
```typescript
// Use transform instead of position properties
const variants = {
  hidden: { transform: 'translateY(20px)' },
  visible: { transform: 'translateY(0)' }
}

// Use will-change for better performance
<motion.div
  style={{ willChange: 'transform, opacity' }}
  variants={variants}
>
  {children}
</motion.div>
```

#### 2. Accessibility
```typescript
// Respect reduced motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const variants = {
  hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
  visible: prefersReducedMotion ? {} : { opacity: 1, y: 0 }
}
```

#### 3. Responsive Design
```typescript
// Responsive animation parameters
const getAnimationParams = () => {
  if (window.innerWidth < 768) {
    return { duration: 0.3, delay: 0.1 }
  }
  return { duration: 0.5, delay: 0.2 }
}
```

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- Yarn or npm
- Git

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:
   - Create `.env.local` file
   - Add required environment variables

### Development Commands
```bash
yarn dev        # Start development server
yarn build      # Build for production
yarn start      # Start production server
yarn lint       # Run linting
```

## Architecture

### Frontend Architecture
- **App Router**: Uses Next.js 13+ App Router for routing
- **Component Structure**: Modular components with clear separation of concerns
- **State Management**: React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom configurations

### Data Flow
1. API calls through React Query
2. Form handling with React Hook Form
3. Data validation with Zod
4. State updates and UI rendering

## Best Practices

### Code Organization
- Components are organized by feature and functionality
- Shared components are placed in the `ui` directory
- Custom hooks are stored in the `hooks` directory
- Types and interfaces are centralized in the `types` directory

### Performance Optimization
- Image optimization using Next.js Image component
- Code splitting and lazy loading
- Efficient data fetching with React Query
- Optimized animations with Framer Motion

### Security
- Environment variables for sensitive data
- Form validation on both client and server
- Secure API routes
- Protected routes for authenticated users

## Deployment

### Production Build
1. Run build command:
   ```bash
   yarn build
   ```
2. Test production build locally:
   ```bash
   yarn start
   ```

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN`

## Maintenance

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Regular dependency updates

### Testing
- Component testing
- Integration testing
- End-to-end testing

### Monitoring
- Error tracking
- Performance monitoring
- User analytics

## Contributing
1. Create a feature branch
2. Make changes
3. Submit a pull request
4. Code review
5. Merge to main branch

## Support
For any issues or questions, please contact the development team or create an issue in the repository. 

## Component Architecture

### State Management
- Local state using React hooks
- Global state with React Query for server state
- Form state with React Hook Form
- Theme state with next-themes

### Data Flow
1. API calls through React Query
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['property'],
     queryFn: fetchPropertyData
   })
   ```

2. Form handling with React Hook Form
   ```typescript
   const form = useForm({
     resolver: zodResolver(propertySchema),
     defaultValues: {
       // ...
     }
   })
   ```

3. Data validation with Zod
   ```typescript
   const propertySchema = z.object({
     title: z.string().min(1),
     price: z.number().positive(),
     // ...
   })
   ```

### Performance Optimization
- Image optimization using Next.js Image component
  ```typescript
  <Image
    src={imageUrl}
    alt={altText}
    width={800}
    height={600}
    priority={isPriority}
  />
  ```
- Code splitting and lazy loading
  ```typescript
  const DynamicComponent = dynamic(() => import('./HeavyComponent'))
  ```
- Efficient data fetching with React Query
- Optimized animations with Framer Motion
  ```typescript
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Content */}
  </motion.div>
  ``` 