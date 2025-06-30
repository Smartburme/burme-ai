
import { ProjectStructureNode } from '../types';

export const projectStructure: ProjectStructureNode = {
  name: 'burme-ai/',
  type: 'folder',
  path: 'burme-ai/',
  description: 'The root directory of the entire Burme AI project, containing frontend, backend, AI core, and other project-level files.',
  children: [
    {
      name: 'frontend/',
      type: 'folder',
      path: 'burme-ai/frontend/',
      description: 'Contains all client-side code for the React web application that users interact with.',
      children: [
        { name: 'public/', type: 'folder', path: 'burme-ai/frontend/public/', description: 'Holds static assets like index.html, favicon, and images that are publicly accessible.' },
        {
          name: 'src/',
          type: 'folder',
          path: 'burme-ai/frontend/src/',
          description: 'The main source code directory for the React application.',
          children: [
            { name: 'assets/', type: 'folder', path: 'burme-ai/frontend/src/assets/', description: 'Stores local assets like CSS files, fonts, and icons used by the components.' },
            {
              name: 'components/',
              type: 'folder',
              path: 'burme-ai/frontend/src/components/',
              description: 'Contains reusable React components that form the building blocks of the UI.',
              children: [
                { name: 'auth/', type: 'folder', path: 'burme-ai/frontend/src/components/auth/', description: 'Components related to user authentication, like Login and Register forms.' },
                { name: 'dashboard/', type: 'folder', path: 'burme-ai/frontend/src/components/dashboard/', description: 'Widgets and components specific to the user dashboard view.' },
                { name: 'projects/', type: 'folder', path: 'burme-ai/frontend/src/components/projects/', description: 'UI components for creating, listing, and managing projects.' },
                { name: 'ai-generator/', type: 'folder', path: 'burme-ai/frontend/src/components/ai-generator/', description: 'Components for the AI interaction, such as prompt inputs and result displays.' },
              ]
            },
            {
              name: 'pages/',
              type: 'folder',
              path: 'burme-ai/frontend/src/pages/',
              description: 'Top-level components that represent full pages or views in the application (e.g., Home, Projects).',
              children: [
                { name: 'Home.jsx', type: 'file', path: 'burme-ai/frontend/src/pages/Home.jsx', description: 'The main landing page or dashboard view after a user logs in.' },
                { name: 'Projects.jsx', type: 'file', path: 'burme-ai/frontend/src/pages/Projects.jsx', description: 'The page where users can view and interact with their projects.' },
                { name: 'Settings.jsx', type: 'file', path: 'burme-ai/frontend/src/pages/Settings.jsx', description: 'The user settings and profile management page.' },
              ]
            },
            { name: 'utils/', type: 'folder', path: 'burme-ai/frontend/src/utils/', description: 'Helper functions, hooks, and utility modules used across the frontend.' },
            { name: 'App.jsx', type: 'file', path: 'burme-ai/frontend/src/App.jsx', description: 'The root component of the React application, which sets up routing and global layout.' },
            { name: 'index.js', type: 'file', path: 'burme-ai/frontend/src/index.js', description: 'The entry point for the React application, where it mounts to the DOM.' },
          ]
        },
        { name: 'package.json', type: 'file', path: 'burme-ai/frontend/package.json', description: 'Defines frontend dependencies, scripts, and project metadata for NPM.' },
      ]
    },
    {
      name: 'backend/',
      type: 'folder',
      path: 'burme-ai/backend/',
      description: 'Contains all server-side code, including the API, database models, and business logic.',
      children: [
        { name: 'config/', type: 'folder', path: 'burme-ai/backend/config/', description: 'Configuration files for the database, external APIs, and environment variables.' },
        {
          name: 'controllers/',
          type: 'folder',
          path: 'burme-ai/backend/controllers/',
          description: 'Handles the business logic for incoming API requests, interacting with models and services.',
          children: [
            { name: 'authController.js', type: 'file', path: 'burme-ai/backend/controllers/authController.js', description: 'Logic for user registration, login, and session management.' },
            { name: 'projectController.js', type: 'file', path: 'burme-ai/backend/controllers/projectController.js', description: 'Logic for CRUD operations (Create, Read, Update, Delete) on projects.' },
            { name: 'aiController.js', type: 'file', path: 'burme-ai/backend/controllers/aiController.js', description: 'Handles requests related to AI content generation, proxying to the AI service.' },
          ]
        },
        {
          name: 'models/',
          type: 'folder',
          path: 'burme-ai/backend/models/',
          description: 'Database schemas or models that define the structure of data (e.g., for users, projects).',
          children: [
            { name: 'User.js', type: 'file', path: 'burme-ai/backend/models/User.js', description: 'Defines the schema for user data stored in the database.' },
            { name: 'Project.js', type: 'file', path: 'burme-ai/backend/models/Project.js', description: 'Defines the schema for project data stored in the database.' },
          ]
        },
        {
          name: 'routes/',
          type: 'folder',
          path: 'burme-ai/backend/routes/',
          description: 'Defines the API endpoints and maps them to the appropriate controller functions.',
          children: [
            { name: 'authRoutes.js', type: 'file', path: 'burme-ai/backend/routes/authRoutes.js', description: 'API routes for handling authentication requests.' },
            { name: 'apiRoutes.js', type: 'file', path: 'burme-ai/backend/routes/apiRoutes.js', description: 'Main API routes for projects, AI generation, and other application features.' },
          ]
        },
        {
          name: 'services/',
          type: 'folder',
          path: 'burme-ai/backend/services/',
          description: 'Modules for interacting with external services, such as the AI model provider.',
          children: [
            { name: 'openaiService.js', type: 'file', path: 'burme-ai/backend/services/openaiService.js', description: 'A service wrapper for making calls to the OpenAI (or other AI) API.' },
          ]
        },
        { name: 'app.js', type: 'file', path: 'burme-ai/backend/app.js', description: 'The main entry point for the backend server, setting up Express, middleware, and routes.' },
        { name: 'package.json', type: 'file', path: 'burme-ai/backend/package.json', description: 'Defines backend dependencies, scripts, and project metadata for NPM.' },
      ]
    },
    {
      name: 'ai-core/',
      type: 'folder',
      path: 'burme-ai/ai-core/',
      description: 'Contains specialized AI modules, such as prompt engineering templates and model fine-tuning scripts.',
      children: [
        { name: 'prompts/', type: 'folder', path: 'burme-ai/ai-core/prompts/', description: 'Stores predefined prompt templates for consistent and high-quality AI-generated content.' },
        { name: 'models/', type: 'folder', path: 'burme-ai/ai-core/models/', description: 'Workspace for fine-tuning custom AI models or experimenting with different model architectures.' },
        { name: 'utils/', type: 'folder', path: 'burme-ai/ai-core/utils/', description: 'Utility scripts for AI-related tasks like data preprocessing and NLP helpers.' },
      ]
    },
    { name: 'scripts/', type: 'folder', path: 'burme-ai/scripts/', description: 'Automation scripts for tasks like deployment, database migration, or running tests.' },
    { name: '.env', type: 'file', path: 'burme-ai/.env', description: 'Stores environment variables like API keys and database credentials. This file is not committed to version control.' },
    { name: '.gitignore', type: 'file', path: 'burme-ai/.gitignore', description: 'Specifies files and directories that should be ignored by Git version control (e.g., node_modules, .env).' },
    { name: 'README.md', type: 'file', path: 'burme-ai/README.md', description: 'The main documentation file for the project, providing an overview, setup instructions, and other essential information.' },
  ],
};
