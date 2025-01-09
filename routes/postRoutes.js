const express = require("express")
const router = express.Router()
const posts = require('../data/posts')

router.use(express.json());

router.get("/", (req, res) => {
  res.json(posts);
})

//posts
router.get("/api/posts", (req, res) => {
    res.json(posts);
})
  
router.get("/api/posts/:id", (req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
})

module.exports = router;