const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Trang chủ admin
router.get('/', (req, res) => {
  res.render('adminDashboard'); // views/adminDashboard.ejs
});

// === QUẢN LÝ ĐẶT BÀN ===
// Hiển thị danh sách đặt bàn
router.get('/datban', (req, res) => {
  const sql = 'SELECT * FROM dat_ban ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi lấy dữ liệu đặt bàn:', err);
      return res.status(500).send('Lỗi server');
    }
    res.render('admindatban', { datBanList: results });
  });
});

// Xác nhận đặt bàn
router.post('/datban/xacnhan/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE dat_ban SET trang_thai = 'da_xac_nhan' WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('❌ Lỗi xác nhận:', err);
    }
    res.redirect('/admin/datban');
  });
});

// Hủy đặt bàn
router.post('/datban/huy/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE dat_ban SET trang_thai = 'da_huy' WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('❌ Lỗi hủy:', err);
    }
    res.redirect('/admin/datban');
  });
});


// === QUẢN LÝ MÓN ĂN ===
// Hiển thị danh sách món ăn
router.get('/menu', (req, res) => {
  const sql = 'SELECT * FROM mon_an';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn món ăn:', err);
      return res.status(500).send('Lỗi server');
    }
    res.render('adminMonAn', { items: results });
  });
});

// Cập nhật món ăn
router.post('/menu/capnhat/:id', (req, res) => {
  const { id } = req.params;
  const {
    ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn,
    hinh_anh, gia, danh_muc_id, trang_thai
  } = req.body;

  const sql = `
    UPDATE mon_an 
    SET ten_mon_vn=?, ten_mon_jp=?, ten_mon_en=?, ten_mon_cn=?, 
        hinh_anh=?, gia=?, danh_muc_id=?, trang_thai=? 
    WHERE id=?
  `;

  const values = [ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, hinh_anh, gia, danh_muc_id, trang_thai, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('❌ Lỗi cập nhật món ăn:', err);
    }
    res.redirect('/admin/menu');
  });
});

// Xóa món ăn
router.post('/menu/xoa/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM mon_an WHERE id = ?';

  db.query(sql, [id], (err) => {
    if (err) {
      console.error('❌ Lỗi xoá món ăn:', err);
    }
    res.redirect('/admin/menu');
  });
});

const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('adminDashboard');
});
module.exports = router;
