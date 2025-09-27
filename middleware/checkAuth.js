module.exports = function checkAuth(req, res, next) {
  if (req.session && req.session.admin) {
    // Đã đăng nhập → tiếp tục
    next();
  } else {
    // Chưa đăng nhập → chuyển về trang đăng nhập
    res.redirect('/login');
  }
};
