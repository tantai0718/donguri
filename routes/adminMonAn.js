const express = require('express');
const router = express.Router();
const db = require('../models/db');
const multer = require('multer');
const path = require('path');

// Cấu hình lưu file hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Hiển thị trang quản lý món ăn
router.get('/', (req, res) => {
  const selectedCategory = req.query.danh_muc_id || '';
  const sqlMonAn = selectedCategory
    ? 'SELECT * FROM mon_an WHERE danh_muc_id = ?'
    : 'SELECT * FROM mon_an';
  const params = selectedCategory ? [selectedCategory] : [];

  // Truy vấn cả danh sách món ăn và danh mục
  db.query(sqlMonAn, params, (err, monAn) => {
    if (err) return res.status(500).send('Lỗi truy vấn món ăn');

    db.query('SELECT * FROM danh_muc_mon', (err2, danhMuc) => {
      if (err2) return res.status(500).send('Lỗi truy vấn danh mục');

      // ✅ Truyền đầy đủ biến
      res.render('adminMonAn', {
        items: monAn,
        danhMucList: danhMuc,
        selectedCategory
      });
    });
  });
});

// Thêm món mới
router.post('/them', upload.single('hinh_anh'), (req, res) => {
  const { ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, gia, danh_muc_id, trang_thai } = req.body;
  const hinh = req.file ? '/uploads/' + req.file.filename : '';
  const sql = `
    INSERT INTO mon_an (ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, hinh_anh, gia, danh_muc_id, trang_thai)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, hinh, gia, danh_muc_id, trang_thai || 1], (err) => {
    if (err) return res.status(500).send('Lỗi thêm món ăn');
    res.redirect('/admin/mon-an');
  });
});

// Sửa món
router.post('/sua/:id', (req, res) => {
  const id = req.params.id;
  const { ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, hinh_anh, gia, danh_muc_id, trang_thai } = req.body;
  const sql = `
    UPDATE mon_an SET ten_mon_vn=?, ten_mon_jp=?, ten_mon_en=?, ten_mon_cn=?, hinh_anh=?, gia=?, danh_muc_id=?, trang_thai=?
    WHERE id=?`;
  db.query(sql, [ten_mon_vn, ten_mon_jp, ten_mon_en, ten_mon_cn, hinh_anh, gia, danh_muc_id, trang_thai, id], (err) => {
    if (err) return res.status(500).send('Lỗi sửa món');
    res.redirect('/admin/mon-an');
  });
});

// Đổi trạng thái
router.post('/trangthai/:id', (req, res) => {
  const { id } = req.params;
  const { trang_thai } = req.body;
  db.query('UPDATE mon_an SET trang_thai = ? WHERE id = ?', [trang_thai, id], (err) => {
    if (err) return res.status(500).send('Lỗi cập nhật trạng thái');
    res.redirect('/admin/mon-an');
  });
});

// Xoá
router.post('/xoa/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM mon_an WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Lỗi xoá món ăn');
    res.redirect('/admin/mon-an');
  });
});

module.exports = router;
