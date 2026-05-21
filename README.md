# Exercise 02 — Express REST API with Layered Architecture

## Goal

Build a REST API using Express.js that exposes student data through a clean 3-layer architecture: **routes → controllers → services**. Data is served from a hardcoded JavaScript file (`data/courses.js`).

## What you will build

An HTTP server that responds to requests on `/courses` endpoints, returning data from `data/courses.js` through three separated layers.

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
│   └── coursesRoute.js        ← maps URL paths to controller functions
├── controllers/
│   └── coursesController.js   ← handles req/res, delegates logic to services
├── services/
│   └── coursesService.js      ← business logic, reads from data/courses.js
data/
└── courses.js                 ← hardcoded student data (your "database")
```

## The 3 layers

| Layer | File | Responsibility |
|---|---|---|
| **Route** | `routes/coursesRoute.js` | Declares endpoints (`GET /`, `GET /:id`, `POST /`, …) and points each to a controller function |
| **Controller** | `controllers/coursesController.js` | Receives `req` and `res`, calls the service, returns a JSON response with the right status code |
| **Service** | `services/coursesService.js` | Contains the logic — find a student, create one, etc. Throws errors when something goes wrong |

## Data source

`data/courses.js` exports a plain JavaScript array that acts as an in-memory database:

```js
export const courses = [
  { id: 1, name: "Alice Martin", email: "alice.martin@epita.fr", major: "Computer Science", gpa: 3.8 },
  { id: 2, name: "Bob Dupont",   email: "bob.dupont@epita.fr",   major: "Computer Science", gpa: 3.5 },
  { id: 3, name: "Clara Rousseau", email: "clara.rousseau@epita.fr", major: "Computer Science", gpa: 3.9 },
];
```

## Endpoints to implement

| Method | Path | Description | Success status |
|---|---|---|---|
| `GET` | `/courses` | Return all courses | `200` |
| `GET` | `/courses/:id` | Return one student by id | `200` |
| `POST` | `/courses` | Create a new student from request body | `201` |

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

1. **`index.js`** — require Express and `cors`, set up middleware (`express.json()`, `cors()`), mount the student router on `/courses`, start listening on port 3000
2. **`services/coursesService.js`** — import `courses` from `data/courses.js`, write `findAllUsers()` (returns the array or throws), `findUser(id)` (finds by id or throws), and `createcourseservice(newStudent)` (pushes to the array)
3. **`controllers/coursesController.js`** — import the service functions, write `getAllcourses`, `getStudentById`, and `createStudent` — each one calls the service inside a `try/catch` and sends the appropriate JSON response and status code
4. **`routes/coursesRoute.js`** — create an Express `Router`, wire up `GET /`, `GET /:id`, and `POST /` to the controller functions, export the router

## ES6 modules

`package.json` has `"type": "module"` which means you must use `import`/`export` syntax instead of `require`:

```js
// importing
import express from "express"
import { findAllUsers } from "../services/coursesService.js"

// exporting
export const getAllcourses = (req, res) => { ... }
export default studentRouter
```

## Hints

- `req.params.id` gives you the `:id` from the URL as a **string** — use `parseInt()` to compare it with numeric ids
- `req.body` contains the JSON payload sent in a `POST` request — make sure `express.json()` middleware is active in `index.js`
- Controllers should never contain logic — if something can go wrong, move it to the service and `throw` an error there
- Use `res.status(code).json(data)` to set the status code and send JSON in one call
