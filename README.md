# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# Heavy Waste Popup Component

## Key Features
- Selection of multiple heavy waste types (Soil, Concrete, Bricks, etc.)
- Selection of heavy waste percentage with automatic validation
- Dynamic visual representation based on selection
- Responsive layout that adapts to different screen sizes
- Integration with a skip provider API
- Real-time filtering of available skips based on waste selections

## Approach
The component follows a modular design pattern with several key elements:

1. **Component Structure**: 
   - Broken into smaller, focused components for maintainability
   - Clear separation of concerns with each section handling a specific task
   - Desktop/Tablet: Two-column layout with waste selection on the left and visual representation on the right
   - Mobile: Single-column layout with visual representation positioned between percentage selection and skip size selection

2. **Responsive Design & Responsive Behavior**:
   - Uses a two-column layout on tablets/desktops
   - Switches to a single-column layout on mobile devices
   - Strategic placement of the visual representation between percentage and skip selection on mobile

3. **State Management**:
   - Centralized state handling for selections
   - Automatic validation between interdependent selections
   - API integration for dynamic data fetching

4. **User Experience**:
   - Visual feedback for selections
   - Clear disabled states for unavailable options
   - Helpful error messages and loading states

## Technical Implementation
- Built with React functional components and hooks
- Styled with Tailwind CSS for responsive design
- Uses async/await for API communication
- Implements conditional rendering based on selections and screen size



