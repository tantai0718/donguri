const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Hiển thị form đăng nhập
router.get('/', (req, res) => {
  res.render('login', { error: null });
});

// Xử lý đăng nhập
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admin_users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.render('login', { error: 'Lỗi hệ thống' });
    }

    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/admin');
    } else {
      res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  });
});

// Xuất router
module.exports = router;
