# Course Management System

This application provides an intuitive interface for managing courses. It features user authentication, course listings with search and filtering options, and pagination for easy browsing.

### Features

- **Authentication**: 
  - Secure login and registration using JWT (JSON Web Tokens) for user authentication and session management.
  
- **Pagination & Filtering**:
  - Easily navigate through the course list with pagination.
  - Filter courses by title or instructor for precise search results.
  
- **Search Functionality**:
  - A search bar enables users to find courses quickly by title.

- **Course Management**:
  - Users can view detailed information about each course.
  - Logged in users have the ability to add new courses.

- **Course Details**:
  - Clicking on any course allows users to view more specific details like the instructor, schedule, and full description.

- **Responsive Design**:
  - The frontend is built with responsive design principles to ensure a seamless experience across all device sizes.

- **Backend API**:
  - A fully functional NestJS-based REST API to handle course management, user authentication, and data retrieval.
  
- **Deployment**:
  - Both the frontend (Next.js) and backend (NestJS) are deployed on Vercel.


### Technologies

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **State Management**: React Hooks && ContextAPI
- **Authentication**: JWT (Bearer Token)
- **Styling**: CSS Modules

### Installation & Setup

You can run the app locally or view it live on Vercel.

### 1. View on Vercel
[Live Demo on Vercel](https://course-ms-client.vercel.app/)

### 2. Run using Docker

#### Prerequisites
- Docker
- MongoDB (MongoDB Atlas)

#### Step-by-Step Guide

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/course-management-system.git
   cd course-management-system

2. **Create a .env file in the root directory and set up the following environment variables:**
- MONGO_URI="MongoDB URI"
- JWT_SECRET="JWT Secret Key"
- NEXT_PUBLIC_API_URI=http://localhost:5000
- CLIENT_URI=http://localhost:3000

3. **Run Docker Compose::**
   ```bash
     docker compose --env-file .env up --build
   ```
4. **Access the Application:** Visit the client at http://localhost:3000, and it will interact with the API running at http://localhost:5000
   
### 3. Run Manually
  Alternatively, you can run both the backend and frontend manually on your local machine by specifying the necessary environment variables (such as MONGO_URI, JWT_SECRET, NEXT_PUBLIC_API_URI, and CLIENT_URI). This involves setting up the API and client separately, installing dependencies, and running the servers for both parts of the application.

   
