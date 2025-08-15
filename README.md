# Tech News Dashboard

A clean, responsive news dashboard built with React and TypeScript that fetches technology headlines from NewsAPI.org.

## Features

- Browse latest tech news in a responsive grid
- Filter by categories (Technology, Business, Science, etc.)
- Search for specific topics
- Save articles to bookmarks
- Toggle between light and dark mode
- Works offline with dummy data when API is unavailable

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- NewsAPI.org API key (optional - app works with dummy data)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your API key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```
   > Note: The app will work with dummy data if no API key is provided.

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Built With

- React 18
- TypeScript
- Vite
- Bootstrap 5
- NewsAPI.org
