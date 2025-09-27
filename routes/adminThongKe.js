const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const queries = {
    tongDatBan: 'SELECT COUNT(*) as count FROM dat_ban',
    datBanHomNay: `SELECT COUNT(*) as count FROM dat_ban WHERE DATE(thoi_gian) = ?`,
    daXacNhan: `SELECT COUNT(*) as count FROM dat_ban WHERE trang_thai = 'da_xac_nhan'`,
    daHuy: `SELECT COUNT(*) as count FROM dat_ban WHERE trang_thai = 'da_huy'`,
    choXacNhan: `SELECT COUNT(*) as count FROM dat_ban WHERE trang_thai = 'cho_xac_nhan'`,
    tongMonAn: `SELECT COUNT(*) as count FROM mon_an`,
    nguyenLieuCanBao: `SELECT COUNT(*) as count FROM nguyen_lieu WHERE so_luong < nguong_canh_bao`
  };

  try {
    const results = await Promise.all(Object.values(queries).map(sql =>
      db.promise().query(sql, [today])
    ));
    
    const [
      [tongDatBan], [datBanHomNay], [daXacNhan],
      [daHuy], [choXacNhan], [tongMonAn], [nguyenLieuCanBao]
    ] = results.map(r => r[0]);

    res.render('adminThongKe', {
      tongDatBan: tongDatBan.count,
      datBanHomNay: datBanHomNay.count,
      daXacNhan: daXacNhan.count,
      daHuy: daHuy.count,
      choXacNhan: choXacNhan.count,
      tongMonAn: tongMonAn.count,
      nguyenLieuCanBao: nguyenLieuCanBao.count
    });
  } catch (err) {
    console.error('❌ Lỗi thống kê:', err);
    res.send('Lỗi truy vấn thống kê');
  }
});

module.exports = router;
