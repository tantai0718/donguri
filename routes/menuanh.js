const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Tạo danh sách đường dẫn ảnh
  const images = [];
  for (let i = 1; i <= 23; i++) {
    images.push(`/images/menu/${i}.jpg`);
  }

  // Truyền images vào EJS
  res.render('menuanh', { images });
});

module.exports = router;
