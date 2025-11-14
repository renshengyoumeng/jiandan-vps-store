const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index', {
    title: "HTMX + Pug Demo",
    products: [
      { name: "香港优化1区 Nano", price: 1 },
      { name: "香港优化2区 Mini", price: 2 }
    ]
  });
});

module.exports = router;
