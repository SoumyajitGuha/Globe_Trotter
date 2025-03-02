
---

# How to Run the Project

## Prerequisites
- Ensure you have Node.js and npm installed on your machine.
- Ensure you have a package manager like `npm` or `yarn` installed.

## Backend

### Description
The backend is an Express application that handles API requests.

### Steps to Run

1. **Navigate to the Backend Directory**:
    ```sh
    cd <global_trotter_path>/backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Server**:
    ```sh
    npm start
    ```

4. **Access the API**:
    - The server will run on port 3000 by default. You can access the API routes at `http://localhost:3000/api`.

### Notes
- If you want to change the default port, set the `PORT` environment variable before starting the server:
    ```sh
    PORT=4000 npm start
    ```

## Frontend

### Description
The frontend is a React application that interacts with the backend API.

### Steps to Run

1. **Navigate to the Frontend Directory**:
    ```sh
    cd <global_trotter_path>/frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Development Server**:
    ```sh
    npm start
    ```

4. **Access the Frontend**:
    - The development server will run on port 3000 by default. You can access the frontend at `http://localhost:3000`.

### Notes
- If the backend is also running on port 3000, you may need to change the port for the frontend. You can do this by setting the `PORT` environment variable before starting the development server:
    ```sh
    PORT=3001 npm start
    ```

## Summary
- **Backend**: Navigate to the backend directory, install dependencies, and start the server.
- **Frontend**: Navigate to the frontend directory, install dependencies, and start the development server.

By following these steps, you should be able to run both the backend and frontend of your project successfully.


---

# Backend Documentation

## Project Overview
The backend of this project is built using Node.js and Express. It serves as the API layer, handling requests from the frontend and interacting with the database.

## Architecture
The backend follows a modular architecture with the following key components:
- **Express Application**: The core of the backend, handling routing and middleware.
- **Routes**: Define the API endpoints and their handlers.
- **Middleware**: Handle cross-cutting concerns like CORS and JSON parsing.

## File Structure
```
backend/
│
├── src/
│   ├── app.ts          # Main application setup
│   ├── routes/
│   │   └── api.ts      # API route definitions
│   └── controllers/    # Route handlers
│
├── package.json        # Project metadata and dependencies
└── tsconfig.json       # TypeScript configuration
```

## Setup and Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Steps to Run

1. **Navigate to the Backend Directory**:
    ```sh
    cd /<path to Globetrotter>/backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Server**:
    ```sh
    npm start
    ```

4. **Access the API**:
    - The server will run on port 3000 by default. You can access the API routes at `http://localhost:3000/api`.

### Notes
- To change the default port, set the `PORT` environment variable before starting the server:
    ```sh
    PORT=4000 npm start
    ```

## API Endpoints

### Base URL
`http://localhost:3000/api`

### Available Endpoints

#### GET /api/example
- **Description**: Fetches example data.
- **Response**: JSON object containing example data.

#### POST /api/example
- **Description**: Creates a new example entry.
- **Request Body**: JSON object with the necessary data.
- **Response**: JSON object containing the created entry.

## Detailed Explanation of app.ts

### File: app.ts
The app.ts file is the main entry point for the Express application. It sets up the server, configures middleware, and mounts the API routes.

#### Code Breakdown

```typescript
import express from 'express';
import apiRoutes from './routes/api';
// import cors from 'cors';

const app = express();
const cors = require('cors');

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount the API routes at the /api path
app.use('/api', apiRoutes);

export default app;
```

- **Imports**: The necessary modules (`express` and `apiRoutes`) are imported. The `cors` module is also imported to handle Cross-Origin Resource Sharing.
- **Express Application**: An instance of the Express application is created.
- **CORS Middleware**: The CORS middleware is enabled to allow cross-origin requests.
- **JSON Parsing Middleware**: The `express.json()` middleware is used to parse incoming JSON requests.
- **API Routes**: The API routes are mounted at the `/api` path.
- **Export**: The configured Express application is exported for use in other parts of the application.

### Routes

#### File: `routes/api.ts`
The `api.ts` file defines the API routes and their handlers.

```typescript
import { Router } from 'express';
import { getExample, createExample } from '../controllers/exampleController';

const router = Router();

// Define the GET /api/example route
router.get('/example', getExample);

// Define the POST /api/example route
router.post('/example', createExample);

export default router;
```

- **Imports**: The necessary modules (`Router` from `express` and the controller functions) are imported.
- **Router**: An instance of the Express router is created.
- **Routes**: The routes are defined and associated with their respective controller functions.
- **Export**: The configured router is exported for use in app.ts.

### Controllers

#### File: `controllers/exampleController.ts`
The `exampleController.ts` file contains the logic for handling the API requests.

```typescript
import { Request, Response } from 'express';

// Handler for GET /api/example
export const getExample = (req: Request, res: Response) => {
    res.json({ message: 'Example data' });
};

// Handler for POST /api/example
export const createExample = (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Example created', data });
};
```

- **Imports**: The necessary modules (`Request` and `Response` from `express`) are imported.
- **Handlers**: The handler functions for the routes are defined. These functions take the request and response objects as parameters and send back the appropriate response.

## Middleware

### CORS
- **Description**: Enables Cross-Origin Resource Sharing (CORS) for all routes.
- **Usage**: Configured in app.ts using `app.use(cors())`.

### JSON Parsing
- **Description**: Parses incoming JSON requests.
- **Usage**: Configured in app.ts using `app.use(express.json())`.

## Functionalities
- **Routing**: Handles API requests and routes them to the appropriate handlers.
- **Middleware**: Manages cross-cutting concerns like CORS and JSON parsing.
- **API Endpoints**: Provides endpoints for interacting with the backend.
---

# Frontend Documentation

## Project Overview
The frontend of this project is built using React and TypeScript. It provides an interactive user interface for the Globetrotter travel trivia game, allowing users to guess famous destinations based on cryptic clues.

## Architecture
The frontend follows a component-based architecture with the following key components:
- **React Components**: Define the UI and handle user interactions.
- **State Management**: Manage the state of the application using React hooks.
- **API Integration**: Communicate with the backend API using Axios.

## File Structure
```
frontend/
│
├── src/
│   ├── components/     # React components (GameScreen, ChallengePopup, ChallengeLanding)
│   ├── styles/         # CSS styles (index.css)
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx         # Main app component
│   └── index.tsx       # Entry point
│
├── public/             # Static assets (e.g., gameScreen.jpg)
├── .env                # Frontend environment variables
├── package.json        # Frontend dependencies
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Steps to Run

1. **Navigate to the Frontend Directory**:
    ```sh
    cd /<path to Globetrotter>/frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Set Up Environment Variables**:
    - Create a .env file in frontend:
      ```
      REACT_APP_BACKEND_URL=http://localhost:3000
      ```
    - For production, update this with your backend URL.

4. **Run the Development Server**:
    ```sh
    npm start
    ```

5. **Access the Frontend**:
    - The development server will run on port 3000 by default. You can access the frontend at `http://localhost:3000`.

### Notes
- If the backend is also running on port 3000, you may need to change the port for the frontend. You can do this by setting the `PORT` environment variable before starting the development server:
    ```sh
    PORT=3001 npm start
    ```

## Components

### App.tsx
The main entry point of the application. It manages the user registration and renders the `GameScreen` component.

#### Key Functions:
- **registerUser**: Registers a new user by sending a POST request to the backend.
- **Modal**: Displays a modal for user registration.

### GameScreen.tsx
The main game screen where users can guess destinations based on clues.

#### Key Functions:
- **fetchDestination**: Fetches a random destination from the backend.
- **submitAnswer**: Submits the user's answer and updates the score.
- **startNewGame**: Resets the game state and starts a new game.

### ChallengePopup.tsx
A popup component that allows users to challenge their friends by sharing their score.

#### Key Functions:
- **fetchScore**: Fetches the user's score from the backend.
- **generateImage**: Generates an image of the challenge and shares it via WhatsApp.

#### Key Functions:
- **fetchInviterScore**: Fetches the inviter's score from the backend.

## Styles

### index.css
The main CSS file that includes Tailwind CSS and custom styles.

#### Key Styles:
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Custom Animations**: Defines custom animations like `pulse`.

## Environment Variables
- **Frontend** (`frontend/.env`):
  ```
  REACT_APP_BACKEND_URL=http://localhost:3000  # Local
  REACT_APP_BACKEND_URL=https://your-backend.onrender.com  # Production (set in Vercel)
  ```

## Deployment

### Frontend on Vercel
1. **Push to GitHub**:
   - Ensure your frontend code is in a Git repository.

2. **Create a New Project on Vercel**:
   - Go to [Vercel](https://vercel.com), sign in, and click **New Project**.
   - Import your GitHub repo and select the frontend folder.

3. **Configure Settings**:
   - **Framework Preset**: React
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build` (default)
   - **Environment Variables**:
     - `REACT_APP_API_URL`: `https://your-backend.onrender.com`

4. **Deploy**:
   - Click **Deploy**. Vercel builds and deploys your frontend.
   - Note the URL (e.g., `https://your-frontend.vercel.app`).

## Conclusion
This documentation provides an overview of the frontend architecture, setup instructions, available components, and deployment steps. By following the setup steps, you can run the frontend application and interact with the Globetrotter game.
