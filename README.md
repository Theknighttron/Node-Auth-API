## API Documentation

This document outlines the endpoints available in the provided API along with the required data for each endpoint.

---

### Authentication Endpoints

#### Sign Up
- **Endpoint**: `/api/auth/signup`
- **Method**: POST
- **Description**: Registers a new user.
- **Data Required**:
  - `username`: Username of the user.
  - `email`: Email of the user.
  - `password`: Password of the user.
- **Middleware**:
  - `verifySignUp.checkDuplicateUsernameorEmail`: Checks for duplicate username or email.
  - `verifySignUp.checkRolesExisted`: Checks if provided roles exist.

#### Sign In
- **Endpoint**: `/api/auth/signin`
- **Method**: POST
- **Description**: Authenticates a user and provides an access token.
- **Data Required**:
  - `username`: Username of the user.
  - `password`: Password of the user.

#### Sign Out
- **Endpoint**: `/api/auth/signout`
- **Method**: POST
- **Description**: Signs out the user and clears the session.

---

### User Endpoints

#### Get User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: GET
- **Description**: Retrieves the profile information of the logged-in user.
- **Data Required**: None

#### Update User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: PUT
- **Description**: Updates the profile information of the logged-in user.
- **Data Required**:
  - `username`: Updated username of the user.
  - `email`: Updated email of the user.
  - `password` (optional): Updated password of the user.

#### Delete User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: DELETE
- **Description**: Deletes the profile of the logged-in user.
- **Data Required**: None

---

### Admin Endpoints

#### Get Admin Board
- **Endpoint**: `/api/admin/test`
- **Method**: GET
- **Description**: Provides access to admin content.
- **Data Required**: None

---

### Student Endpoints

#### Get All Students
- **Endpoint**: `/api/students`
- **Method**: GET
- **Description**: Retrieves a list of all students.
- **Data Required**: None

#### Get Student by ID
- **Endpoint**: `/api/student/:student_id`
- **Method**: GET
- **Description**: Retrieves details of a specific student by their ID.
- **Data Required**: `student_id` (in the URL)

#### Update Student
- **Endpoint**: `/api/student/:student_id`
- **Method**: PUT
- **Description**: Updates details of a specific student.
- **Data Required**:
  - `firstname`: Updated first name of the student.
  - `lastname`: Updated last name of the student.
  - `gender`: Updated gender of the student.
  - `email`: Updated email of the student.
  - `course`: Updated course of the student.
  - `level`: Updated level of the student.
- **Data Required**: `student_id` (in the URL)

#### Delete Student
- **Endpoint**: `/api/student/:student_id`
- **Method**: DELETE
- **Description**: Deletes a specific student.
- **Data Required**: `student_id` (in the URL)

#### Get Attendance by Date
- **Endpoint**: `/api/student/attendance/:date`
- **Method**: GET
- **Description**: Retrieves attendance records for a specific date.
- **Data Required**: `date` (in the URL)

#### Export Attendance Data
- **Endpoint**: `/api/student/attendance/export/:date`
- **Method**: GET
- **Description**: Exports attendance data in CSV format for a specific date.
- **Data Required**: `date` (in the URL)

---

### Additional Endpoints

#### Register Student
- **Endpoint**: `/api/register/student`
- **Method**: POST
- **Description**: Registers a new student.
- **Data Required**:
  - `firstname`: First name of the student.
  - `lastname`: Last name of the student.
  - `gender`: Gender of the student.
  - `student_id`: Student ID of the student.
  - `email`: Email of the student.
  - `course`: Course of the student.
  - `level`: Level of the student.

#### Mark Attendance
- **Endpoint**: `/api/attendance`
- **Method**: POST
- **Description**: Marks attendance for a student.
- **Data Required**:
  - `student_id`: ID of the student.
  - `status`: Attendance status (e.g., present, absent).

---

This documentation provides an overview of all available endpoints, their descriptions, methods, and required data for each endpoint.

