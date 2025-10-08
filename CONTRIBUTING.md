# Contributing to Safe Space Finder

Thank you for your interest in contributing to Safe Space Finder! This project aims to make public spaces more inclusive and welcoming for everyone.

## 🌟 Code of Conduct

By participating in this project, you agree to uphold our values of:
- **Inclusivity**: Welcome and respect people of all backgrounds
- **Accessibility**: Prioritize accessible design in all contributions
- **Safety**: Protect user privacy and safety
- **Respect**: Treat all contributors with kindness and professionalism

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn
- Git
- A code editor (we recommend VS Code)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/safe-space-finder.git
   cd safe-space-finder
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: All new code must be written in TypeScript
- **Formatting**: Use consistent formatting (we use Prettier)
- **Naming**: Use clear, descriptive variable and function names
- **Comments**: Add comments for complex logic

### Component Guidelines

1. **Use 'use client' directive** for interactive components
2. **Export as default** for page components
3. **Include TypeScript interfaces** for all props
4. **Follow accessibility best practices**:
   - Use semantic HTML
   - Include ARIA labels
   - Support keyboard navigation
   - Maintain color contrast ratios

### Example Component Structure

```tsx
'use client'

import { useState } from 'react'
import { Icon } from 'lucide-react'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className="...">
      <h2>{title}</h2>
      <button onClick={onAction} aria-label="Action button">
        Click me
      </button>
    </div>
  )
}
```

## 🎨 Design System

### Colors
- Primary: Blue (#0ea5e9)
- Success: Green (#22c55e)
- Warning: Amber (#f59e0b)

### Spacing
Use Tailwind's spacing scale (4px base unit)

### Typography
- Headings: Font-bold with appropriate sizes
- Body: Default font with comfortable line-height

## 🧪 Testing

Before submitting a PR:

1. Test your changes manually
2. Run the linter:
   ```bash
   npm run lint
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Test accessibility with a screen reader
5. Test keyboard navigation

## 📦 Pull Request Process

1. **Update documentation** if you've made significant changes
2. **Keep PRs focused** - one feature/fix per PR
3. **Write clear commit messages**:
   ```
   feat: Add map view for business locations
   fix: Correct wheelchair accessibility icon
   docs: Update README with new features
   ```

4. **Fill out the PR template** completely
5. **Link related issues** using #issue-number
6. **Wait for review** - maintainers will review within 48 hours

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
How were these changes tested?

## Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast is sufficient
- [ ] Focus indicators are visible

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Changes are accessible
```

## 🐛 Reporting Bugs

Use the GitHub issue tracker. Include:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

## 💡 Suggesting Features

We love new ideas! When suggesting features:
- Check if it's already been suggested
- Explain the problem it solves
- Consider how it impacts accessibility
- Think about different user perspectives

## 🌍 Internationalization

When adding text:
- Use clear, simple language
- Avoid idioms and slang
- Consider screen reader users
- Think about translation

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

## 🤝 Community

- **Discussions**: Use GitHub Discussions for questions
- **Discord**: [Join our community](link-to-discord)
- **Email**: contribute@safespacefinder.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

All contributors will be recognized in our README and release notes!

---

**Thank you for helping make public spaces safer and more inclusive for everyone!** 🌈✨
