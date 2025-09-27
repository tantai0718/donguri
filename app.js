const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Middleware cấu hình
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Session cho đăng nhập admin
app.use(session({
  secret: 'sushi-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Các route chính
const mainRoutes = require('./routes/mainRoutes');
const menuRoutes = require('./routes/menu');
const menuAnhRoutes = require('./routes/menuanh');
const datBanRoutes = require('./routes/datban');
const adminRoutes = require('./routes/admin');
const adminMonAnRoutes = require('./routes/adminMonAn');
const khoRoutes = require('./routes/kho');
const adminThongKeRoutes = require('./routes/adminThongKe');
const loginRoutes = require('./routes/login');

// Gắn route
app.use('/', mainRoutes);
app.use('/menu', menuRoutes);
app.use('/menuanh', menuAnhRoutes);
app.use('/datban', datBanRoutes);
app.use('/login', loginRoutes); // Route đăng nhập
app.use('/admin', adminRoutes);
app.use('/admin/mon-an', adminMonAnRoutes);
app.use('/admin/kho', khoRoutes);
app.use('/admin/thongke', adminThongKeRoutes);

// Khởi động server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
