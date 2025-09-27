const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM nguyen_lieu', (err, results) => {
    if (err) return res.send('Lỗi khi truy vấn kho');
    res.render('adminkho', { nguyenLieu: results });
  });
});

router.post('/nhap', (req, res) => {
  const { ten, don_vi, so_luong, nguong_canh_bao, ghi_chu } = req.body;
  const sql = `INSERT INTO nguyen_lieu (ten, don_vi, so_luong, nguong_canh_bao, ghi_chu)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [ten, don_vi, so_luong, nguong_canh_bao, ghi_chu], (err) => {
    if (err) return res.status(500).send('Lỗi khi thêm nguyên liệu');
    res.redirect('/admin/kho');
  });
});

router.post('/nhap-them', (req, res) => {
  const { nguyen_lieu_id, so_luong } = req.body;
  const sql = `UPDATE nguyen_lieu SET so_luong = so_luong + ? WHERE id = ?`;
  db.query(sql, [so_luong, nguyen_lieu_id], (err) => {
    if (err) return res.status(500).send('Lỗi khi nhập thêm nguyên liệu');
    res.redirect('/admin/kho');
  });
});

router.post('/xuat', (req, res) => {
  const { nguyen_lieu_id, so_luong, ghi_chu } = req.body;

  const insertSQL = `INSERT INTO nhat_ky_kho (nguyen_lieu_id, loai, so_luong, ghi_chu)
                     VALUES (?, 'xuat', ?, ?)`;
  const updateSQL = `UPDATE nguyen_lieu SET so_luong = so_luong - ? WHERE id = ?`;

  db.query(insertSQL, [nguyen_lieu_id, so_luong, ghi_chu], (err) => {
    if (err) return res.send('Lỗi ghi nhật ký');
    db.query(updateSQL, [so_luong, nguyen_lieu_id], (err2) => {
      if (err2) return res.send('Lỗi cập nhật kho');
      res.redirect('/admin/kho');
    });
  });
});

module.exports = router;
