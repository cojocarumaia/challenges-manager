# Challenges Manager

Challenges Manager is a full-stack web application developed during the STEPathON Internship.

The application allows users to create, view, edit and delete walking challenges.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/cojocarumaia/challenges-manager.git
cd challenges-manager
```

### 2. Configure the back end

Go to the `server` folder and create a file named `.env`.

You can use `.env.sample` as a template.

Add your MongoDB Atlas connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

### 3. Install the back-end dependencies

```bash
cd server
npm install
```

### 4. Configure the front end

Go to the `client` folder and create a file named `.env`.

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

### 5. Install the front-end dependencies

```bash
cd ../client
npm install
```

## Running the application

Open **two terminals**.

### Terminal 1 - Back end

```bash
cd server
npm run dev
```

The server runs at:

```
http://localhost:4000
```

### Terminal 2 - Front end

```bash
cd client
npm run dev
```

The application runs at:

```
http://localhost:5173
```

Open:

```
http://localhost:5173
```

## Back-end addresses

### Health check

```
GET /health
```

Returns:

```json
{
  "status": "ok"
}
```

### Get all challenges

```
GET /api/challenges
```

Returns all challenges.

### Get one challenge

```
GET /api/challenges/:id
```

Returns a challenge by its ID.

### Create a challenge

```
POST /api/challenges
```

### Update a challenge

```
PUT /api/challenges/:id
```

### Delete a challenge

```
DELETE /api/challenges/:id
```

## Screenshots

### Challenges List

![Challenges List](docs/screenshots/challenges-list.png)

### Create Challenge

![Create Challenge](docs/screenshots/create-challenge.png)

## Live Backend

The deployed back-end is available at:

https://challenges-manager.onrender.com

Health check:
https://challenges-manager.onrender.com/health

API:
https://challenges-manager.onrender.com/api/challenges

## Live Demo

Frontend:
https://challenges-manager.web.app

Backend:
https://challenges-manager.onrender.com