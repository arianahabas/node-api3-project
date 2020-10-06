const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
