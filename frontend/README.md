
# Globetrotter

Globetrotter is an interactive travel trivia game that tests your knowledge of famous destinations worldwide. Players receive cryptic clues about a location and must guess the correct city and country from a set of options. With engaging animations like confetti for correct answers and a sad emoji for wrong ones, Globetrotter offers a fun and educational experience!

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
  - [Backend on Render](#backend-on-render)
  - [Frontend on Vercel](#frontend-on-vercel)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [How to Play](#how-to-play)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Interactive Gameplay**: Guess destinations from 1-2 clues with multiple-choice options.
- **Score Tracking**: Keep track of correct and incorrect guesses (stored per user).
- **Fun Animations**: Confetti bursts for correct answers, a shaking sad emoji for wrong ones.
- **User Registration**: Enter a username to start playing and save your score.
- **Challenge Friends**: Share your score and challenge others (via a popup).
- **Responsive Design**: Works on desktop and mobile devices.
- **Modern UI**: Glassmorphism and neomorphism effects for a sleek look.

## Tech Stack
- **Frontend**:
  - React (TypeScript)
  - Framer Motion (animations)
  - React-Confetti (confetti effect)
  - Axios (API requests)
  - Deployed on Vercel
- **Backend**:
  - Express.js (TypeScript)
  - MongoDB (Mongoose ORM)
  - Deployed on Render
- **Database**: MongoDB Atlas (cloud-hosted)

## Project Structure
```
globetrotter/
├── backend/
│   ├── src/
│   │   ├── models/         # Mongoose models (Destination, User)
│   │   ├── routes/         # API routes (api.ts)
│   │   ├── types/          # TypeScript interfaces
│   │   └── server.ts       # Express server setup
│   ├── .env                # Backend environment variables
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript config
├── frontend/
│   ├── src/
│   │   ├── components/     # React components (GameScreen, ChallengePopup)
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   ├── public/             # Static assets (e.g., gameScreen.jpg)
│   ├── .env                # Frontend environment variables
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript config
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)
- Vercel account (for frontend deployment)
- Render account (for backend deployment)
- Git

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in `backend/`:
     ```
     MONGO_URI=mongodb://localhost:27017/globetrotter
     PORT=3000
     ```
   - For production, replace `MONGO_URI` with your MongoDB Atlas connection string.

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   - Uses `ts-node` to start the server. You should see:
     ```
     Connected to MongoDB
     Server running on port 3000
     ```

5. **Populate MongoDB**:
   - Ensure the `destinations` collection has at least 4 documents:
     ```javascript
     db.destinations.insertMany([
       { city: "Paris", country: "France", clues: ["Eiffel Tower", "Croissants"], fun_fact: ["City of Light"] },
       { city: "New York", country: "USA", clues: ["Statue of Liberty", "Big Apple"], fun_fact: ["Never sleeps"] },
       { city: "Tokyo", country: "Japan", clues: ["Sushi", "2020 Olympics"], fun_fact: ["Shibuya crossing"] },
       { city: "Sydney", country: "Australia", clues: ["Opera House", "Down Under"], fun_fact: ["Harbour Bridge"] }
     ]);
     ```

### Frontend Setup
1. **Navigate to Frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in `frontend/`:
     ```
     REACT_APP_API_URL=http://localhost:3000
     ```
   - For production, update this in Vercel (see below).

4. **Run Locally**:
   ```bash
   npm start
   ```
   - Opens at `http://localhost:3001`. Ensure the backend is running.

## Deployment

### Backend on Render
1. **Push to GitHub**:
   - Ensure your backend code is in a Git repository.

2. **Create a New Service on Render**:
   - Go to [Render](https://render.com), sign in, and click **New > Web Service**.
   - Connect your GitHub repo and select the backend folder.

3. **Configure Settings**:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start` (ensure `start` script in `package.json` is `ts-node src/server.ts`)
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `PORT`: 3000 (optional, Render defaults to 10000 if not set)

4. **Deploy**:
   - Click **Create Web Service**. Render builds and deploys your backend.
   - Note the URL (e.g., `https://your-backend.onrender.com`).

### Frontend on Vercel
1. **Push to GitHub**:
   - Ensure your frontend code is in a Git repository (can be the same repo, different folder).

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

## API Endpoints
- **Base URL**: `https://your-backend.onrender.com/api`

| Method | Endpoint              | Description                          | Request Body                                      | Response Body                              |
|--------|-----------------------|--------------------------------------|--------------------------------------------------|--------------------------------------------|
| GET    | `/destination/random` | Fetch a random destination question  | -                                                | `GameResponse` {destinationId, clues, options} |
| POST   | `/destination/answer` | Submit an answer                     | `AnswerRequest` {destinationId, selectedAnswer, userId} | `AnswerResponse` {isCorrect, funFact} |
| POST   | `/user/register`      | Register a new user                  | `{ username: string }`                           | `{ userId: string }`                      |
| GET    | `/user/:userId/score` | Get a user’s score                   | -                                                | `{ correct: number, incorrect: number }`  |

## Environment Variables
- **Backend** (`backend/.env`):
  ```
  MONGO_URI=mongodb://localhost:27017/globetrotter  # Local
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/globetrotter  # Production
  PORT=3000
  ```
- **Frontend** (`frontend/.env`):
  ```
  REACT_APP_API_URL=http://localhost:3000  # Local
  REACT_APP_API_URL=https://your-backend.onrender.com  # Production (set in Vercel)
  ```

## How to Play
1. **Start the Game**:
   - Click "Dive into Adventure!" and enter a username.
2. **Get Clues**:
   - Read 1-2 hints about a famous destination.
3. **Guess**:
   - Select the correct city and country from 4 options.
4. **Feedback**:
   - Correct: Confetti bursts! Wrong: Sad emoji shakes and drops.
5. **Score**:
   - Track your progress (correct/incorrect guesses).
6. **Next Round**:
   - Click "Next Destination" to continue.
7. **Game Over**:
   - After 10 questions, see your final score and challenge a friend!

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.