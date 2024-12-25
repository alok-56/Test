# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Market360

Brief project description here.

## Table of Contents

## Coding Standards

In this project, we follow a set of coding standards and best practices to maintain code quality and consistency. Please make sure to adhere to the following guidelines when contributing to this project:

### 1. Component Naming

- Use PascalCase for component names.
- Choose descriptive and meaningful names for components.

### 2. File Structure

- Organize your files and folders logically. Refer to the [folder structure](#folder-structure) section for details.

### 3. Redux

- Follow a naming convention for Redux action types (e.g., `FETCH_DATA_SUCCESS`).
- Keep your Redux actions and reducers in sync.
- Use container components to connect UI components to the Redux store.

### 4. Code Style

- Maintain a consistent code style throughout the project.
- Use ESLint and Prettier to enforce code style standards.

### 5. Documentation

- Add comments and documentation to your code to make it more understandable.
- Document public functions, APIs, and complex logic in code comments or separate documentation files.

### 6. Testing

- Write unit tests for components, actions, and reducers using testing libraries like Jest and React Testing Library.
- Ensure that your tests cover critical functionality.

### 7. Error Handling

- Implement proper error handling in components and Redux actions to provide a good user experience.

### 8. Reusability

- Aim for reusable components to avoid code duplication (DRY principle).
- Reuse components wherever possible.

### 9. State Management

- Use Redux for global state management only when necessary.
- Keep local component state for UI-specific interactions.

### 10. Dependency Management

- Keep project dependencies up-to-date by periodically checking for updates and following best practices.
