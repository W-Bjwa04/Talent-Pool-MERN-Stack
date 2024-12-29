# Talent Pool

## Overview
The Job Serach Platform connects job seekers and employers, providing a seamless platform for job applications and postings. It simplifies the recruitment process with its robust frontend and backend architecture.

---

## Features
### For Job Seekers
- Browse and search for jobs.
- Apply for jobs with resumes and cover letters.
- Track application status via the dashboard.

### For Employers
- Post job openings.
- Manage job listings.
- Review and manage applications.

---

## Tech Stack
### Frontend
- **Framework/Library:** React.js
- **Styling:** Raw CSS
- **State Management:** Context API
- **Utilities:**
  - `axios` for API requests
  - `react-router-dom` for routing
  - `react-icons` for icons

### Backend
- **Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **File Management:** Cloudinary
- **Utilities:**
  - `bcrypt` for password encryption
  - `dotenv` for environment variables

---

## Installation
### Prerequisites
- Node.js installed
- MongoDB instance set up

### Steps
#### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

#### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage
1. Access the frontend at `http://localhost:3000`.
2. Interact with the backend API at `http://localhost:4000`.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License.
