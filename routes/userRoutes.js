const express = require("express")
const router = express.Router()
const users = require('../data/users')
const rates = require('../data/rates')

router.use(express.json())

router.get("/", (req, res) => {
  res.json(users)
})

router.post("/", (req, res) => {
  if (req.body.username && req.body.password) {
    if (users.find((u) => u.username == req.body.username)) {
      res.json({ error: "Username Already Taken" })
      return
    }
    const user = {
      id: users[users.length - 1].id + 1,
      username: req.body.username,
      password: req.body.password,
    }
    
    users.push(user)
    res.json(users[users.length - 1])
  } else res.json({ error: "Insufficent Data" })
})

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id)
    if (user) res.json(user)
    else next()
  })
  .patch((req, res) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key]
        }
      }
      return true
    })
  
    if (user) res.json(user)
    else next()
  })
  .delete((req, res) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1)
        return true
      }
    })
  
    if (user) res.json(user)
  })

router.get("/:id/ratings", (req, res) => {
  const user = users.find((u) => u.id == req.params.id)
  if (user) res.json(user.myRatings)
  else next()
})
router.post("/:id/rating", (req, res) => {
  const user = users.find((u) => u.id == req.params.id)
  if (user) {
    if (req.body.userId && req.body.ratedQueenId && req.body.rate) {
      if (rates.find((r) => r.userId == user.id && r.ratedQueenId == req.body.ratedQueenId)) {
        res.json({ error: "Already rated this queen. Rate another queen!" })
        return
      }
      const rate = {
        id: rates[rates.length - 1].id + 1,
        userId: req.params.id,
        ratedQueenId: req.body.ratedQueenId,
        rate: req.body.rate,
      }

      rates.push(rate)
      res.json(rates[rates.length - 1])
    } else res.json({ error: "Insufficent Data" })
  }
  else next()
})

module.exports = router