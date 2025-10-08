# 🚀 Quick Start Guide - Safe Space Finder UI Components

## Setup Complete! ✅

Your UI component library is fully installed and ready to use. Here's everything you need to know to start building beautiful pages.

## 🎨 Available Components (18)

### Form Components
- **Button** - Multi-variant buttons with loading states
- **Input** - Text inputs with labels and errors
- **Select** - Dropdown selects
- **Checkbox** - Checkboxes with descriptions
- **Radio** - Radio button groups
- **Slider** - Range sliders

### Display Components
- **Card** - Container cards with sections
- **Badge** - Status badges and tags
- **Avatar** - User avatars
- **Progress** - Progress bars
- **StarRating** - Star ratings
- **Skeleton** - Loading skeletons

### Overlay Components
- **Modal** - Dialogs and modals
- **Dropdown** - Dropdown menus
- **Tooltip** - Hover tooltips
- **Alert** - Alert messages
- **Toast** - Notifications

### Layout Components
- **Tabs** - Tabbed interfaces

## 📦 Quick Import Cheatsheet

```tsx
// Buttons
import { Button } from '@/components/ui/Button';

// Cards
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

// Forms
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import RadioGroup from '@/components/ui/Radio';
import Slider from '@/components/ui/Slider';

// Display
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress';
import StarRating from '@/components/ui/StarRating';

// Overlays
import { Modal } from '@/components/ui/Modal';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@/components/ui/Dropdown';
import Tooltip from '@/components/ui/Tooltip';
import Alert from '@/components/ui/Alert';

// Layout
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

// Animations
import {
  PageTransition,
  FadeIn,
  SlideIn,
  ScrollReveal
} from '@/components/animations/PageTransitions';

// Skeletons
import {
  Skeleton,
  SkeletonCard,
  SkeletonProfile,
  SkeletonReview
} from '@/components/ui/Skeleton';
```

## 🎯 Common Patterns

### 1. Basic Page Layout with Animation
```tsx
import { PageTransition, FadeIn, SlideIn } from '@/components/animations/PageTransitions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function MyPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8">Page Title</h1>
        </FadeIn>
        
        <SlideIn direction="up">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Content here
            </CardContent>
          </Card>
        </SlideIn>
      </div>
    </PageTransition>
  );
}
```

### 2. Form with Validation
```tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import Checkbox from '@/components/ui/Checkbox';

export default function FormExample() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <Card>
      <form className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          placeholder="Enter your name"
        />
        
        <Checkbox
          checked={agreed}
          onChange={setAgreed}
          label="I agree to terms"
        />
        
        <Button type="submit" disabled={!agreed}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
```

### 3. Business Card with Rating
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { Shield, MapPin } from 'lucide-react';

export default function BusinessCard({ business }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{business.name}</CardTitle>
          <Badge variant="success" icon={<Shield />}>
            {business.safetyScore}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <StarRating rating={business.rating} size="sm" />
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{business.distance}</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 4. User Profile Header
```tsx
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { CheckCircle, Settings } from 'lucide-react';

export default function ProfileHeader({ user }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <Avatar
          src={user.avatar}
          fallback={user.name}
          size="xl"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.verified && (
              <Badge variant="success" icon={<CheckCircle />}>
                Verified
              </Badge>
            )}
          </div>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        <Button variant="outline" icon={<Settings />}>
          Settings
        </Button>
      </div>
    </Card>
  );
}
```

### 5. Tabbed Content
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';

export default function TabbedSection() {
  return (
    <Card>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          Overview content here
        </TabsContent>
        
        <TabsContent value="reviews">
          Reviews content here
        </TabsContent>
        
        <TabsContent value="photos">
          Photos content here
        </TabsContent>
      </Tabs>
    </Card>
  );
}
```

### 6. Modal Dialog
```tsx
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Review"
      >
        <div className="space-y-4">
          <Input label="Title" placeholder="Review title" />
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={4}
            placeholder="Your review..."
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

### 7. Loading States
```tsx
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export default function LoadingExample({ data, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map(item => (
        <Card key={item.id}>{/* content */}</Card>
      ))}
    </div>
  );
}
```

### 8. Scroll Reveal Grid
```tsx
import { ScrollReveal } from '@/components/animations/PageTransitions';
import { Card } from '@/components/ui/Card';

export default function GridWithReveal({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <ScrollReveal key={item.id}>
          <Card>
            {/* Card content */}
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}
```

## 🎨 Color Variants

Most components support these variants:
- **default** - Gray/neutral
- **primary** - Purple (brand color)
- **success** - Green (positive actions)
- **warning** - Yellow (caution)
- **danger** - Red (destructive actions)
- **info** - Blue (informational)
- **outline** - Border only
- **ghost** - Minimal styling

## 📱 Responsive Design

All components are mobile-first and responsive. Use Tailwind breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Stacks on mobile, 2 cols on tablet, 3 cols on desktop */}
</div>
```

## ♿ Accessibility

All components include:
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML

## 🎭 Animations

Use animations to enhance UX:

```tsx
// Page transitions
<PageTransition>
  <YourPage />
</PageTransition>

// Fade in with delay
<FadeIn delay={0.2}>
  <Card />
</FadeIn>

// Slide from direction
<SlideIn direction="up">
  <Card />
</SlideIn>

// Reveal on scroll
<ScrollReveal>
  <Card />
</ScrollReveal>
```

## 🔧 Utility Functions

```tsx
import { cn, formatDistance, formatDate, formatRelativeTime } from '@/lib/utils';

// Merge classnames
className={cn('base-class', isActive && 'active-class')}

// Format distance
formatDistance(1500) // "1.5km"

// Format date
formatDate(new Date()) // "Jan 15, 2024"

// Relative time
formatRelativeTime(date) // "2 hours ago"
```

## 🚀 Next Steps

1. **Try Enhanced Pages**: Check out `home-enhanced.tsx`, `business-enhanced.tsx`, `profile-enhanced.tsx`
2. **Build New Pages**: Use components to create discover, community, and settings pages
3. **Customize**: Modify component styles in `/src/components/ui/`
4. **Add Features**: Create new components as needed

## 📚 Full Documentation

See `UI_COMPONENTS_DOCS.md` for complete API reference and examples.

## 💡 Tips

1. **Use TypeScript**: All components are fully typed
2. **Consistent spacing**: Use Tailwind's spacing scale (p-4, gap-6, etc.)
3. **Mobile first**: Design for mobile, enhance for desktop
4. **Loading states**: Always show skeletons while loading
5. **Error handling**: Use Alert or Toast for user feedback
6. **Animations**: Don't overuse - be subtle and purposeful

Happy building! 🎉
