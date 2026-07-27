# Challenges Manager

Challenges Manager is a full-stack web application developed during the **STEPathON Internship**.

The application allows users to create and manage walking challenges, upload challenge images, join challenges, submit their daily steps, and track the state of each challenge. The project is deployed online and uses Firebase services for authentication, storage and hosting.

---

# Live Demo

Frontend

https://challenges-manager.web.app

Backend

https://challenges-manager.onrender.com

---

# Features

- User registration with Firebase Authentication
- User login and logout
- Password reset via email
- Protected routes
- Administrator and regular user roles
- Create, edit and delete challenges (admin only)
- Join challenges
- Submit daily steps
- Automatic challenge states:
  - Upcoming
  - Active
  - Completed
  - Failed
- Image upload using Firebase Storage
- English and Romanian languages
- Dark and light mode
- Responsive Bootstrap interface
- Automated tests with Vitest
- Deployment using Render and Firebase Hosting

---

# Technologies

## Front End

- React
- Vite
- React Router
- React Bootstrap
- Bootstrap
- i18next
- Firebase Authentication
- Firebase Storage

## Back End

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Firebase Admin SDK

## Tools

- Git
- GitHub
- Vitest
- Husky
- ESLint
- Render
- Firebase Hosting

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/cojocarumaia/challenges-manager.git
cd challenges-manager
```

---

## 2. Configure the Back End

Navigate to the **server** folder and create a file named `.env`.

You can use `.env.sample` as a template.

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

---

## 3. Install the Back End dependencies

```bash
cd server
npm install
```

---

## 4. Configure Firebase

Create a Firebase project.

Enable:

- Authentication
  - Email / Password
- Storage
- Hosting

Register a Web App and copy the Firebase configuration values.

---

## 5. Configure the Front End

Navigate to the **client** folder and create a file named `.env`.

You can use `.env.sample` as a template.

Add:

```env
VITE_API_BASE_URL=http://localhost:4000

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 6. Install the Front End dependencies

```bash
cd ../client
npm install
```

---

# Running the Application

Open **two terminals**.

## Terminal 1 – Back End

```bash
cd server
npm run dev
```

The server runs at

```
http://localhost:4000
```

---

## Terminal 2 – Front End

```bash
cd client
npm run dev
```

The application runs at

```
http://localhost:5173
```

Open

```
http://localhost:5173
```

---

# Running the Tests

## Back End

```bash
cd server
npm test
```

## Front End

```bash
cd client
npm test
```

---

# Project Structure

```text
challenges-manager
│
├── client
├── server
├── docs
├── README.md
└── .gitignore
```

---

# API Endpoints

## Health Check

```
GET /health
```

Returns

```json
{
  "status": "ok"
}
```

---

## Challenges

```
GET    /api/challenges
GET    /api/challenges/:id
POST   /api/challenges
PUT    /api/challenges/:id
DELETE /api/challenges/:id
```

---

## Participation

```
POST /api/challenges/:challengeId/join
POST /api/challenges/:challengeId/steps
GET  /api/challenges/participations/me
```

---

# Deployment

## Front End

Firebase Hosting

https://challenges-manager.web.app

## Back End

Render

https://challenges-manager.onrender.com

Health Check

https://challenges-manager.onrender.com/health

API

https://challenges-manager.onrender.com/api/challenges

---

# Screenshots

## Challenges List

![Challenges List](docs/screenshots/challenges-list.png)

## Create Challenge

![Create Challenge](docs/screenshots/create-challenge.png)

---

# Author

Developed by **Maia Cojocaru** during the **STEPathON Internship (2026)**.