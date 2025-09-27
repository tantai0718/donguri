const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM mon_an WHERE trang_thai = 1'; // ✅ Lọc món đang hiển thị

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn menu:', err);
      return res.status(500).send('Lỗi server');
    }
    res.render('menu', { items: results });
  });
});

module.exports = router;
