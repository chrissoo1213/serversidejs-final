import express from "express" // new js

const express = require("express") // old js


const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.json({ msg: "Hello World!" })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

// NODEMON

// send data to the exposed endpoints
// import data from students.json and send it to the client when they hit the endpoint
// use postman to send data to endpoints

// GET - retrieve data
// POST - create new data
// PUT - update existing data
// DELETE - remove data
// CRUD - create, read, update, delete

// SEND DATA vs SEND ERROR
// STATUS CODES - 200, 201, 400, 404
// JSON - JavaScript Object Notation
// res.json() - send JSON response
// res.status() - set status code
// res.send() - send response

// TRY FRONTEND NOW before moving on
// go to FONT folder and open index.html in the browser, check console for errors, fix them, and see the data being displayed

// CORS - Cross-Origin Resource Sharing
// npm i cors
// app.use(cors())

// REFACTORING
// 1. Create a separate file for routes (e.g., routes.js)
// 2. Create a separate file for controllers (e.g., controllers.js)
// 3. Change commonJs to ES6 modules (e.g., import/export) - this will require adding "type": "module" in package.json

// push to github and share the link
