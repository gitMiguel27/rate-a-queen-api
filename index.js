const express = require("express")
const app = express()
const port = 3000

const userRoutes = require('./routes/userRoutes')
const rateRoutes = require('./routes/rateRoutes')
const queenRoutes = require('./routes/queenRoutes')

//MIDDLEWARE
app.use("/users", userRoutes)
app.use("/rates", rateRoutes)
app.use("/queens", queenRoutes)
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API for Rate A Queen")
})

app.use((req, res) => {
  res.status(404)
  res.json({ error: "resource not found" })
})

app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
})