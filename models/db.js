const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',          // thay bằng mật khẩu MySQL nếu có
  database: 'donguri'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Kết nối DB thất bại:', err);
    return;
  }
  console.log('✅ Đã kết nối đến database donguri');
});

module.exports = db;
