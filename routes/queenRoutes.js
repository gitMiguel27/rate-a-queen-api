const express = require("express")
const router = express.Router()
const queens = require('../data/queens')

router.use(express.json())

router.get("/", (req, res) => {
  res.json(queens)
})

router.get("/:id", (req, res, next) => {
  const queen = queens.find((q) => q.id == req.params.id)
  if (queen) res.json(queen)
  else next()
})

module.exports = router