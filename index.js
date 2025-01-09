const express = require("express")
const app = express()
const port = 3000

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

//MIDDLEWARE
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Work in progress!");
})

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found" });
})

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
})