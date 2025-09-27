const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // => cần có file views/index.ejs
});
router.get('/menu-anh', (req, res) => {
  res.render('menu_anh'); // tên file ejs
});
module.exports = router;
