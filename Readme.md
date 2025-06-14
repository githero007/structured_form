🚀 Setup & Run Instructions
Run through Node.js <br>
cd backend # Enter the backend directory <br>
npm install # Install all required dependencies <br>
node server # Start the server <br>
Your site will now be available at: <br>
http://localhost:3000/ <br>

🐳 Run using Docker <br>
docker build -t form . # Build the Docker image <br>
docker run -p 3000:3000 form # Run the container on port 3000 <br>
You can now access your app at: <br>
http://localhost:3000/ <br>

🌐 Access Online <br>
The project is deployed at: <br>
https://structured-form-1.onrender.com/ <br>

⚠️ Note: <br>
Please disable AdBlock (it may block socket requests). <br>
Use Chrome (Brave browser may flag socket requests as pop-ups). <br>

Architecture Diagram
![alt text](architecture-diagram.png)
<br>

Technologies Used And Why
Frontend <br>
⚛️ ReactJS: Enables faster deployment and development of dynamic, component-based user interfaces. <br>
axios: Used to send HTTP requests from the frontend to the backend efficiently. <br>
socket.io-client: Handles communication with the Socket.io server to support real-time updates and collaboration. <br>
react-router: Manages client-side routing and enables rendering of different components based on the URL. <br>

Backend <br>
🟢 Node.js: Provides a runtime environment to execute JavaScript code server-side. <br>
Express: A minimal and flexible framework to create an HTTP server and handle routing and middleware. <br>
Mongoose: Simplifies interactions with MongoDB and allows defining schemas for structured data. <br>
redis client: Connects with Redis, and enables field locking to avoid race case conditions. <br>
⚡ socket.io: Facilitates real-time, bidirectional communication between clients and the server for live form updates. <br>
cors: Configured to securely allow cross-origin requests from the frontend. <br>

Docker <br>
🐳 Docker: Containerizes the application to ensure consistent environments across development, testing, and production. Simplifies deployment and scaling by packaging the app with its dependencies. <br>

Key Features
Users can sign up and log in securely. <br>
Users can create dynamic forms with customizable fields such as number, text, email, and dropdown. <br>
Forms can be shared via a unique code to allow access by others. <br>
Forms can be accessed and filled by users using the shared code. <br>
Multiple users can collaborate on the same form simultaneously and provide answers concurrently. <br>
Real-time synchronization of form responses is enabled using WebSockets, ensuring all collaborators see updates instantly. <br>
Users can lock individual fields to answer them exclusively without interference from others. <br>
Once completed, users can submit the form, and responses are securely stored and viewable by the form owner. <br>

Edge Cases Handled
Concurrent Edits <br>
To enable multiple users to collaborate on the same form simultaneously, the system uses WebSockets combined with Redis to track open and locked fields. <br>
Real-time updates are communicated via WebSocket events, allowing clients to respond to changes dynamically and avoid conflicting edits. <br>

Race Condition & Field Locking <br>
To prevent multiple users from editing the same field simultaneously and causing race conditions, the system implements a field-locking mechanism with a Time-To-Live (TTL) of 5 minutes: <br>

When a user attempts to edit a field, the client sends a lockField event through the WebSocket, including the questionId. <br>
The server stores this lock in Redis with the questionId as the key and the locking user's userId as the value, along with the TTL. <br>
On subsequent edit attempts: <br>
The system checks if the field is locked in Redis. <br>
If not locked, editing is allowed. <br>
If locked, it checks if the requester is the same user who holds the lock. <br>
If yes, editing is permitted. <br>
If no, editing is denied until the lock expires or is released. <br>

This approach ensures safe, conflict-free collaborative editing with automatic lock expiry to avoid stale locks. <br>
ADDED VIDEO https://youtu.be/Ov1B0nppBqU
