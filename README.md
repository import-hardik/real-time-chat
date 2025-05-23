# Real-Time Chat Application Using WebSockets

## Overview
The Real-Time Chat Application is a lightweight and efficient platform enabling users to communicate in real time within dedicated chat rooms. Built using WebSocket technology, the application ensures low-latency, bidirectional communication and dynamic user interactions.

## Features
- **Real-Time Messaging**: Instant message delivery using WebSockets.
- **Room-Based Isolation**: Users can join specific chat rooms to maintain context and privacy.
- **Dynamic UI**: Responsive and intuitive interface built with React.
- **Active User Tracking**: Displays the number of active users in a room.
- **Lightweight Backend**: Node.js server for efficient message broadcasting.

## Technologies Used
### Frontend:
- React
- CSS for styling

### Backend:
- Node.js
- `ws` (WebSocket library)

### Deployment:
- **Frontend**: Hosted on [Vercel](https://vercel.com)
- **Backend**: Hosted on [render](https://render.com)

## Setup and Installation
[Deployed project link](https://import-chat-from-hardik.vercel.app/)
- Please wait for 30sec for render server to start it will alert you with name and room number when the server is ready
### Prerequisites:
- Node.js installed
- A code editor (e.g., VS Code)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/import-hardik/real-time-chat.git
   cd real-time-chat
   ```
2. Install dependencies for the backend:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   Not required
   ```
4. Install dependencies for the frontend:
   ```bash
   npm install
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Enter your name and a room code to join a chat room.
3. Start sending and receiving messages in real time.

## Deployment
- **Frontend**: Hosted on Vercel for scalable and fast deployment.
- **Backend**: Deployed on render for persistent WebSocket connections.

## Future Enhancements
- Persistent message storage using a database.
- Support for multimedia messaging (images, files, etc.).
- Advanced security features, including encryption.
- User authentication.

