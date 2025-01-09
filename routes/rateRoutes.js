const express = require("express")
const router = express.Router()
const rates = require('../data/rates')

router.use(express.json())

router.get("/", (req, res) => {
  res.json(rates)
})

router
  .route("/:id")
  .get((req, res, next) => {
    const rate = rates.find((p) => p.id == req.params.id)
    if (rate) res.json(rate)
    else next()
  })
  .patch((req, res) => {
  })
  .delete((req, res) => {
  })

module.exports = router