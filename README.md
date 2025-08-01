 # 🛡️ Anti-Cyberbullying Student Network

## 🚩 Problem Statement

Many students face cyberbullying but hesitate to speak up due to fear of judgment or retaliation. They often suffer in silence, unsure of where to turn for help. This creates emotional distress and isolation. There’s a clear need for a safe, anonymous platform where students can report incidents and seek support without fear.

---

## 🎯 Purpose of the Application

This web application provides a secure and anonymous space for students to report cases of cyberbullying. It allows them to express their concerns safely and helps schools or colleges monitor and respond to incidents. The platform ensures privacy while encouraging students to take a step toward solving the issue.

---

## 🛠️ Technology Stack

### 🎨 Frontend:
- HTML, CSS, JavaScript
- React.js
- Axios

### 🔧 Backend:
- Node.js
- Express.js

### 🗄️ Database:
- MongoDB (MongoDB Atlas)

### 🔐 Security & Libraries:
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing

---

## 🗂️ System Architecture

User → Frontend (React) → Backend (Express API) → MongoDB (Database)


- User interacts with the frontend (login, register, submit reports)
- Frontend sends API requests to the backend
- Backend processes requests and interacts with MongoDB

---

## 🗃️ Database Schema

### 👤 Users Collection:
- `email` (String)
- `password` (Hashed String)

### 📝 Reports Collection:
- `type` (String)
- `description` (String)
- `date` (Timestamp)

---

## 🔌 API Endpoints

### 🔐 Auth Routes

- `POST /api/auth/register`  
  Registers a new user  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

POST /api/auth/login
Logs in a user and returns a JWT token

Response:
json
{
  "token": "your-jwt-token"
}


📝 Report Routes
POST /api/reports
Submit an anonymous report

Request Body:
json
{
  "type": "Harassment",
  "description": "Being targeted with mean comments online"
}

GET /api/reports
Fetch all submitted reports

DELETE /api/reports/:id
Delete a report by its ID

💡 Key Features
✅ Anonymous reporting system
✅ Secure login and registration using JWT
✅ Dark mode responsive UI
✅ View and delete submitted reports
✅ MongoDB-based data storage
✅ Protected routes using middleware


🚀 Deployment
🔷 Deployment Platform
Frontend was deployed using Vercel
Chosen for its smooth integration with React apps and GitHub.
Vercel handles automatic build and deployment from GitHub repositories.
Set environment variables like backend API URL using Vercel dashboard.
Backend was deployed using Render
Render was used to host our Express server with auto-redeploy on Git updates.
MongoDB Atlas URI and JWT secret were stored securely in environment settings.


🌍 Live URLs
Frontend (Vercel)
👉 https://anti-cyberbullying-network.vercel.app

Backend (Render)
👉 https://anti-cyberbullying-network.onrender.com

💻 Run Locally
🔧 Clone the repository

git clone https://github.com/srujanamaruthu/anti-cyberbullying-network.git


🔹 Backend Setup

cd server
npm install
npm start

🔹 Frontend Setup
Open another terminal:

cd client
npm install
npm start

👩‍💻 Author
Srujana Maruthu
📧 Email: srujana_maruthu@srmap.edu.in.com
📱 Mobile: 9182443247
🌐 GitHub: @srujanamaruthu

