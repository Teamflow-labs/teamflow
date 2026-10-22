# TEAMFLOW PROJECT MANAGEMENT SYSTEM
## API Documentation

**Version:** 1.0  
**Status:** Draft  
**API Base Path:** `/api/v1`  
**Backend Technology:** Node.js and Express.js  
**Database:** MongoDB  
**Authentication:** JSON Web Token (JWT)  
**Frontend:** React.js

---

## 1. Introduction

TeamFlow is a project management system designed to help users create and manage projects, organize tasks, monitor progress, and collaborate efficiently.

This document defines the API endpoints required to support user authentication, project management, and task management. It specifies the HTTP methods, endpoint paths, authentication requirements, request payloads, response payloads, expected status codes, and standardized error responses.

The API follows RESTful design principles and exchanges data using JSON.

## 2. General API Standards

### 2.1 Base URL

All API endpoints will use the following base path:

`/api/v1`

The final deployment domain will be determined during deployment.

### 2.2 Data Format

- Request bodies must use JSON where a body is required.
- Successful responses should return JSON.
- Dates and timestamps should use ISO 8601 format.
- Resource identifiers should use MongoDB document IDs.
- Error responses should follow a consistent structure.

### 2.3 Authentication

Protected endpoints require a valid JWT access token in the Authorization header.

The token is obtained after successful registration or login.

**Authentication requirement:** Bearer token authentication.

Public endpoints do not require an access token.

### 2.4 Common Response Fields

Successful responses may contain:

- `success`: Indicates whether the operation succeeded.
- `message`: A human-readable description of the result.
- `data`: The requested resource or operation result.

The exact response structure should remain consistent across the API.

---

## 3. Authentication Endpoints

Authentication allows users to register an account, log in, retrieve their profile, and log out.

### 3.1 Register a New User

**Endpoint:** `/api/v1/auth/register`  
**HTTP Method:** POST  
**Authentication:** Not required

**Purpose:** Creates a new user account.

**Request payload:**
- `name`: User's full name.
- `email`: User's email address.
- `password`: User's chosen password.

**Successful response — 201 Created:**
- `success`: true
- `message`: Account created successfully.
- `data`: Contains the new user's ID, name, and email.

The password must never be returned in the response.

**Possible status codes:**
- `201 Created`: Account created successfully.
- `400 Bad Request`: Required fields are missing or invalid.
- `409 Conflict`: An account with the email address already exists.
- `500 Internal Server Error`: An unexpected server error occurred.

### 3.2 Log In

**Endpoint:** `/api/v1/auth/login`  
**HTTP Method:** POST  
**Authentication:** Not required

**Purpose:** Authenticates an existing user and provides an access token.

**Request payload:**
- `email`: Registered email address.
- `password`: Account password.

**Successful response — 200 OK:**
- `success`: true
- `message`: Login successful.
- `data`: Contains the access token and authenticated user's profile information.

**Possible status codes:**
- `200 OK`: Login successful.
- `400 Bad Request`: Required login fields are missing.
- `401 Unauthorized`: Email or password is incorrect.
- `500 Internal Server Error`: An unexpected server error occurred.

### 3.3 Get Current User Profile

**Endpoint:** `/api/v1/auth/me`  
**HTTP Method:** GET  
**Authentication:** Required

**Purpose:** Retrieves the profile of the currently authenticated user.

**Request payload:** None.

**Successful response — 200 OK:**
- `success`: true
- `data`: Contains the user's ID, name, email, and account creation date.

**Possible status codes:**
- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: Token is missing, invalid, or expired.
- `500 Internal Server Error`: An unexpected server error occurred.

### 3.4 Log Out

**Endpoint:** `/api/v1/auth/logout`  
**HTTP Method:** POST  
**Authentication:** Required

**Purpose:** Ends the user's authenticated session according to the implemented token-management strategy.

**Request payload:** None.

**Successful response — 200 OK:**
- `success`: true
- `message`: Logout successful.

**Possible status codes:**
- `200 OK`: Logout processed successfully.
- `401 Unauthorized`: Token is missing or invalid.
- `500 Internal Server Error`: An unexpected server error occurred.

**Implementation note:** If JWTs are stateless, logging out on the frontend alone does not invalidate a copied token on the server. Server-side invalidation requires a defined mechanism, such as a token blacklist or refresh-token revocation.

---

## 4. Project Management Endpoints

These endpoints allow authenticated users to create, view, update, and delete projects.

### 4.1 Create a Project

**Endpoint:** `/api/v1/projects`  
**HTTP Method:** POST  
**Authentication:** Required

**Purpose:** Creates a new project owned by the authenticated user.

**Request payload:**
- `name`: Project name.
- `description`: Brief description of the project.
- `status`: Project status, such as active, completed, or archived.

**Successful response — 201 Created:**
- `success`: true
- `message`: Project created successfully.
- `data`: Contains the project ID, name, description, status, owner ID, and timestamps.

The project owner should be assigned from the authenticated user's identity rather than accepted as an unrestricted client-supplied value.

**Possible status codes:**
- `201 Created`: Project created successfully.
- `400 Bad Request`: Project details are invalid.
- `401 Unauthorized`: Authentication is required.
- `500 Internal Server Error`: An unexpected server error occurred.

### 4.2 Get All Projects

**Endpoint:** `/api/v1/projects`  
**HTTP Method:** GET  
**Authentication:** Required

**Purpose:** Retrieves projects the authenticated user is authorized to access.

**Request payload:** None.

**Optional query parameters:**
- `page`: Page number for pagination.
- `limit`: Number of projects per page.
- `status`: Filters projects by status.

**Successful response — 200 OK:**
- `success`: true
- `data`: An array of project records.
- `pagination`: Optional pagination details, including the current page and total records.

**Possible status codes:**
- `200 OK`: Projects retrieved successfully.
- `401 Unauthorized`: Authentication is required.
- `500 Internal Server Error`: An unexpected server error occurred.

### 4.3 Get a Single Project

**Endpoint:** `/api/v1/projects/:projectId`  
**HTTP Method:** GET  
**Authentication:** Required

**Purpose:** Retrieves details of a specific project.

**Request parameters:**
- `projectId`: Unique identifier of the project.

**Successful response — 200 OK:**
- `success`: true
- `data`: The project record, including its name, description, status, owner, and timestamps.

**Possible status codes:**
- `200 OK`: Project retrieved successfully.
- `400 Bad Request`: Project ID has an invalid format.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User does not have permission to access the project.
- `404 Not Found`: Project does not exist or is not accessible to the user.
- `500 Internal Server Error`: An unexpected server error occurred.

### 4.4 Update a Project

**Endpoint:** `/api/v1/projects/:projectId`  
**HTTP Method:** PATCH  
**Authentication:** Required

**Purpose:** Updates one or more fields of an existing project.

**Request parameters:**
- `projectId`: Unique identifier of the project.

**Request payload:** One or more supported fields, such as:
- `name`
- `description`
- `status`

**Successful response — 200 OK:**
- `success`: true
- `message`: Project updated successfully.
- `data`: The updated project record.

**Possible status codes:**
- `200 OK`: Project updated successfully.
- `400 Bad Request`: Invalid project ID or field values.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks permission to update the project.
- `404 Not Found`: Project does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

### 4.5 Delete a Project

**Endpoint:** `/api/v1/projects/:projectId`  
**HTTP Method:** DELETE  
**Authentication:** Required

**Purpose:** Deletes a project the user is authorized to manage.

**Request parameters:**
- `projectId`: Unique identifier of the project.

**Request payload:** None.

**Successful response — 200 OK:**
- `success`: true
- `message`: Project deleted successfully.

**Possible status codes:**
- `200 OK`: Project deleted successfully.
- `400 Bad Request`: Invalid project ID.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks permission to delete the project.
- `404 Not Found`: Project does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

**Implementation note:** The team must decide whether deleting a project also deletes its tasks, archives them, or prevents deletion while tasks remain.

---

## 5. Task Management Endpoints

Task management enables users to create, retrieve, update, and delete tasks associated with projects.

### 5.1 Create a Task

**Endpoint:** `/api/v1/projects/:projectId/tasks`  
**HTTP Method:** POST  
**Authentication:** Required

**Purpose:** Creates a task within a specified project.

**Request parameters:**
- `projectId`: Identifier of the project to which the task belongs.

**Request payload:**
- `title`: Task title.
- `description`: Details of the task.
- `status`: Task status, such as todo, in progress, or completed.
- `priority`: Priority level, such as low, medium, or high.
- `dueDate`: Optional task deadline.
- `assigneeId`: Optional identifier of the assigned user, if assignment is supported.

**Successful response — 201 Created:**
- `success`: true
- `message`: Task created successfully.
- `data`: Contains the task ID, title, description, status, priority, project ID, assignee, due date, and timestamps.

**Possible status codes:**
- `201 Created`: Task created successfully.
- `400 Bad Request`: Required fields are missing or invalid.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks permission to create tasks in the project.
- `404 Not Found`: Project does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

### 5.2 Get All Tasks in a Project

**Endpoint:** `/api/v1/projects/:projectId/tasks`  
**HTTP Method:** GET  
**Authentication:** Required

**Purpose:** Retrieves tasks belonging to a specific project.

**Request parameters:**
- `projectId`: Identifier of the project.

**Optional query parameters:**
- `status`: Filter tasks by status.
- `priority`: Filter tasks by priority.
- `assigneeId`: Filter by assigned user, if assignment is supported.
- `page`: Page number.
- `limit`: Number of tasks per page.

**Successful response — 200 OK:**
- `success`: true
- `data`: An array of task records.
- `pagination`: Optional pagination details.

**Possible status codes:**
- `200 OK`: Tasks retrieved successfully.
- `400 Bad Request`: Invalid query parameters or project ID.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks access to the project.
- `404 Not Found`: Project does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

### 5.3 Get a Single Task

**Endpoint:** `/api/v1/tasks/:taskId`  
**HTTP Method:** GET  
**Authentication:** Required

**Purpose:** Retrieves details of a specific task.

**Request parameters:**
- `taskId`: Unique identifier of the task.

**Successful response — 200 OK:**
- `success`: true
- `data`: The task record, including its project ID, title, description, status, priority, due date, and timestamps.

**Possible status codes:**
- `200 OK`: Task retrieved successfully.
- `400 Bad Request`: Invalid task ID.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks access to the task.
- `404 Not Found`: Task does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

### 5.4 Update a Task

**Endpoint:** `/api/v1/tasks/:taskId`  
**HTTP Method:** PATCH  
**Authentication:** Required

**Purpose:** Updates one or more fields of an existing task.

**Request parameters:**
- `taskId`: Unique identifier of the task.

**Request payload:** One or more supported fields, such as:
- `title`
- `description`
- `status`
- `priority`
- `dueDate`
- `assigneeId`, if task assignment is supported.

**Successful response — 200 OK:**
- `success`: true
- `message`: Task updated successfully.
- `data`: The updated task record.

**Possible status codes:**
- `200 OK`: Task updated successfully.
- `400 Bad Request`: Invalid task ID or field values.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks permission to update the task.
- `404 Not Found`: Task does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

### 5.5 Delete a Task

**Endpoint:** `/api/v1/tasks/:taskId`  
**HTTP Method:** DELETE  
**Authentication:** Required

**Purpose:** Deletes a task the user is authorized to manage.

**Request parameters:**
- `taskId`: Unique identifier of the task.

**Request payload:** None.

**Successful response — 200 OK:**
- `success`: true
- `message`: Task deleted successfully.

**Possible status codes:**
- `200 OK`: Task deleted successfully.
- `400 Bad Request`: Invalid task ID.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: User lacks permission to delete the task.
- `404 Not Found`: Task does not exist or is not accessible.
- `500 Internal Server Error`: An unexpected server error occurred.

---

## 6. Standard HTTP Status Codes

The API will use standard HTTP status codes to communicate the outcome of each request.

| Status code | Meaning | Typical use |
|---|---|---|
| 200 OK | Request successful | Retrieving or updating resources |
| 201 Created | Resource created | Registering users, creating projects or tasks |
| 204 No Content | Request successful without a response body | Optional alternative for successful deletion |
| 400 Bad Request | Invalid request | Missing fields, validation failures, malformed IDs |
| 401 Unauthorized | Authentication failed or is missing | Invalid or expired access token |
| 403 Forbidden | Permission denied | Attempting to access a resource without authorization |
| 404 Not Found | Resource unavailable | Project or task does not exist or is inaccessible |
| 409 Conflict | Resource conflict | Duplicate email during registration |
| 422 Unprocessable Content | Request cannot be processed | Optional use for semantically invalid data |
| 429 Too Many Requests | Rate limit exceeded | Excessive login or API requests, if rate limiting is implemented |
| 500 Internal Server Error | Unexpected server failure | Unhandled backend errors |

The backend team should use these codes consistently. The same error should not return different status codes across similar endpoints without a clear reason.

---

## 7. Standard Error Response Format

All API errors should follow a consistent JSON structure.

**Error response fields:**

- `success`: Always false.
- `message`: A clear, human-readable explanation.
- `error.code`: A stable machine-readable error identifier.
- `error.details`: Optional validation details or additional safe information.

### Common Error Categories

**Validation error:** Occurs when required fields are missing or invalid.

**Authentication error:** Occurs when credentials are incorrect or the access token is invalid.

**Authorization error:** Occurs when the authenticated user lacks permission to perform an operation.

**Resource error:** Occurs when a requested project or task cannot be found or accessed.

**Server error:** Occurs when an unexpected problem prevents the request from completing.

### Error Handling Requirements

- Never expose passwords, JWT secrets, database credentials, stack traces, or other sensitive internal details in production responses.
- Use consistent error codes and messages.
- Validate request data before database operations.
- Log unexpected server errors securely on the backend.
- Ensure error responses do not reveal the existence of resources that the user is not permitted to access, where the project's access-control policy requires concealment.

---

## 8. Authentication and Authorization Rules

1. Registration and login are public endpoints.
2. All project and task endpoints require authentication.
3. Users may access only projects and tasks permitted by the application's ownership or membership rules.
4. The server must verify authorization for every protected resource, not merely the presence of a valid token.
5. Passwords must be securely hashed before storage.
6. Tokens must be validated on every protected request.
7. Sensitive user information must not be included in API responses.
8. Token expiration and logout behavior must be defined before production release.

**Important:** Project ownership and team membership are separate authorization concepts. If TeamFlow will support shared projects, the team must define member roles and permissions before finalizing access-control rules.

---

## 9. Validation and Data Integrity

The backend should validate all incoming request data.

### User Validation
- Name is required.
- Email must be valid and unique.
- Password must satisfy the agreed security policy.

### Project Validation
- Project name is required.
- Description must follow the agreed length limit.
- Status must be one of the supported project statuses.

### Task Validation
- Task title is required.
- The associated project must exist and be accessible to the user.
- Status and priority must match supported values.
- Due dates must use the agreed date format.
- Assigned users must be eligible members of the project, if assignment is supported.

Invalid input should return a consistent client error response.

---

## 10. API Security Requirements

The implementation should follow these security practices:

- Use HTTPS in production.
- Hash passwords with a suitable password-hashing algorithm.
- Store secrets in environment variables or an appropriate secrets manager.
- Validate and sanitize incoming data.
- Enforce authorization at the resource level.
- Apply rate limiting to sensitive endpoints, especially login and registration.
- Avoid returning confidential information in errors.
- Configure Cross-Origin Resource Sharing (CORS) for approved frontend origins.
- Define an appropriate JWT expiration and refresh strategy.
- Use secure cookie settings if authentication tokens are stored in cookies.

---

## 11. Pagination, Filtering and Sorting

List endpoints may support pagination and filtering to improve performance as the number of projects and tasks increases.

Supported options may include:

- Page number.
- Page size.
- Task status.
- Task priority.
- Assigned user.
- Project status.
- Sorting by creation date or due date.

The API should document default pagination values and maximum page sizes once agreed by the team.

---

## 12. Endpoint Summary

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register a user | No |
| POST | `/api/v1/auth/login` | Log in | No |
| GET | `/api/v1/auth/me` | Get current profile | Yes |
| POST | `/api/v1/auth/logout` | Log out | Yes |
| POST | `/api/v1/projects` | Create a project | Yes |
| GET | `/api/v1/projects` | List accessible projects | Yes |
| GET | `/api/v1/projects/:projectId` | Get a project | Yes |
| PATCH | `/api/v1/projects/:projectId` | Update a project | Yes |
| DELETE | `/api/v1/projects/:projectId` | Delete a project | Yes |
| POST | `/api/v1/projects/:projectId/tasks` | Create a task | Yes |
| GET | `/api/v1/projects/:projectId/tasks` | List project tasks | Yes |
| GET | `/api/v1/tasks/:taskId` | Get a task | Yes |
| PATCH | `/api/v1/tasks/:taskId` | Update a task | Yes |
| DELETE | `/api/v1/tasks/:taskId` | Delete a task | Yes |

---

## 13. Items Requiring Team Confirmation

Before implementation, the development team should agree on the following:

1. **Project access:** Will projects be private to their owners or shared with team members?
2. **Roles and permissions:** Will the system support roles such as admin, project owner, and member?
3. **Task assignment:** Can tasks be assigned to other users?
4. **Task statuses:** Will the application use To Do, In Progress, and Completed, or other statuses?
5. **Project deletion:** Should deleting a project also delete its associated tasks?
6. **Authentication strategy:** Will the application use access tokens only or access and refresh tokens?
7. **Logout behavior:** Will token invalidation be handled on the server?
8. **Pagination defaults:** What page size and maximum page size should the API enforce?
9. **Additional features:** Will comments, notifications, file attachments, or activity logs be included in the current release?

These decisions should be documented and agreed upon before the API contract is treated as final.

---

## 14. Conclusion

This document establishes the proposed API contract for the TeamFlow Project Management System. It provides a common reference for frontend and backend development, helping ensure consistent communication between the React frontend, Express backend, and MongoDB database.

The endpoint paths and payloads in this document are proposed specifications. They should be reviewed against the project's approved requirements and implemented routes before being considered final.

**Document status:** Draft for team review and implementation planning.