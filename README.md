# TradeWay Frontend

## Overview

TradeWay Frontend is a modern React e-commerce application built with Vite, Tailwind CSS, and shadcn/ui components. The project follows a well-organized folder structure for scalability and maintainability while implementing a theming system with light and dark mode support.

## Project Structure

The project follows a modular architecture designed for scalability:

```
src/
├── assets/               # Static files like images, fonts
├── components/           # UI components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   └── ui/               # shadcn/ui components
├── constants/            # Application constants
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── pages/                # Page components
├── services/             # Services layer
│   ├── api/              # API integration with Axios
│   │   ├── axios.js      # Axios instance and interceptors
│   │   └── endpoints/    # Endpoint-specific API calls
│   └── storage/          # Local storage services
└── utils/                # Utility functions
```

## Tech Stack

- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - UI component collection
- **Lucide React** - Icon library for all UI icons

## Color System

The project uses a comprehensive color system through CSS variables defined in index.css. The color scheme supports both light and dark modes using CSS variables and Tailwind theming.

### Color Variables

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* other color variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* dark mode color overrides */
}
```

### Customizing Colors

To customize the color scheme:

1. Edit the color values in index.css
2. Use OKLCH color format for better color accuracy
3. Colors are automatically applied to components through Tailwind classes

Example:

```css
:root {
  --primary: oklch(0.6 0.2 240); /* Change primary color */
}
```

## Adding shadcn/ui Components

This project uses shadcn/ui components which can be easily added using the CLI.

### Adding a New Component

Use the shadcn CLI to add components:

```bash
npx shadcn@latest add button
```

This will:
1. Install necessary dependencies
2. Create the component file in ui
3. Configure it according to your project's setup

### Example: Adding Multiple Components

```bash
npx shadcn@latest add dialog dropdown-menu avatar
```

## Using Icons

The project uses [Lucide React](https://lucide.dev/) for icons:

```jsx
import { ShoppingCart, User, Menu } from "lucide-react";

function Header() {
  return (
    <div>
      <ShoppingCart className="size-5" />
      <User className="size-5" />
      <Menu className="size-6" />
    </div>
  );
}
```

## Container Component

The project includes a responsive Container component for consistent layout spacing:

```jsx
import { Container } from "@/components/ui/container";

function Page() {
  return (
    <Container size="large">
      {/* Content */}
    </Container>
  );
}
```

Size options: `small`, `medium`, `large`, `xl`, `2xl`.

## API Integration

The project is set up with a centralized Axios instance for API requests:

```jsx
// src/services/api/axios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (401, 403, etc.)
    return Promise.reject(error);
  }
);

export default apiClient;
```

Add endpoint-specific API calls in the endpoints directory:

```jsx
// src/services/api/endpoints/userApi.js
import apiClient from '../axios';

export const userApi = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  // other user-related API calls
};
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/trade-way/tradeway-web.git
cd tradeway-web
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
