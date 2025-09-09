# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React portfolio website built with Vite and TypeScript. The project is based on a Figma design and uses modern React patterns with shadcn/ui components and Tailwind CSS for styling.

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server (runs on port 3000, opens browser automatically)
- `npm run build` - Build for production (outputs to `build/` directory)

## Architecture

### Core Structure
- **Entry Point**: `src/main.tsx` renders the main `App.tsx` component
- **Main App**: `src/App.tsx` - Single-page layout with all portfolio sections
- **Components**: Organized in `src/components/` with separate files for each portfolio section
- **UI Components**: `src/components/ui/` contains shadcn/ui components
- **Styles**: Global styles in `src/styles/globals.css` and component-level CSS

### Component Organization
The portfolio is structured as a single-page application with these main sections:
- Header (navigation)
- Hero (landing section)  
- About
- Skills
- Experience
- Projects
- Social Media
- Contact
- Footer

### UI System
- Built on **shadcn/ui** components (comprehensive set in `src/components/ui/`)
- Uses **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling with custom utility classes
- **Lucide React** for icons
- **next-themes** for theme support

### Configuration
- **Vite**: Modern build tool with React SWC plugin
- **TypeScript**: Full TypeScript support with `.tsx` components  
- **Path Aliases**: `@/` maps to `src/` directory
- **Asset Handling**: Images stored in `src/assets/`

### Notable Patterns
- Components use TypeScript with proper typing
- Figma-generated components have numerical naming (e.g., `Code-component-1-54.tsx`)
- Custom `ImageWithFallback` component in `src/components/figma/` for asset handling
- Extensive Vite alias configuration for package version management

## Development Notes

- Project targets modern browsers (`esnext`)
- Development server auto-opens browser on port 3000
- No test framework currently configured
- No linting/formatting tools configured
- Uses SWC for fast compilation and HMR