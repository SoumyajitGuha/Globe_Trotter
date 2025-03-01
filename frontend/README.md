# Globetrotter

A fun, full-stack web app where users guess famous destinations from cryptic clues!

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with `MONGO_URI=<your-mongodb-uri>`
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## Features
- Random clues with multiple-choice answers.
- Animations for correct/incorrect feedback.
- User scoring and "Challenge a Friend" via WhatsApp.

## Extending
- Add leaderboards: Create a `/api/leaderboard` endpoint.
- Multiplayer: Use WebSockets for real-time challenges.


What else we can add, add those and document them and then remove
Host so that we can test he challenge feature
Increase DataSet
Display total user score, tracking correct and incorrect answers.
 User enters a unique username before inviting friends to play.This registers the user with the system and creates their profile.
 Open a share popup with a dynamic image & invite link for WhatsApp.
The image could be generated using on-screen UI elements, or any 3rd-party service.
✅ The invited friend can see the invitee’s score before playing.
✅ Anyone with the invitation link can play the game with all features.

Brownie points: Surprise us with unit test cases, well-written documentation, or anything else that truly reflects the geek within you.

How to store users and their scores
confetti animation