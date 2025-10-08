<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Safe Space Finder Project Instructions

This is a Safe Space Finder application built with Next.js, TypeScript, and Tailwind CSS. The app helps users find inclusive, accessible, and safe public spaces.

## Key Features

1. **Inclusive Space Discovery**: Users can search for businesses that are LGBTQ+ friendly, wheelchair accessible, autism-friendly, etc.
2. **Advanced Filtering**: Filter by accessibility features, identity inclusivity, and neurodiversity support
3. **Safety Scoring**: Each business has a community-verified safety score
4. **Photo Verification**: Reviews include verified photos for transparency
5. **Community Reviews**: Detailed reviews from users with similar identities/needs

## Code Guidelines

- Use TypeScript for all new components
- Follow React best practices with functional components and hooks
- Use Tailwind CSS for styling with the established design system
- Ensure accessibility with proper ARIA labels, keyboard navigation, and screen reader support
- Use Lucide React icons for consistency
- Implement responsive design mobile-first approach
- Focus on inclusive design principles

## Component Structure

- All components should be in `/src/components/`
- Use 'use client' directive for interactive components
- Export components as default exports
- Include proper TypeScript interfaces for props

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include alt text for images
- Maintain color contrast ratios
- Support screen readers with proper ARIA attributes

## Business Logic

- Safety scores range from 0-100
- Reviews must be from verified community members
- Features are categorized by accessibility, identity, and neurodiversity
- Photo verification is required for business listings
