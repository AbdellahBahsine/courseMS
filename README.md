# Course Management System

This application provides an intuitive interface for managing courses. It features user authentication, course listings with advanced search and filtering options, and pagination for easy browsing.

## 🎯 Key Features Breakdown

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


## 💻 Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **State Management**: React Hooks && ContextAPI
- **Authentication**: JWT (Bearer Token)
- **Styling**: CSS Modules

---

## 🔗 API Endpoints

### **Authentication Endpoints:**

- **POST /auth/login**
  - Authenticates a user and returns a JWT access token.
  - **Body**: `{ "username": "string", "password": "string" }`

- **POST /auth/register**
  - Registers a new user.
  - **Body**: `{ "username": "string", "password": "string", "firstName": "string", "lastName": "string" }`

### **Course Endpoints:**

- **GET /courses**
  - Retrieves a paginated list of courses with optional filters for title and instructor.
  - **Query Params**: 
    - `page` (optional): page number (default: 1)
    - `limit` (optional): number of courses per page (default: 10)
    - `title` (optional): filter by course title
    - `instructor` (optional): filter by instructor name

- **GET /courses/:id**
  - Retrieves details of a specific course by its ID.

- **POST /courses**
  - Adds a new course.
  - **Body**: `{ "title": "string", "description": "string", "instructor": "string", "schedule": "string" }`
  - **Requires**: JWT Bearer Token in the `Authorization` header.

### **Other Endpoints:**

- **GET /profile**
  - Retrieves the profile of the authenticated user.
  - **Requires**: JWT Bearer Token in the `Authorization` header.

---

## 📦 Installation & Setup

You can run the app locally or view it live on Vercel.

### 1. View on Vercel
[Live Demo on Vercel](https://course-ms-client.vercel.app/)

### 2. Run Locally

#### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)
- NPM

#### Step-by-Step Guide

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/course-management-system.git
   cd course-management-system

2. **Navigate to the Client and API Directories:**
   ```bash
   cd client   # for the Next.js frontend
   cd api   # for the NestJS backend

3. **Install Dependencies:**
   ```bash
   #For the client:
   cd client
   npm install
   ```
  ```bash
  #For the backend:
  cd api
  npm install
```
4. **Setup Environment Variables:**
Create a .env file in both the client and api folders and include environment variables.
```bash
  #Frontend (client/.env):
  NEXT_PUBLIC_API_URI=http://localhost:3001
```
```bash
  #Backend (api/.env):
  DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDB
  JWT_SECRET=yourSecretKey
```
5. **Run the Development Servers:**
  ```bash
  #Client (Frontend):
  cd client
  npm run dev
```
The client will be available at http://localhost:3000
```bash
#Backend (API):
cd api
npm run start:dev
```
The backend will be running at http://localhost:5000
6. **Access the Application:** Visit the client at http://localhost:3000, and it will interact with the API running at http://localhost:3001

   
