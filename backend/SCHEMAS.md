# Teamflow Database Schema Documentation

## Overview

Teamflow uses MongoDB with Mongoose to manage users, projects, project memberships, and tasks.

All four schemas use Mongoose timestamps, which automatically maintain `createdAt` and `updatedAt` fields.

References between collections use MongoDB `ObjectId` values.

---

## 1. User Schema

**Collection:** `users`

Stores user account and profile information.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | String | Yes | None | User's full name |
| `email` | String | Yes | None | User's unique email address |
| `password` | String | Yes | None | Hashed password; excluded from query results by default |
| `avatar` | String | No | `null` | Profile image URL |
| `isActive` | Boolean | No | `true` | Indicates whether the account is active |
| `createdAt` | Date | Automatic | Current date/time | Record creation timestamp |
| `updatedAt` | Date | Automatic | Current date/time | Last update timestamp |

### Validation

- `name`, `email`, and `password` are required.
- `email` should be trimmed and stored in lowercase.
- `email` must be unique.
- Passwords must be hashed before being stored.

### Indexes

- Unique index on `email` to prevent duplicate accounts.

---

## 2. Project Schema

**Collection:** `projects`

Stores project details and ownership information.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | String | Yes | None | Project name |
| `description` | String | No | Empty string | Project description |
| `owner` | ObjectId | Yes | None | Reference to the `User` collection |
| `status` | String | No | `active` | Project status: `active` or `archived` |
| `startDate` | Date | No | `null` | Project start date |
| `dueDate` | Date | No | `null` | Project deadline |
| `createdAt` | Date | Automatic | Current date/time | Record creation timestamp |
| `updatedAt` | Date | Automatic | Current date/time | Last update timestamp |

### Validation

- `name` and `owner` are required.
- `owner` references a user document.
- `status` must be either `active` or `archived`.
- `dueDate` should not precede `startDate` when both are supplied.

### Indexes

- Index on `owner` and `status` for filtering projects by owner and status.
- Index on `updatedAt` for sorting projects by recent updates.

---

## 3. ProjectMembership Schema

**Collection:** `projectmemberships`

Connects users to projects and defines their roles within each project.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `project` | ObjectId | Yes | None | Reference to the `Project` collection |
| `user` | ObjectId | Yes | None | Reference to the `User` collection |
| `role` | String | Yes | `member` | Membership role |
| `joinedAt` | Date | No | Current date/time | Date the user joined the project |
| `createdAt` | Date | Automatic | Current date/time | Record creation timestamp |
| `updatedAt` | Date | Automatic | Current date/time | Last update timestamp |

### Validation

- `project`, `user`, and `role` are required.
- `project` references a project document.
- `user` references a user document.
- `role` must be one of:
  - `admin`
  - `project_manager`
  - `member`
- A user must not have duplicate membership records for the same project.

### Indexes

- Unique compound index on `{ project: 1, user: 1 }` to prevent duplicate memberships.
- Compound index on `{ user: 1, role: 1 }` to support role-based membership queries.

---

## 4. Task Schema

**Collection:** `tasks`

Stores tasks and their assignments, statuses, priorities, and deadlines.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String | Yes | None | Task title |
| `description` | String | No | Empty string | Task details |
| `project` | ObjectId | Yes | None | Reference to the `Project` collection |
| `createdBy` | ObjectId | Yes | None | Reference to the `User` who created the task |
| `assignee` | ObjectId or null | No | `null` | Reference to the assigned `User` |
| `status` | String | No | `todo` | Current task status |
| `priority` | String | No | `medium` | Task priority |
| `dueDate` | Date | No | `null` | Task deadline |
| `createdAt` | Date | Automatic | Current date/time | Record creation timestamp |
| `updatedAt` | Date | Automatic | Current date/time | Last update timestamp |

### Validation

- `title`, `project`, and `createdBy` are required.
- `project` references a project document.
- `createdBy` and `assignee` reference user documents.
- `assignee` may be `null` until a user is assigned.
- `status` must be one of:
  - `todo`
  - `in_progress`
  - `in_review`
  - `done`
- `priority` must be one of:
  - `low`
  - `medium`
  - `high`
  - `urgent`

### Indexes

- Compound index on `{ project: 1, status: 1 }` for retrieving tasks by project and status.
- Compound index on `{ assignee: 1, status: 1 }` for retrieving assigned tasks by status.
- Compound index on `{ project: 1, dueDate: 1 }` for listing project tasks by deadline.

---

## Relationships Between Collections

- A user can own multiple projects.
- Users and projects have a many-to-many relationship through `ProjectMembership`.
- A project can contain multiple tasks.
- A task belongs to one project.
- A task has one creator and may have one assignee.

### Relationship Summary

| Relationship | Reference |
|---|---|
| Project owner | `Project.owner` → `User._id` |
| Membership project | `ProjectMembership.project` → `Project._id` |
| Membership user | `ProjectMembership.user` → `User._id` |
| Task project | `Task.project` → `Project._id` |
| Task creator | `Task.createdBy` → `User._id` |
| Task assignee | `Task.assignee` → `User._id` |

## Security and Integrity Notes

- Passwords must be hashed before storage and excluded from query results by default.
- Unique indexes must be created in MongoDB to enforce uniqueness reliably.
- Role-based permissions must also be enforced by the backend; a schema role field alone does not provide authorization.
- Referenced documents should be validated by the application where appropriate.
- Index definitions in this document must match the indexes configured in the actual Mongoose models.
