const express = require("express")
const router = express.Router()
const rates = require('../data/rates')

router.use(express.json())

router.get("/", (req, res) => {
  res.json(rates)
})

router.get("/id", (req, res) => {
  const rate = rates.find((r) => r.id == req.params.id)
  if (rate) res.json(rate)
  else next()
})

module.exports = router