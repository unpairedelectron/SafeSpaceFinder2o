# UI Components Library - Complete Documentation

## Overview
This is a comprehensive UI component library built for the Safe Space Finder application. All components are built with TypeScript, Tailwind CSS, and Framer Motion for animations.

## Core Components

### 1. Button
A versatile button component with multiple variants and states.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `icon`: ReactNode
- `href`: string (makes it a link)

**Usage:**
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" icon={<Plus />}>
  Add Business
</Button>

<Button variant="outline" loading>
  Loading...
</Button>
```

### 2. Badge
Display status, categories, or labels with color-coded variants.

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'gradient'
- `removable`: boolean
- `onRemove`: () => void
- `icon`: ReactNode

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success" icon={<CheckCircle />}>
  Verified
</Badge>

<Badge variant="gradient" removable onRemove={() => {}}>
  LGBTQ+ Friendly
</Badge>
```

### 3. Card
Flexible container component with header, content, footer sections.

**Components:**
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Rainbow Café</CardTitle>
    <CardDescription>Coffee Shop • 0.2 miles away</CardDescription>
  </CardHeader>
  <CardContent>
    <p>A welcoming space for everyone...</p>
  </CardContent>
  <CardFooter>
    <Button>Visit</Button>
  </CardFooter>
</Card>
```

### 4. Input
Text input with label, error states, and icon support.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `icon`: ReactNode
- `disabled`: boolean
- All standard input props

**Usage:**
```tsx
import { Input } from '@/components/ui/Input';

<Input 
  label="Search"
  placeholder="Find safe spaces..."
  icon={<Search />}
  error="Required field"
/>
```

### 5. Select
Dropdown select component with custom styling.

**Props:**
- `options`: SelectOption[]
- `value`: string
- `onChange`: (value: string) => void
- `label`: string
- `error`: string
- `disabled`: boolean

**Usage:**
```tsx
import Select from '@/components/ui/Select';

<Select
  label="Category"
  options={[
    { value: 'cafe', label: 'Coffee Shop' },
    { value: 'restaurant', label: 'Restaurant' }
  ]}
  value={category}
  onChange={setCategory}
/>
```

### 6. Checkbox
Checkbox input with label and description.

**Props:**
- `checked`: boolean
- `onChange`: (checked: boolean) => void
- `label`: string
- `description`: string
- `disabled`: boolean

**Usage:**
```tsx
import Checkbox from '@/components/ui/Checkbox';

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="LGBTQ+ Friendly"
  description="This space welcomes LGBTQ+ individuals"
/>
```

### 7. Radio
Radio group component for single selection.

**Props:**
- `options`: RadioOption[]
- `value`: string
- `onChange`: (value: string) => void
- `name`: string
- `label`: string
- `orientation`: 'vertical' | 'horizontal'

**Usage:**
```tsx
import RadioGroup from '@/components/ui/Radio';

<RadioGroup
  name="safety"
  label="Safety Level"
  options={[
    { value: 'high', label: 'High', description: '90-100%' },
    { value: 'medium', label: 'Medium', description: '70-89%' }
  ]}
  value={safety}
  onChange={setSafety}
/>
```

### 8. Modal
Accessible modal dialog with backdrop and animations.

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `children`: ReactNode

**Usage:**
```tsx
import { Modal } from '@/components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Write a Review"
  size="lg"
>
  <div>Modal content here</div>
</Modal>
```

### 9. Tabs
Tabbed interface component with Radix UI.

**Components:**
- `Tabs`: Container
- `TabsList`: Tab buttons container
- `TabsTrigger`: Individual tab button
- `TabsContent`: Tab panel content

**Usage:**
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="reviews">
    Reviews content
  </TabsContent>
</Tabs>
```

### 10. Dropdown
Advanced dropdown menu with Radix UI.

**Components:**
- `Dropdown`: Container
- `DropdownTrigger`: Trigger button
- `DropdownContent`: Dropdown panel
- `DropdownItem`: Menu item
- `DropdownSeparator`: Visual separator
- `DropdownLabel`: Section label

**Usage:**
```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/ui/Dropdown';

<Dropdown>
  <DropdownTrigger>Options</DropdownTrigger>
  <DropdownContent>
    <DropdownItem icon={<Edit />}>Edit</DropdownItem>
    <DropdownItem icon={<Trash />} variant="danger">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### 11. Avatar
User avatar with fallback initials.

**Props:**
- `src`: string
- `alt`: string
- `fallback`: string
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

**Usage:**
```tsx
import Avatar from '@/components/ui/Avatar';

<Avatar
  src="/avatar.jpg"
  fallback="AJ"
  size="lg"
/>
```

### 12. Progress
Progress bar with labels and variants.

**Props:**
- `value`: number
- `max`: number (default: 100)
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'default' | 'success' | 'warning' | 'danger'
- `showLabel`: boolean
- `label`: string

**Usage:**
```tsx
import Progress from '@/components/ui/Progress';

<Progress
  value={75}
  label="Accessibility Score"
  showLabel
  variant="success"
/>
```

### 13. Slider
Range slider for numeric input.

**Props:**
- `value`: number
- `onChange`: (value: number) => void
- `min`: number
- `max`: number
- `step`: number
- `label`: string
- `showValue`: boolean
- `formatValue`: (value: number) => string

**Usage:**
```tsx
import Slider from '@/components/ui/Slider';

<Slider
  value={distance}
  onChange={setDistance}
  min={0}
  max={50}
  label="Distance"
  showValue
  formatValue={(v) => `${v} miles`}
/>
```

### 14. Alert
Alert messages with variants and close button.

**Props:**
- `variant`: 'info' | 'success' | 'warning' | 'error'
- `title`: string
- `onClose`: () => void
- `children`: ReactNode

**Usage:**
```tsx
import Alert from '@/components/ui/Alert';

<Alert variant="success" title="Success!" onClose={() => {}}>
  Your review has been submitted.
</Alert>
```

### 15. Tooltip
Contextual tooltip on hover.

**Props:**
- `content`: ReactNode
- `children`: ReactNode
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `delay`: number

**Usage:**
```tsx
import Tooltip from '@/components/ui/Tooltip';

<Tooltip content="Verified safe space" position="top">
  <Shield className="w-5 h-5" />
</Tooltip>
```

### 16. StarRating
Star rating display and input.

**Props:**
- `rating`: number
- `onChange`: (rating: number) => void
- `size`: 'sm' | 'md' | 'lg'
- `interactive`: boolean

**Usage:**
```tsx
import StarRating from '@/components/ui/StarRating';

<StarRating
  rating={4.5}
  onChange={setRating}
  size="lg"
  interactive
/>
```

### 17. Skeleton
Loading skeleton screens.

**Components:**
- `Skeleton`: Basic skeleton
- `SkeletonCard`: Card skeleton
- `SkeletonProfile`: Profile skeleton
- `SkeletonReview`: Review skeleton

**Usage:**
```tsx
import { SkeletonCard } from '@/components/ui/Skeleton';

{loading ? <SkeletonCard /> : <Card>{content}</Card>}
```

## Animation Components

### PageTransition
Smooth page transitions.

```tsx
import { PageTransition } from '@/components/animations/PageTransitions';

<PageTransition>
  <div>Your page content</div>
</PageTransition>
```

### FadeIn
Fade in animation.

```tsx
import { FadeIn } from '@/components/animations/PageTransitions';

<FadeIn delay={0.2}>
  <Card>Content</Card>
</FadeIn>
```

### SlideIn
Slide in from direction.

```tsx
import { SlideIn } from '@/components/animations/PageTransitions';

<SlideIn direction="up" delay={0.1}>
  <Card>Content</Card>
</SlideIn>
```

### ScrollReveal
Reveal on scroll into view.

```tsx
import { ScrollReveal } from '@/components/animations/PageTransitions';

<ScrollReveal>
  <Card>Revealed on scroll</Card>
</ScrollReveal>
```

## Utility Functions

### cn()
Merge classNames with tailwind-merge.

```tsx
import { cn } from '@/lib/utils';

className={cn('base-class', condition && 'conditional-class', className)}
```

### formatDistance()
Format distance in meters.

```tsx
import { formatDistance } from '@/lib/utils';

formatDistance(1500) // "1.5km"
```

### formatDate()
Format date to readable string.

```tsx
import { formatDate } from '@/lib/utils';

formatDate(new Date()) // "Jan 15, 2024"
```

### formatRelativeTime()
Format relative time (e.g., "2 hours ago").

```tsx
import { formatRelativeTime } from '@/lib/utils';

formatRelativeTime(date) // "2 hours ago"
```

## Best Practices

1. **Accessibility**: All components include proper ARIA attributes and keyboard navigation
2. **Responsive**: Components are mobile-first and responsive
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Consistent Styling**: Uses Tailwind CSS with consistent color schemes
5. **Performance**: Optimized with React best practices and lazy loading where appropriate

## Color Scheme

- **Primary**: Purple (#7c3aed, #a855f7)
- **Success**: Green (#10b981, #059669)
- **Warning**: Yellow (#f59e0b, #d97706)
- **Danger**: Red (#ef4444, #dc2626)
- **Info**: Blue (#3b82f6, #2563eb)
- **Gray**: Neutral (#6b7280, #9ca3af)

## Enhanced Pages

### Available Enhanced Pages

1. **home-enhanced.tsx**: Modern homepage with hero, stats, features, and CTAs
2. **business-enhanced.tsx**: Business detail page with tabs, reviews, and animations
3. **profile-enhanced.tsx**: User profile with stats, achievements, and editable sections

### Usage

To use enhanced pages, either:
1. Replace the original page.tsx with the enhanced version
2. Or update imports in the routing to point to enhanced versions

Example:
```bash
# Backup original
mv src/app/page.tsx src/app/page-old.tsx

# Use enhanced version
mv src/app/home-enhanced.tsx src/app/page.tsx
```

## Next Steps

1. Apply components to remaining pages (discover, community, settings)
2. Add dark mode support
3. Implement real API integration
4. Add more animation variants
5. Create component playground/storybook
