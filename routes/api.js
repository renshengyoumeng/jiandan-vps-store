const express = require('express');
const router = express.Router();
const templateService = require('../services/templateService');
const { getCategories } = require('../sites/sadidc')

// 返回局部 HTML 的 API（给 HTMX 使用）
router.get('/products', async (req, res) => {

  await getCategories()
  const products = [
    { name: "香港优化1区 Nano", price: 1 },
    { name: "香港优化2区 Mini", price: 88 }
  ];

  const html = templateService.render('productList', { products });

  res.send(html);
});



module.exports = router;
