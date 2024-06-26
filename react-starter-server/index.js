const express = require("express")
const cors = require("cors")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("Welcome to react starter server")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
