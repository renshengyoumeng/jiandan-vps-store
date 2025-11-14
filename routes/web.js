const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index', {
    title: "sadidc 简单的商品列表",
    products: [

    ]
  });
});

module.exports = router;
