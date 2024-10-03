### API Endpoints List

**Authentication Endpoints:**

- **POST /auth/login**
  - Authenticates a user and returns a JWT access token.
  - **Body**: `{ "username": "string", "password": "string" }`

- **POST /auth/register**
  - Registers a new user.
  - **Body**: `{ "username": "string", "password": "string", "firstName": "string", "lastName": "string" }`

**Course Endpoints:**

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
