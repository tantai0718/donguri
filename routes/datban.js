const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  res.render('reservation');
});

router.post('/', (req, res) => {
  const { ho_ten, email, thoi_gian, so_nguoi, ghi_chu,chi_nhanh } = req.body;
  const sql = `INSERT INTO dat_ban (ho_ten, Email, thoi_gian, so_nguoi, ghi_chu,chi_nhanh) 
               VALUES (?, ?, ?, ?, ?,?)`;
  db.query(sql, [ho_ten, email, thoi_gian, so_nguoi, ghi_chu,chi_nhanh], (err, result) => {
    if (err) {
      console.error('❌ Lỗi đặt bàn:', err);
      return res.status(500).send('Lỗi server khi đặt bàn');
    }
    res.send('✅ Đặt bàn thành công! Chúng tôi sẽ xác nhận sớm.');
  });
});

module.exports = router;
