# Exercise 02 — Express REST API with Layered Architecture

## Goal

Build a REST API using Express.js that exposes student data through a clean 3-layer architecture: **routes → controllers → services**. Data is served from a hardcoded JavaScript file (`data/students.js`).

## What you will build

An HTTP server that responds to requests on `/students` endpoints, returning data from `data/students.js` through three separated layers.

## Run it

```bash
cd BACK
npm install
npm run dev
```

The server starts on `http://localhost:3000`. Use Postman or the provided frontend to test your endpoints.

> `npm run dev` uses **nodemon** — it restarts the server automatically whenever you save a file.

## Project structure

```
BACK/
├── index.js                    ← entry point, sets up Express and mounts the router
├── routes/
│   └── studentsRoute.js        ← maps URL paths to controller functions
├── controllers/
│   └── studentsController.js   ← handles req/res, delegates logic to services
├── services/
│   └── studentsService.js      ← business logic, reads from data/students.js
data/
└── students.js                 ← hardcoded student data (your "database")
```

## The 3 layers

| Layer | File | Responsibility |
|---|---|---|
| **Route** | `routes/studentsRoute.js` | Declares endpoints (`GET /`, `GET /:id`, `POST /`, …) and points each to a controller function |
| **Controller** | `controllers/studentsController.js` | Receives `req` and `res`, calls the service, returns a JSON response with the right status code |
| **Service** | `services/studentsService.js` | Contains the logic — find a student, create one, etc. Throws errors when something goes wrong |

## Data source

`data/students.js` exports a plain JavaScript array that acts as an in-memory database:

```js
export const students = [
  { id: 1, name: "Alice Martin", email: "alice.martin@epita.fr", major: "Computer Science", gpa: 3.8 },
  { id: 2, name: "Bob Dupont",   email: "bob.dupont@epita.fr",   major: "Computer Science", gpa: 3.5 },
  { id: 3, name: "Clara Rousseau", email: "clara.rousseau@epita.fr", major: "Computer Science", gpa: 3.9 },
];
```

## Endpoints to implement

| Method | Path | Description | Success status |
|---|---|---|---|
| `GET` | `/students` | Return all students | `200` |
| `GET` | `/students/:id` | Return one student by id | `200` |
| `POST` | `/students` | Create a new student from request body | `201` |

## Key concepts

### HTTP methods and CRUD

| HTTP method | CRUD operation | Typical use |
|---|---|---|
| `GET` | Read | Retrieve data |
| `POST` | Create | Send new data |
| `PUT` | Update | Replace existing data |
| `DELETE` | Delete | Remove data |

### Status codes

| Code | Meaning |
|---|---|
| `200` | OK — request succeeded |
| `201` | Created — new resource was created |
| `404` | Not Found — resource does not exist |
| `500` | Internal Server Error — something broke on the server |

### CORS

The frontend runs on a different origin than the backend. Without CORS the browser blocks the request.

```js
const cors = require("cors")
app.use(cors())  // allow all origins
```

## Steps

1. **`index.js`** — require Express and `cors`, set up middleware (`express.json()`, `cors()`), mount the student router on `/students`, start listening on port 3000
2. **`services/studentsService.js`** — import `students` from `data/students.js`, write `findAllUsers()` (returns the array or throws), `findUser(id)` (finds by id or throws), and `createStudentService(newStudent)` (pushes to the array)
3. **`controllers/studentsController.js`** — import the service functions, write `getAllStudents`, `getStudentById`, and `createStudent` — each one calls the service inside a `try/catch` and sends the appropriate JSON response and status code
4. **`routes/studentsRoute.js`** — create an Express `Router`, wire up `GET /`, `GET /:id`, and `POST /` to the controller functions, export the router

## ES6 modules

`package.json` has `"type": "module"` which means you must use `import`/`export` syntax instead of `require`:

```js
// importing
import express from "express"
import { findAllUsers } from "../services/studentsService.js"

// exporting
export const getAllStudents = (req, res) => { ... }
export default studentRouter
```

## Hints

- `req.params.id` gives you the `:id` from the URL as a **string** — use `parseInt()` to compare it with numeric ids
- `req.body` contains the JSON payload sent in a `POST` request — make sure `express.json()` middleware is active in `index.js`
- Controllers should never contain logic — if something can go wrong, move it to the service and `throw` an error there
- Use `res.status(code).json(data)` to set the status code and send JSON in one call
